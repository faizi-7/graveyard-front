import { AiIdeaIcon, CopyrightIcon, GithubIcon, Link01Icon, Wrench01Icon } from "hugeicons-react";
import styles from "./Footer.module.css";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <h1>Ideas App</h1>
        <h3 style={{"display" : "flex", "gap" : "10px"}}>
          Bring your ideas to Life! <AiIdeaIcon />
        </h3>
        <button className={styles.github}>
          Available @  <GithubIcon size= {20} />
        </button>
      </div>
      <div className={styles.mid}>
        <p style={{"display" :"flex" , "gap" : "10px", "alignItems" : "center"}}>Links </p>
        <div className={styles.midLinks}>

          <div>
            <Link to="/" className="link">Home</Link>
          </div>
          <div>|</div>
          <div>
            <Link to="/" className="link">About</Link>
          </div>
          <div>|</div>
          <div>
            <Link to="/" className="link">Ideas</Link>
          </div>
          <div>|</div>
          <div>
            <Link to="/" className="link">Contact</Link>
          </div>
        </div>
        <div className={styles.bottom}>
          Made by Faiz Iqbal <CopyrightIcon size={18}/>
        </div>
      </div>
    </div>
  );
}
