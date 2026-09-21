import { useState } from "react";
import { Trash2 } from "lucide-react";
import { useBilling } from "../context/BillingContext";

export default function Customers() {
  const {
    customers,
    addCustomer,
    deleteCustomer,
  } = useBilling();

  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.name || !form.phone) {
      alert("Name and phone are required.");
      return;
    }

    addCustomer(form);

    setForm({
      name: "",
      phone: "",
      email: "",
    });
  };

  return (
    <div>
      <h1 className="text-3xl font-bold">
        Customers
      </h1>

      <p className="text-slate-500 mt-1">
        Manage your customers
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
        <div className="bg-white border rounded-xl p-6">
          <h2 className="font-semibold text-lg mb-5">
            Add Customer
          </h2>

          <form
            onSubmit={handleSubmit}
            className="space-y-4"
          >
            <input
              value={form.name}
              onChange={(e) =>
                setForm({
                  ...form,
                  name: e.target.value,
                })
              }
              placeholder="Customer name"
              className="w-full border rounded-lg px-4 py-3"
            />

            <input
              value={form.phone}
              onChange={(e) =>
                setForm({
                  ...form,
                  phone: e.target.value,
                })
              }
              placeholder="Phone number"
              className="w-full border rounded-lg px-4 py-3"
            />

            <input
              value={form.email}
              onChange={(e) =>
                setForm({
                  ...form,
                  email: e.target.value,
                })
              }
              placeholder="Email"
              className="w-full border rounded-lg px-4 py-3"
            />

            <button className="w-full bg-sky-500 hover:bg-sky-600 text-white rounded-lg py-3">
              Add Customer
            </button>
          </form>
        </div>

        <div className="lg:col-span-2 bg-white border rounded-xl p-6">
          <h2 className="font-semibold text-lg mb-5">
            Customer List
          </h2>

          <table className="w-full">
            <thead>
              <tr className="border-b text-left">
                <th className="py-3">Name</th>
                <th>Phone</th>
                <th>Email</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {customers.map((customer) => (
                <tr
                  key={customer.id}
                  className="border-b"
                >
                  <td className="py-3">
                    {customer.name}
                  </td>

                  <td>{customer.phone}</td>

                  <td>{customer.email}</td>

                  <td>
                    <button
                      onClick={() =>
                        deleteCustomer(customer.id)
                      }
                      className="text-red-500"
                    >
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}