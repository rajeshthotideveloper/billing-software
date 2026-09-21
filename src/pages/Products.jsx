import { useState } from "react";
import { Trash2, Plus } from "lucide-react";
import { useBilling } from "../context/BillingContext";

export default function Products() {
  const {
    products,
    addProduct,
    deleteProduct,
  } = useBilling();

  const [form, setForm] = useState({
    name: "",
    sku: "",
    price: "",
    stock: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.name || !form.price) {
      alert("Product name and price are required.");
      return;
    }

    addProduct({
      ...form,
      price: Number(form.price),
      stock: Number(form.stock),
    });

    setForm({
      name: "",
      sku: "",
      price: "",
      stock: "",
    });
  };

  return (
    <div>
      <h1 className="text-3xl font-bold">
        Products
      </h1>

      <p className="text-slate-500 mt-1">
        Manage your products and inventory
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
        <div className="bg-white border rounded-xl p-6">
          <h2 className="font-semibold text-lg mb-5">
            Add Product
          </h2>

          <form
            onSubmit={handleSubmit}
            className="space-y-4"
          >
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Product name"
              className="w-full border rounded-lg px-4 py-3"
            />

            <input
              name="sku"
              value={form.sku}
              onChange={handleChange}
              placeholder="SKU"
              className="w-full border rounded-lg px-4 py-3"
            />

            <input
              name="price"
              type="number"
              value={form.price}
              onChange={handleChange}
              placeholder="Price"
              className="w-full border rounded-lg px-4 py-3"
            />

            <input
              name="stock"
              type="number"
              value={form.stock}
              onChange={handleChange}
              placeholder="Stock"
              className="w-full border rounded-lg px-4 py-3"
            />

            <button className="w-full bg-sky-500 hover:bg-sky-600 text-white rounded-lg py-3 flex items-center justify-center gap-2">
              <Plus size={18} />
              Add Product
            </button>
          </form>
        </div>

        <div className="lg:col-span-2 bg-white border rounded-xl p-6">
          <h2 className="font-semibold text-lg mb-5">
            Product List
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b text-left">
                  <th className="py-3">Name</th>
                  <th>SKU</th>
                  <th>Price</th>
                  <th>Stock</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {products.map((product) => (
                  <tr
                    key={product.id}
                    className="border-b"
                  >
                    <td className="py-3 font-medium">
                      {product.name}
                    </td>

                    <td>{product.sku}</td>

                    <td>
                      ₹{product.price.toLocaleString()}
                    </td>

                    <td>{product.stock}</td>

                    <td>
                      <button
                        onClick={() =>
                          deleteProduct(product.id)
                        }
                        className="text-red-500 hover:text-red-700"
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
    </div>
  );
}