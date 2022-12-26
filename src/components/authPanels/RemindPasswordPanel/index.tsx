import { FormEvent, useRef, useState } from "react";
import { FiLoader } from "react-icons/fi";

export default function RemindPasswordPanel() {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const emailRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);

    // TODO: handle logic
    setSuccess(true);
  };

  return (
    <div className="w-[90%] max-w-md">
      <h1 className="mb-2 text-center text-2xl font-semibold">
        Remind password
      </h1>
      <section className="grid gap-2 rounded-lg border-1 p-4 dark:border-slate-700">
        <form className="grid gap-4" onSubmit={handleSubmit}>
          <div className="grid">
            <label htmlFor="email" className="ml-3 text-sm dark:text-slate-400">
              Email
            </label>
            <input
              name="email"
              id="email"
              className="form-input"
              required
              type="email"
              aria-errormessage="emailError"
              ref={emailRef}
            />
          </div>
          <button
            type="submit"
            title="Submit sign in form"
            className="blue-button"
            disabled={loading}
          >
            {loading ? (
              <FiLoader className="animate-spin text-xl" />
            ) : (
              "Proceed"
            )}
          </button>
        </form>
        <span
          data-visible={success}
          className="max-h-0 overflow-hidden text-xs transition-all data-[visible=true]:mt-1 data-[visible=true]:max-h-4 dark:text-green-400"
        >
          If account with this email exists, message will be sent
        </span>
        <span data-visible={!!error} className="error-info ml-3">
          {error}
        </span>
      </section>
    </div>
  );
}
