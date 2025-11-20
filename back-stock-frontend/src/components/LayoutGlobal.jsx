import Navbar from "../components/NavBar";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <Navbar />
      <main style={{ padding: "24px" }}>
        <Outlet />
      </main>
    </>
  );
};

export default Layout;
