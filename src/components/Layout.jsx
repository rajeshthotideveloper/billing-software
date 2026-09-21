import Sidebar from "./Sidebar";

export default function Layout({ children }) {
  return (
    <div className="min-h-screen bg-slate-50">
      <Sidebar />

      <main className="ml-64 min-h-screen">
        <header className="h-16 bg-white border-b flex items-center justify-between px-8">
          <h2 className="font-semibold text-lg">
            Billing System
          </h2>

          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-sky-500 text-white flex items-center justify-center font-bold">
              A
            </div>

            <span className="text-sm font-medium">
              Admin
            </span>
          </div>
        </header>

        <section className="p-8">
          {children}
        </section>
      </main>
    </div>
  );
}