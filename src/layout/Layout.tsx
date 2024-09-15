import Footer from "../components/Footer/Footer";
import Navbar from "../components/Navbar/Navbar";
import styles from "./Layout.module.css";
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <>
      <Navbar/>
      <div className={styles.container}>
        <main className={styles.content}>
          <Outlet />
        </main>
      <Footer />
      </div>
    </>
  );
}