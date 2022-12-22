import { useRouter } from "next/router";
import { type FormEvent, useState, useRef, useReducer } from "react";
import { FiEye, FiEyeOff, FiLoader } from "react-icons/fi";
import { ZodError, type ZodIssue } from "zod";

type Errors = {
  [key: string]: string;
};

type ErrorsAction =
  | {
      type: "SET_GENERAL_ERROR";
      payload: string;
    }
  | {
      type: "SET_INPUT_ERRORS";
      payload: ZodIssue[];
    }
  | {
      type: "CLEAR_ERRORS";
    };

const reducer = (state: Errors, action: ErrorsAction) => {
  switch (action.type) {
    case "SET_GENERAL_ERROR":
      return { generalError: action.payload };
    case "SET_INPUT_ERRORS":
      return action.payload.reduce(
        (allErrors: Errors, currentError) => ({
          ...allErrors,
          ...{ [currentError.path[0] ?? "generalError"]: currentError.message },
        }),
        {}
      );
    case "CLEAR_ERRORS":
      return {};
    default:
      return state;
  }
};

export default function SignUpPanel() {
  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);
  const [passType, setPassType] = useState<"text" | "password">("password");
  const [loading, setLoading] = useState(false);
  const [errors, dispatch] = useReducer(reducer, {});

  const handlePasswordType = (): void => {
    setPassType((prev) => (prev === "text" ? "password" : "text"));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      if (!formRef.current) throw new Error("Form is not valid");
      setLoading(true);

      const data = Object.fromEntries(new FormData(formRef.current));

      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      // If it's a Bad Request, we need to handle input errors
      if (response.status === 400) {
        const error = (await response.json()) as ZodIssue[];

        if (error && Array.isArray(error)) throw new ZodError(error);
        // If it's any other error, we handle it.
      } else if (400 < response.status && response.status < 600) {
        const errorText = await response.text();
        throw new Error(errorText ?? response.statusText);
      }

      // If redirect is happening, we need to handle it manually
      if (response.redirected) {
        router.push(response.url);
        return;
      }
    } catch (e) {
      setLoading(false);
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
    <section className="w-[90%] max-w-md">
      <h1 className="mb-2 text-center text-2xl font-semibold">Join the team</h1>
      <section className="grid gap-2 rounded-lg border-1 p-4 dark:border-slate-700">
        <form className="grid gap-4" onSubmit={handleSubmit} ref={formRef}>
          <div className="grid">
            <label htmlFor="name" className="ml-3 text-sm dark:text-slate-400">
              Name
            </label>
            <input
              name="name"
              id="name"
              className="auth-input"
              required
              aria-errormessage="nameError"
            />
            <span
              id="nameError"
              data-visible={!!errors.name}
              className="error--info"
            >
              {errors.name}
            </span>
          </div>
          <div className="grid">
            <label htmlFor="email" className="ml-3 text-sm dark:text-slate-400">
              Email
            </label>
            <input
              name="email"
              id="email"
              className="auth-input"
              type="email"
              required
              aria-errormessage="nameError"
            />
            <span
              id="emailError"
              data-visible={!!errors.email}
              className="error--info"
            >
              {errors.email}
            </span>
          </div>
          <div className="grid">
            <label
              htmlFor="password"
              className="ml-3 text-sm dark:text-slate-400"
            >
              Password
            </label>
            <div className="flex gap-2">
              <input
                name="password"
                id="password"
                className="auth-input	w-full"
                required
                minLength={8}
                type={passType}
                aria-errormessage="passwordError"
              />
              <button
                type="button"
                title="Show password"
                className="border-hover rounded-lg p-2 dark:bg-slate-800"
                onClick={handlePasswordType}
              >
                {passType === "password" ? <FiEye /> : <FiEyeOff />}
              </button>
            </div>
            <span
              id="passwordError"
              data-visible={!!errors.password}
              className="error--info"
            >
              {errors.password}
            </span>
          </div>
          <div className="grid">
            <label
              htmlFor="confirmPassword"
              className="ml-3 text-sm dark:text-slate-400"
            >
              Confirm password
            </label>
            <input
              name="confirmPassword"
              id="confirmPassword"
              className="auth-input w-full"
              required
              type={passType}
              aria-errormessage="confirmPasswordError"
            />
            <span
              id="confirmPasswordError"
              data-visible={!!errors.confirmPassword}
              className="error--info"
            >
              {errors.confirmPassword}
            </span>
          </div>
          <button
            type="submit"
            title="Submit sign up form"
            className="blue-button"
            disabled={loading}
          >
            {loading ? (
              <FiLoader className="animate-spin text-xl" />
            ) : (
              "Sign up"
            )}
          </button>
        </form>
        <span
          id="generalError"
          data-visible={!!errors.generalError}
          className="error--info"
        >
          {errors.generalError}
        </span>
      </section>
    </section>
  );
}
