import AdminNavbar from "../components/Navbar_Admin"
export default function AdminLayout({ children }) {
  return (
    <div className="admin-layout">
      <AdminNavbar />
      <main>{children}</main>
    </div>
  );
}
