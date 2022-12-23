import { FormEvent, useReducer, useRef, useState } from "react";
import { FiLoader } from "react-icons/fi";
import { ZodError, ZodIssue } from "zod";
import addProjectSchema from "../../../../schemas/AddProjectSchema";
import FormErrors from "../../../../types/FormErrors";
import { trpc } from "../../../../utils/trpc";

type ErrorsAction =
  | {
      type: "SET_GENERAL_ERROR";
      payload: string;
    }
  | {
      type: "SET_INPUT_ERRORS";
      payload: ZodIssue[];
    };

const reducer = (state: FormErrors, action: ErrorsAction) => {
  switch (action.type) {
    case "SET_GENERAL_ERROR":
      return { generalError: action.payload };
    case "SET_INPUT_ERRORS":
      return action.payload.reduce(
        (allErrors: FormErrors, currentError) => ({
          ...allErrors,
          ...{ [currentError.path[0] ?? "generalError"]: currentError.message },
        }),
        {}
      );
    default:
      return state;
  }
};

const AddProjectPanel = () => {
  const { mutate, isLoading } = trpc.project.create.useMutation();
  const formRef = useRef(null);
  const [errors, dispatch] = useReducer(reducer, {});

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();

      if (!formRef.current) throw new Error("Invalid form");

      const formData = Object.fromEntries(new FormData(formRef.current));
      const validData = addProjectSchema.parse({
        ...formData,
        deadline:
          typeof formData.deadline === "string"
            ? new Date(formData.deadline)
            : formData.deadline,
      });
      mutate(validData);
    } catch (e) {
      if (e instanceof ZodError) {
        dispatch({ type: "SET_INPUT_ERRORS", payload: e.errors });
      } else if (e instanceof Error) {
        dispatch({ type: "SET_GENERAL_ERROR", payload: e.message });
      } else if (typeof e === "string") {
        dispatch({ type: "SET_GENERAL_ERROR", payload: e });
      }
    }
  };

  return (
    <form
      className="relative grid h-fit w-full gap-4"
      onSubmit={handleSubmit}
      ref={formRef}
    >
      <div className="grid w-full">
        <label htmlFor="title" className="ml-3 text-sm dark:text-slate-400">
          Title
        </label>
        <input
          name="title"
          id="title"
          className="form-input"
          aria-errormessage="titleError"
        />
        <span
          id="titleError"
          data-visible={!!errors.title}
          className="error-info"
        >
          {errors.title}
        </span>
      </div>
      <div className="grid">
        <label htmlFor="client" className="ml-3 text-sm dark:text-slate-400">
          Client
        </label>
        <input
          name="client"
          id="client"
          className="form-input"
          aria-errormessage="clientError"
        />
        <span
          id="clientError"
          data-visible={!!errors.client}
          className="error-info"
        >
          {errors.client}
        </span>
      </div>
      <div className="grid">
        <label htmlFor="deadline" className="ml-3 text-sm dark:text-slate-400">
          Deadline
        </label>
        <input
          name="deadline"
          id="deadline"
          className="form-input"
          type="date"
          aria-errormessage="deadlineError"
        />
        <span
          id="deadlineError"
          data-visible={!!errors.deadline}
          className="error-info"
        >
          {errors.deadline}
        </span>
      </div>
      <button
        type="submit"
        title="Submit new project form"
        className="blue-button"
        disabled={isLoading}
      >
        {isLoading ? <FiLoader className="animate-spin text-xl" /> : "Submit"}
      </button>
      <span
        id="generalError"
        data-visible={!!errors.generalError}
        className="error-info absolute top-full"
      >
        {errors.generalError}
      </span>
    </form>
  );
};

export default AddProjectPanel;
