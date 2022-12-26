export default function UserSettings() {
  return (
    <section className="grid w-full gap-4 rounded-lg border-1 p-4 @container dark:border-slate-800">
      <h2 className="font-semibold dark:text-slate-400">User</h2>
      <form onSubmit={(e) => e.preventDefault()} className="grid gap-2">
        <div className="grid gap-1">
          <label htmlFor="name" className="ml-3 text-sm dark:text-slate-400">
            Name
          </label>
          <input className="form-input !bg-transparent" id="name"></input>
        </div>
        <button type="submit" className="blue-button">
          Save
        </button>
      </form>
    </section>
  );
}
