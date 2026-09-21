import { useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import { useBilling } from "../context/BillingContext";
import { useNavigate } from "react-router-dom";

export default function CreateInvoice() {
  const {
    products,
    customers,
    addInvoice,
  } = useBilling();

  const navigate = useNavigate();

  const [customerId, setCustomerId] = useState("");
  const [items, setItems] = useState([]);
  const [gst, setGst] = useState(18);
  const [discount, setDiscount] = useState(0);

  const addItem = () => {
    setItems([
      ...items,
      {
        productId: "",
        quantity: 1,
      },
    ]);
  };

  const updateItem = (index, field, value) => {
    const updated = [...items];

    updated[index][field] = value;

    setItems(updated);
  };

  const removeItem = (index) => {
    setItems(
      items.filter((_, itemIndex) => itemIndex !== index)
    );
  };

  const subtotal = items.reduce((total, item) => {
    const product = products.find(
      (p) => p.id === Number(item.productId)
    );

    if (!product) return total;

    return total + product.price * Number(item.quantity);
  }, 0);

  const gstAmount =
    ((subtotal - discount) * Number(gst)) / 100;

  const grandTotal =
    subtotal - discount + gstAmount;

  const handleSubmit = (e) => {
    e.preventDefault();

    const customer = customers.find(
      (c) => c.id === Number(customerId)
    );

    if (!customer) {
      alert("Please select a customer.");
      return;
    }

    if (items.length === 0) {
      alert("Please add at least one product.");
      return;
    }

    const invoiceItems = items.map((item) => {
      const product = products.find(
        (p) => p.id === Number(item.productId)
      );

      return {
        productId: product.id,
        productName: product.name,
        quantity: Number(item.quantity),
        price: product.price,
        total:
          product.price * Number(item.quantity),
      };
    });

    addInvoice({
      customerId: customer.id,
      customerName: customer.name,
      customerPhone: customer.phone,
      items: invoiceItems,
      subtotal,
      discount: Number(discount),
      gst: Number(gst),
      gstAmount,
      grandTotal,
    });

    alert("Invoice created successfully!");

    navigate("/invoices");
  };

  return (
    <div>
      <h1 className="text-3xl font-bold">
        Create Invoice
      </h1>

      <p className="text-slate-500 mt-1">
        Create a new customer invoice
      </p>

      <form
        onSubmit={handleSubmit}
        className="mt-8 space-y-6"
      >
        <div className="bg-white border rounded-xl p-6">
          <label className="block font-medium mb-2">
            Customer
          </label>

          <select
            value={customerId}
            onChange={(e) =>
              setCustomerId(e.target.value)
            }
            className="w-full border rounded-lg px-4 py-3"
          >
            <option value="">
              Select Customer
            </option>

            {customers.map((customer) => (
              <option
                key={customer.id}
                value={customer.id}
              >
                {customer.name} - {customer.phone}
              </option>
            ))}
          </select>
        </div>

        <div className="bg-white border rounded-xl p-6">
          <div className="flex justify-between items-center mb-5">
            <h2 className="font-semibold text-lg">
              Invoice Items
            </h2>

            <button
              type="button"
              onClick={addItem}
              className="bg-sky-500 text-white px-4 py-2 rounded-lg flex items-center gap-2"
            >
              <Plus size={18} />
              Add Product
            </button>
          </div>

          <div className="space-y-4">
            {items.map((item, index) => {
              const product = products.find(
                (p) => p.id === Number(item.productId)
              );

              const total = product
                ? product.price *
                  Number(item.quantity)
                : 0;

              return (
                <div
                  key={index}
                  className="grid grid-cols-12 gap-4 items-center"
                >
                  <select
                    value={item.productId}
                    onChange={(e) =>
                      updateItem(
                        index,
                        "productId",
                        e.target.value
                      )
                    }
                    className="col-span-5 border rounded-lg px-4 py-3"
                  >
                    <option value="">
                      Select Product
                    </option>

                    {products.map((product) => (
                      <option
                        key={product.id}
                        value={product.id}
                      >
                        {product.name} - ₹
                        {product.price}
                      </option>
                    ))}
                  </select>

                  <input
                    type="number"
                    min="1"
                    value={item.quantity}
                    onChange={(e) =>
                      updateItem(
                        index,
                        "quantity",
                        e.target.value
                      )
                    }
                    className="col-span-2 border rounded-lg px-4 py-3"
                  />

                  <div className="col-span-3 font-medium">
                    ₹{total.toLocaleString()}
                  </div>

                  <button
                    type="button"
                    onClick={() =>
                      removeItem(index)
                    }
                    className="text-red-500"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        <div className="bg-white border rounded-xl p-6">
          <div className="max-w-md ml-auto space-y-4">
            <div className="flex justify-between">
              <span>Subtotal</span>

              <span>
                ₹{subtotal.toLocaleString()}
              </span>
            </div>

            <div className="flex justify-between items-center">
              <span>Discount</span>

              <input
                type="number"
                min="0"
                value={discount}
                onChange={(e) =>
                  setDiscount(e.target.value)
                }
                className="w-32 border rounded-lg px-3 py-2 text-right"
              />
            </div>

            <div className="flex justify-between items-center">
              <span>GST (%)</span>

              <input
                type="number"
                min="0"
                value={gst}
                onChange={(e) =>
                  setGst(e.target.value)
                }
                className="w-32 border rounded-lg px-3 py-2 text-right"
              />
            </div>

            <div className="flex justify-between">
              <span>GST Amount</span>

              <span>
                ₹{gstAmount.toLocaleString()}
              </span>
            </div>

            <div className="border-t pt-4 flex justify-between text-xl font-bold">
              <span>Grand Total</span>

              <span>
                ₹{grandTotal.toLocaleString()}
              </span>
            </div>

            <button className="w-full bg-sky-500 hover:bg-sky-600 text-white rounded-lg py-3 font-semibold">
              Create Invoice
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}