import { Menu11Icon, Moon02Icon, Sun01Icon } from "hugeicons-react";
import styles from "./Navbar.module.css";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { useSetRecoilState } from "recoil";
import { tokenState } from "../../recoil/atom";
import logo from '../../assets/images/logo.png'

export default function Navbar() {
  const { data, isLoading, error } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [theme, setTheme] = useState("light");
  const setToken = useSetRecoilState(tokenState);
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  function logoutHandler() {
    localStorage.removeItem("token");
    setToken(null);
  }
  document.documentElement.setAttribute("data-theme", theme);
  return (
    <nav className={styles.navbar}>
      <h2>
        <Link to="/" >
          <img src={logo} className={styles.logo}/>
        </Link>
      </h2>
      <div
        className={styles.toggle}
        aria-label="Toggle navigation"
        onClick={toggleMenu}
      >
        <Menu11Icon type="rounded" size={28} />
      </div>
      <div className={`${styles.menu} ${isOpen ? styles.menuOpen : ""}`}>
        {!isLoading && (
          <>
            <div className={styles.item}>
              <Link to="/" className="link">Home</Link>
            </div>
            <div className={styles.item}>
              <Link to="/ideas" className="link">Ideas</Link>
            </div>
            {data ? (
              <>
                <div className={styles.item}>
                  <Link to="/create" className="link">Create Idea</Link>
                </div>
              </>
            ) : (
              <>
                <div className={styles.item}>
                  <Link to="/login" className="link">Login</Link>
                </div>
                <div className={styles.item}>
                  <Link to="/register" className="link">Register</Link>
                </div>
              </>
            )}
          </>
        )}
        {!isLoading && data ? (
          <div className={styles.profileContainer}>
            <div className={styles.avatarContainer}>
              <img src={data.profileUrl} className={styles.avatar} />
              <div className={styles.avatarName}>@{data.username}</div>
            </div>
            <div className={styles.avatarOptions}>
                <div className={styles.item}><Link to={`/profile/${data.userId}` } className="link">Visit Profile</Link></div>
                <div className={styles.item}><Link to={`/upgrade/${data.userId}`} className="link">Upgrade Profile</Link></div>
                {!data.emailVerified && <div className={styles.item}><Link to={`/verifyemail`} className="link">Verify Email</Link></div>}
                <button className={styles.item} onClick={logoutHandler}>Logout</button>
            </div>
          </div>
        ) : (
          <></>
        )}
        <div
          className={styles.item}
          aria-label="Toggle theme"
          onClick={toggleTheme}
          style={{ cursor: "pointer" }}
        >
          {theme === "light" ? <Moon02Icon /> : <Sun01Icon />}
        </div>
      </div>
    </nav>
  );
}
