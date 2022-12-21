import Link from "next/link";
import { FormEvent, useState } from "react";
import { FiEye, FiEyeOff, FiGithub, FiLoader } from "react-icons/fi";
import { AiOutlineGoogle } from "react-icons/ai";

export default function LogInPanel() {
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
    <div className="w-[90%] max-w-md">
      <h1 className="mb-2 text-center text-2xl font-semibold">Welcome back</h1>
      <section className="grid gap-2 rounded-lg border-1 p-4 dark:border-slate-700">
        <ul className="mx-auto flex justify-center gap-4 text-3xl md:text-xl">
          <li>
            <button
              type="button"
              className="text-hover border-hover rounded-lg p-2 dark:bg-slate-800"
              title="Login with GitHub"
            >
              <FiGithub />
            </button>
          </li>
          <li>
            <button
              type="button"
              className="text-hover border-hover rounded-lg p-2 dark:bg-slate-800"
              title="Login with Google"
            >
              <AiOutlineGoogle />
            </button>
          </li>
        </ul>
        <p className="text-center dark:text-slate-400">or</p>
        <form className="grid gap-4" onSubmit={handleSubmit}>
          <div className="grid">
            <label htmlFor="email" className="ml-3 text-sm dark:text-slate-400">
              Email
            </label>
            <input
              name="email"
              id="email"
              className="auth-input"
              required
              type="email"
              aria-errormessage="emailError"
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
                className="auth-input w-full"
                required
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
          <button
            type="submit"
            title="Submit sign in form"
            className="blue-button"
            disabled={loading}
          >
            {loading ? (
              <FiLoader className="animate-spin text-xl" />
            ) : (
              "Sign in"
            )}
          </button>
        </form>
        <ul
          className={`flex w-full justify-between px-3 text-xs dark:text-slate-400 ${
            loading && "pointer-events-none opacity-50"
          }`}
        >
          <li>
            <Link
              href="remindPassword"
              className="text-hover"
              tabIndex={loading ? undefined : 0}
            >
              Remind password
            </Link>
          </li>
          <li>
            <Link
              href="signup"
              className="text-hover"
              tabIndex={loading ? undefined : 0}
            >
              Sign up
            </Link>
          </li>
        </ul>
      </section>
    </div>
  );
}
