import UserNavbar from "../components/Navbar_User"
export default function AdminLayout({ children }) {
  return (
    <div className="user-layout">
      <UserNavbar />
      <main>{children}</main>
    </div>
  );
}
