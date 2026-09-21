import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "./components/Layout";

import Dashboard from "./pages/Dashboard";
import Products from "./pages/Products";
import Customers from "./pages/Customers";
import CreateInvoice from "./pages/CreateInvoice";
import Invoices from "./pages/Invoices";

export default function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />

          <Route
            path="/products"
            element={<Products />}
          />

          <Route
            path="/customers"
            element={<Customers />}
          />

          <Route
            path="/create-invoice"
            element={<CreateInvoice />}
          />

          <Route
            path="/invoices"
            element={<Invoices />}
          />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}