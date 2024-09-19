import {
  AiIdeaIcon,
  CopyrightIcon,
  GithubIcon,
} from "hugeicons-react";
import styles from "./Footer.module.css";
import { Link } from "react-router-dom";
import logo from "../../assets/images/logo.png";
export default function Footer() {
  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <Link to="/">
          <img src={logo} className={styles.logo} />
        </Link>
        <h3 style={{ display: "flex", gap: "10px" }}>
          Bring your ideas to Life! <AiIdeaIcon />
        </h3>
        <a
          href="https://github.com/faizi-7/graveyard-front"
          target="_blank"
          rel="noopener noreferrer"
        >
          <button className={styles.github}>
            Available @ <GithubIcon size={20} />
          </button>
        </a>
      </div>
      <div className={styles.mid}>
        <p style={{ display: "flex", gap: "10px", alignItems: "center" }}>
          Links{" "}
        </p>
        <div className={styles.midLinks}>
          <div>
            <Link to="/" className="link">
              Home
            </Link>
          </div>
          <div>|</div>
          <div>
            <Link to="/about" className="link">
              About
            </Link>
          </div>
          <div>|</div>
          <div>
            <a href="/#contact" className="link">
              Contact
            </a>
          </div>
          <div>|</div>
          <div>
            <Link to="/ideas" className="link">
              Ideas
            </Link>
          </div>
        </div>
        <div className={styles.bottom}>
          Made by Faiz Iqbal <CopyrightIcon size={18} />
        </div>
      </div>
    </div>
  );
}
