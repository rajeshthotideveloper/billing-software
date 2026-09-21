import { useState } from "react";
import { Menu, X } from "lucide-react";
import Sidebar from "./Sidebar";

export default function Layout({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed inset-y-0 left-0 z-50 w-64
          transform transition-transform duration-300 ease-in-out
          lg:translate-x-0
          ${
            isSidebarOpen
              ? "translate-x-0"
              : "-translate-x-full"
          }
        `}
      >
        <Sidebar />

        {/* Mobile Close Button */}
        <button
          type="button"
          onClick={() => setIsSidebarOpen(false)}
          className="
            absolute right-3 top-3
            flex h-9 w-9 items-center justify-center
            rounded-lg
            bg-white
            text-slate-600
            shadow-sm
            hover:bg-slate-100
            lg:hidden
          "
          aria-label="Close sidebar"
        >
          <X size={20} />
        </button>
      </aside>

      {/* Main Content */}
      <main className="min-h-screen lg:ml-64">
        {/* Header */}
        <header
          className="
            sticky top-0 z-30
            flex h-16 items-center justify-between
            border-b border-slate-200
            bg-white
            px-4
            sm:px-6
            lg:px-8
          "
        >
          {/* Left Section */}
          <div className="flex items-center gap-3">
            {/* Mobile Menu Button */}
            <button
              type="button"
              onClick={() => setIsSidebarOpen(true)}
              className="
                flex h-10 w-10
                items-center justify-center
                rounded-lg
                text-slate-600
                hover:bg-slate-100
                lg:hidden
              "
              aria-label="Open sidebar"
            >
              <Menu size={22} />
            </button>

            <h2 className="text-base font-semibold text-slate-800 sm:text-lg">
              Billing System
            </h2>
          </div>

          {/* Admin Profile */}
          <div className="flex items-center gap-2 sm:gap-3">
            <div
              className="
                flex h-9 w-9
                items-center justify-center
                rounded-full
                bg-sky-500
                text-sm
                font-bold
                text-white
              "
            >
              A
            </div>

            <span className="hidden text-sm font-medium text-slate-700 sm:block">
              Admin
            </span>
          </div>
        </header>

        {/* Page Content */}
        <section className="p-4 sm:p-6 lg:p-8">
          {children}
        </section>
      </main>
    </div>
  );
}