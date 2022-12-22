"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { FiLoader, FiLogOut } from "react-icons/fi";

export default function SignOutButton() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>("");

  const handleSignOut = async () => {
    try {
      setError("");
      setLoading(true);

      const signOut = (await import("next-auth/react")).signOut;
      const response = await signOut({
        redirect: false,
        callbackUrl: "/login",
      });

      if (response.url) router.push(response.url);
    } catch (e) {
      setLoading(false);
      if (e instanceof Error) {
        setError(e.message);
      } else if (typeof e === "string") setError(e);
    }
  };

  return (
    <button
      type="button"
      title="Sign out"
      className="border-hover text-hover relative block rounded-lg py-2 px-8 text-2xl disabled:opacity-50 dark:bg-slate-800"
      onClick={handleSignOut}
      disabled={loading}
    >
      {loading ? <FiLoader className="animate-spin" /> : <FiLogOut />}
      <span
        data-visible={!!error}
        className="absolute -top-8 left-2 max-h-0 overflow-hidden whitespace-nowrap text-xs transition-all data-[visible=true]:mt-1 data-[visible=true]:max-h-4 dark:text-red-400"
      >
        {error}
      </span>
    </button>
  );
}
