import { useState } from "react";
import { Search, X } from "lucide-react";
import { useBilling } from "../context/BillingContext";
import InvoicePDFButton from "../components/InvoicePDFButton";

const Invoices = () => {
  const { invoices } = useBilling();
  const [searchTerm, setSearchTerm] = useState("");

  // Search by invoice number
  const filteredInvoices = invoices.filter((invoice) =>
    invoice.invoiceNumber
      ?.toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  const clearSearch = () => {
    setSearchTerm("");
  };

  return (
    <div className="p-6">

      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-slate-800">
          Invoices
        </h1>

        <p className="mt-1 text-slate-500">
          View and download all invoices
        </p>
      </div>

      {/* Search */}
      <div className="mb-6 rounded-xl bg-white p-4 shadow-sm">

        <div className="relative max-w-md">

          <Search
            size={20}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <input
            type="text"
            placeholder="Search by invoice number..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full rounded-lg border border-slate-300 py-2.5 pl-10 pr-10 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
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

        {searchTerm && (
          <p className="mt-2 text-sm text-slate-500">
            {filteredInvoices.length} invoice
            {filteredInvoices.length !== 1 ? "s" : ""} found
          </p>
        )}

      </div>

      {/* Invoice Table */}
      <div className="overflow-hidden rounded-xl bg-white shadow-sm">

        <div className="overflow-x-auto">

          <table className="w-full">

            <thead className="bg-slate-50">
              <tr>

                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">
                  Invoice No
                </th>

                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">
                  Customer
                </th>

                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">
                  Date
                </th>

                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">
                  Amount
                </th>

                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">
                  Action
                </th>

              </tr>
            </thead>

            <tbody>

              {filteredInvoices.length === 0 ? (

                <tr>
                  <td
                    colSpan="5"
                    className="px-6 py-12 text-center"
                  >
                    <div className="text-slate-500">
                      {searchTerm
                        ? `No invoice found for "${searchTerm}"`
                        : "No invoices found"}
                    </div>
                  </td>
                </tr>

              ) : (

                filteredInvoices.map((invoice) => (

                  <tr
                    key={invoice.id}
                    className="border-t border-slate-100 hover:bg-slate-50"
                  >

                    <td className="px-6 py-4 font-medium text-blue-600">
                      {invoice.invoiceNumber}
                    </td>

                    <td className="px-6 py-4 text-slate-700">
                      {invoice.customerName}
                    </td>

                    <td className="px-6 py-4 text-slate-600">
                      {new Date(
                        invoice.createdAt
                      ).toLocaleDateString("en-IN")}
                    </td>

                    <td className="px-6 py-4 font-semibold text-slate-800">
                      ₹{" "}
                      {Number(
                        invoice.grandTotal || 0
                      ).toLocaleString("en-IN")}
                    </td>

                    <td className="px-6 py-4">
                      <InvoicePDFButton invoice={invoice} />
                    </td>

                  </tr>

                ))

              )}

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
};

export default Invoices;