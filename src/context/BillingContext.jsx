import { createContext, useContext, useEffect, useState } from "react";

const BillingContext = createContext();

const initialProducts = [
  {
    id: 1,
    name: "Laptop",
    sku: "LAP001",
    price: 50000,
    stock: 10,
  },
  {
    id: 2,
    name: "Wireless Mouse",
    sku: "MOU001",
    price: 800,
    stock: 25,
  },
  {
    id: 3,
    name: "Keyboard",
    sku: "KEY001",
    price: 1500,
    stock: 15,
  },
];

const initialCustomers = [
  {
    id: 1,
    name: "Raj Kumar",
    phone: "9876543210",
    email: "raj@example.com",
  },
  {
    id: 2,
    name: "Anita Sharma",
    phone: "9876501234",
    email: "anita@example.com",
  },
];

export function BillingProvider({ children }) {
  const [products, setProducts] = useState(() => {
    const saved = localStorage.getItem("products");
    return saved ? JSON.parse(saved) : initialProducts;
  });

  const [customers, setCustomers] = useState(() => {
    const saved = localStorage.getItem("customers");
    return saved ? JSON.parse(saved) : initialCustomers;
  });

  const [invoices, setInvoices] = useState(() => {
    const saved = localStorage.getItem("invoices");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("products", JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem("customers", JSON.stringify(customers));
  }, [customers]);

  useEffect(() => {
    localStorage.setItem("invoices", JSON.stringify(invoices));
  }, [invoices]);

  const addProduct = (product) => {
    setProducts((prev) => [
      ...prev,
      {
        ...product,
        id: Date.now(),
      },
    ]);
  };

  const deleteProduct = (id) => {
    setProducts((prev) => prev.filter((product) => product.id !== id));
  };

  const addCustomer = (customer) => {
    setCustomers((prev) => [
      ...prev,
      {
        ...customer,
        id: Date.now(),
      },
    ]);
  };

  const deleteCustomer = (id) => {
    setCustomers((prev) => prev.filter((customer) => customer.id !== id));
  };

  const addInvoice = (invoice) => {
    const invoiceNumber = `INV-${String(invoices.length + 1001)}`;

    const newInvoice = {
      ...invoice,
      id: Date.now(),
      invoiceNumber,
      createdAt: new Date().toISOString(),
    };

    setInvoices((prev) => [...prev, newInvoice]);

    return newInvoice;
  };

  const totalSales = invoices.reduce(
    (sum, invoice) => sum + invoice.grandTotal,
    0
  );

  return (
    <BillingContext.Provider
      value={{
        products,
        customers,
        invoices,
        totalSales,
        addProduct,
        deleteProduct,
        addCustomer,
        deleteCustomer,
        addInvoice,
      }}
    >
      {children}
    </BillingContext.Provider>
  );
}

export function useBilling() {
  return useContext(BillingContext);
}