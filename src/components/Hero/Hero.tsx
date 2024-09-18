import { ArrowUpRight01Icon } from "hugeicons-react";
import styles from "./Hero.module.css";
import firstimage from "../../assets/images/hero1.png";
import secondimage from "../../assets/images/hero2.png";
import thirdimage from "../../assets/images/hero3.png";
import fourthimage from "../../assets/images/hero4.png";
import { Link } from "react-router-dom";
import TopIdeasCarousel from "../TopIdeasCarousel/TopIdeasCarousel";
import Contact from "../Contact/Contact";
export default function Hero() {
  return (
    <div className={styles.container}>
      <div className={styles.section1}>
        <div className={styles.heading}>Graveyard of Lost Ideas!</div>
        <div className={styles.subHeading}>
          Don’t Keep Your Ideas Caged in Your Mind—Set Them Free. Each Idea Has
          the Power to Make a Difference.
        </div>
        <button>
          <Link to="/ideas">
            <div style={{ display: "flex", gap: "5px" }}>
              Explore Ideas <ArrowUpRight01Icon />
            </div>
          </Link>
        </button>
      </div>
      <hr />
      <div className={styles.section2}>
        <h1>Why Use This ?</h1>
        <div className={styles.boxes}>
          <div className={styles.box}>
            <img className={styles.boxImage} src={fourthimage} />
            <h2>Have an Idea But No Time to Implement It?</h2>
            <p>
              Got a brilliant idea but lack the time or resources to bring it to
              life? Share it here and let others help execute it!
            </p>
          </div>
          <div className={styles.box}>
            <img className={styles.boxImage} src={firstimage} />
            <h2>Can't Execute an Idea Alone?</h2>
            <p>
              Struggling to turn your idea into reality on your own? Collaborate
              with others and make it happen together!
            </p>
          </div>
          <div className={styles.box}>
            <img className={styles.boxImage} src={thirdimage} />
            <h2>Want to See the Effectiveness of Your Idea?</h2>
            <p>
              Curious about how your idea could perform? Share it with our
              community and get valuable feedback and insights!
            </p>
          </div>
          <div className={styles.box}>
            <img className={styles.boxImage} src={secondimage} />
            <h2>Have the Skills But Need an Idea?</h2>
            <p>
              Looking for a project to work on? Explore ideas shared by others
              and apply your skills to bring them to life!
            </p>
          </div>
        </div>
      </div>
      <hr />
      <div className={styles.section2}>
        <h1>Top Ideas</h1>
        <TopIdeasCarousel />
      </div>
      <hr />
      <div className={styles.section2}>
        <h1>Let's Talk!</h1>
        <Contact />
      </div>
    </div>
  );
}
