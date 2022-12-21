import { type FormEvent, useState } from "react";
import { FiEye, FiEyeOff, FiLoader } from "react-icons/fi";

export default function SignUpPanel() {
  const [passType, setPassType] = useState<"text" | "password">("password");
  const [loading, setLoading] = useState(false);

  const handlePasswordType = (): void => {
    setPassType((prev) => (prev === "text" ? "password" : "text"));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
  };
  return (
    <section className="w-[90%] max-w-md">
      <h1 className="mb-2 text-center text-2xl font-semibold">Join the team</h1>
      <section className="grid gap-2 rounded-lg border-1 p-4 dark:border-slate-700">
        <form className="grid gap-4" onSubmit={handleSubmit}>
          <div className="grid">
            <label htmlFor="name" className="ml-3 text-sm dark:text-slate-400">
              Name
            </label>
            <input name="name" id="name" className="auth-input" required />
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
            />
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
            />
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
      </section>
    </section>
  );
}
