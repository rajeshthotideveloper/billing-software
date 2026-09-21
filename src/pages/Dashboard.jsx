import { useState } from "react";
import { Search, X, FileText } from "lucide-react";
import { useBilling } from "../context/BillingContext";
import InvoicePDFButton from "../components/InvoicePDFButton";

const Dashboard = () => {
  const { invoices, products, customers } = useBilling();

  const [searchTerm, setSearchTerm] = useState("");

  // Search invoices
  const filteredInvoices = invoices.filter((invoice) =>
    invoice.invoiceNumber
      ?.toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  // Show latest 5 invoices when there is no search
  const displayedInvoices = searchTerm
    ? filteredInvoices
    : filteredInvoices.slice(-5).reverse();

  const totalSales = invoices.reduce(
    (total, invoice) =>
      total + Number(invoice.grandTotal || 0),
    0
  );

  const clearSearch = () => {
    setSearchTerm("");
  };

  return (
    <div className="space-y-6 p-6">

      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-slate-800">
          Dashboard
        </h1>

        <p className="mt-1 text-slate-500">
          Welcome to your billing dashboard
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">

        {/* Total Sales */}
        <div className="rounded-xl bg-white p-5 shadow-sm">
          <p className="text-sm text-slate-500">
            Total Sales
          </p>

          <h2 className="mt-2 text-2xl font-bold text-slate-800">
            ₹ {totalSales.toLocaleString("en-IN")}
          </h2>
        </div>

        {/* Total Invoices */}
        <div className="rounded-xl bg-white p-5 shadow-sm">
          <p className="text-sm text-slate-500">
            Total Invoices
          </p>

          <h2 className="mt-2 text-2xl font-bold text-slate-800">
            {invoices.length}
          </h2>
        </div>

        {/* Products */}
        <div className="rounded-xl bg-white p-5 shadow-sm">
          <p className="text-sm text-slate-500">
            Products
          </p>

          <h2 className="mt-2 text-2xl font-bold text-slate-800">
            {products.length}
          </h2>
        </div>

        {/* Customers */}
        <div className="rounded-xl bg-white p-5 shadow-sm">
          <p className="text-sm text-slate-500">
            Customers
          </p>

          <h2 className="mt-2 text-2xl font-bold text-slate-800">
            {customers.length}
          </h2>
        </div>

      </div>

      {/* Invoice Search */}
      <div className="rounded-xl bg-white p-5 shadow-sm">

        <div className="mb-4 flex items-center gap-2">

          <FileText
            size={20}
            className="text-blue-600"
          />

          <h2 className="text-lg font-semibold text-slate-800">
            Search Invoice
          </h2>

        </div>

        <div className="relative max-w-lg">

          <Search
            size={20}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <input
            type="text"
            placeholder="Search by invoice number..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full rounded-lg border border-slate-300 py-3 pl-10 pr-10 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          />

          {searchTerm && (
            <button
              onClick={clearSearch}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700"
            >
              <X size={18} />
            </button>
          )}

        </div>

        {/* Search Results */}
        {searchTerm && (
          <div className="mt-5">

            <p className="mb-3 text-sm text-slate-500">
              {filteredInvoices.length} invoice
              {filteredInvoices.length !== 1 ? "s" : ""} found
            </p>

            {filteredInvoices.length === 0 ? (

              <div className="rounded-lg bg-slate-50 p-6 text-center text-slate-500">
                No invoice found for "{searchTerm}"
              </div>

            ) : (

              <div className="overflow-x-auto">

                <table className="w-full">

                  <thead className="bg-slate-50">

                    <tr>

                      <th className="px-4 py-3 text-left text-sm">
                        Invoice No
                      </th>

                      <th className="px-4 py-3 text-left text-sm">
                        Customer
                      </th>

                      <th className="px-4 py-3 text-left text-sm">
                        Amount
                      </th>

                      <th className="px-4 py-3 text-left text-sm">
                        Date
                      </th>

                      <th className="px-4 py-3 text-left text-sm">
                        Action
                      </th>

                    </tr>

                  </thead>

                  <tbody>

                    {filteredInvoices.map((invoice) => (

                      <tr
                        key={invoice.id}
                        className="border-t"
                      >

                        <td className="px-4 py-3 font-medium text-blue-600">
                          {invoice.invoiceNumber}
                        </td>

                        <td className="px-4 py-3">
                          {invoice.customerName}
                        </td>

                        <td className="px-4 py-3 font-semibold">
                          ₹{" "}
                          {Number(
                            invoice.grandTotal || 0
                          ).toLocaleString("en-IN")}
                        </td>

                        <td className="px-4 py-3">
                          {new Date(
                            invoice.createdAt
                          ).toLocaleDateString("en-IN")}
                        </td>

                        <td className="px-4 py-3">
                          <InvoicePDFButton
                            invoice={invoice}
                          />
                        </td>

                      </tr>

                    ))}

                  </tbody>

                </table>

              </div>

            )}

          </div>
        )}

        {/* Recent Invoices */}
        {!searchTerm && (
          <div className="mt-6">

            <div className="mb-3 flex items-center justify-between">

              <h3 className="font-semibold text-slate-800">
                Recent Invoices
              </h3>

              <span className="text-sm text-slate-500">
                Latest 5
              </span>

            </div>

            {displayedInvoices.length === 0 ? (

              <div className="rounded-lg bg-slate-50 p-6 text-center text-slate-500">
                No invoices available
              </div>

            ) : (

              <div className="overflow-x-auto">

                <table className="w-full">

                  <thead className="bg-slate-50">

                    <tr>

                      <th className="px-4 py-3 text-left text-sm">
                        Invoice No
                      </th>

                      <th className="px-4 py-3 text-left text-sm">
                        Customer
                      </th>

                      <th className="px-4 py-3 text-left text-sm">
                        Amount
                      </th>

                      <th className="px-4 py-3 text-left text-sm">
                        Action
                      </th>

                    </tr>

                  </thead>

                  <tbody>

                    {displayedInvoices.map((invoice) => (

                      <tr
                        key={invoice.id}
                        className="border-t"
                      >

                        <td className="px-4 py-3 font-medium text-blue-600">
                          {invoice.invoiceNumber}
                        </td>

                        <td className="px-4 py-3">
                          {invoice.customerName}
                        </td>

                        <td className="px-4 py-3 font-semibold">
                          ₹{" "}
                          {Number(
                            invoice.grandTotal || 0
                          ).toLocaleString("en-IN")}
                        </td>

                        <td className="px-4 py-3">
                          <InvoicePDFButton
                            invoice={invoice}
                          />
                        </td>

                      </tr>

                    ))}

                  </tbody>

                </table>

              </div>

            )}

          </div>
        )}

      </div>

    </div>
  );
};

export default Dashboard;