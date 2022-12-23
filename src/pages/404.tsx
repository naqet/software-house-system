import Link from "next/link";

export default function NotFoundPage() {
  return (
    <main className="grid h-screen place-items-center">
      <section className="grid place-items-center gap-2 rounded-lg border-1 p-4 dark:border-slate-700">
        <h1 className="text-xl">Looks like you are lost</h1>
        <p className="text-sm opacity-80">Page not found</p>
        <Link href="/" className="blue-button text-xs" tabIndex={0}>
          Go back home
        </Link>
      </section>
    </main>
  );
}
