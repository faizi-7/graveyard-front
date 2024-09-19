import { ArrowUpRight01Icon } from "hugeicons-react";
import styles from "./Hero.module.css";
import firstimage from "../../assets/images/hero1.png";
import secondimage from "../../assets/images/hero2.png";
import thirdimage from "../../assets/images/hero3.png";
import fourthimage from "../../assets/images/hero4.png";
import { Link } from "react-router-dom";
import TopIdeasCarousel from "../TopIdeasCarousel/TopIdeasCarousel";
import Contact from "../Contact/Contact";
import { useAuth } from "../../hooks/useAuth";
export default function Hero() {
  const {data, isLoading}= useAuth()
  return (
    <div className={styles.container}>
      <div className={styles.section1}>
        <div className={styles.heading}>
          Share Your Idea, Find Support, Make a Difference
        </div>
        <div className={styles.subHeading}>
          A platform where anyone, no matter their background or resources, can
          share their ideas. Connect with a community, collaborate, and find
          support to bring your vision to life.
        </div>
        <div className={styles.buttonGrp}>
          <Link to="/ideas">
            <button style={{ display: "flex", gap: "5px" }}>
              Explore Ideas <ArrowUpRight01Icon size={20} />
            </button>
          </Link>
          {(!isLoading && !data) ?
            <Link to="/login">
              <button style={{ display: "flex", gap: "5px", alignItems : "center" }}>
                Login
              </button>
            </Link> : <></>
          } 
        </div>
      </div>
      <hr />
      <div className={styles.section2}>
        <h1>Why Use This ?</h1>
        <div className={styles.boxes}>
          <div className={styles.box}>
            <img className={styles.boxImage} src={fourthimage} />
            <h2>Got an Idea But Lack the Resources?</h2>
            <p>
              Have a great idea but don’t have the time, money, or connections
              to make it happen? Share it here and let others help bring it to
              life.
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
            <h2>Want to Know If Your Idea Can Make an Impact?</h2>
            <p>
            Curious if your idea could change lives? Share it with the community and get valuable feedback to help you shape its future.
            </p>
          </div>
          <div className={styles.box}>
            <img className={styles.boxImage} src={secondimage} />
            <h2>Have the Skills But Need an Idea?</h2>
            <p>
            Looking for meaningful work? Find ideas that need your skills, collaborate, and help turn them into something real.
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
      <div id="contact" className={styles.section2}>
        <h1>Let's Talk!</h1>
        <p>
          Whether you have a question about how Eyedea works, want to suggest a
          new feature, or just want to share your thoughts, we're here to
          listen.
        </p>
        <Contact />
      </div>
    </div>
  );
}
