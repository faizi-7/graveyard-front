import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import styles from "./Register.module.css"; // Assuming you're using module CSS
import { registerUser } from "../../api/authApi";
import { useNavigate } from "react-router-dom";
import ErrorBox from "../../components/ErrorBox/ErrorBox";
import SuccessBox from "../../components/SuccessBox/SuccessBox";

const Register = () => {
  const [activeTab, setActiveTab] = useState<"basic" | "complete">("basic");
  const [countdown, setCountdown] = useState<number | null>(5);
  const navigate = useNavigate();
  // Mutation to handle registration API call
  const { mutate, isPending, isError, error, isSuccess } = useMutation({
    mutationFn: registerUser,
    onSuccess: () => {
      const timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev === null || prev <= 1) {
            clearInterval(timer);
            navigate("/login");
            return null;
          }
          return prev - 1;
        });
      }, 1000);
    },
    onError: (err) => {
      console.log(err);
    },
  });

  const handleTabSwitch = (tab: "basic" | "complete") => {
    setActiveTab(tab);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    mutate(formData);
  };

  return (
    <div className={styles.registerContainer}>
      <div className={styles.tabs}>
        <button
          className={activeTab === "basic" ? styles.activeTab : styles.tab}
          onClick={() => handleTabSwitch("basic")}
        >
          Basic
        </button>
        <button
          className={activeTab === "complete" ? styles.activeTab : styles.tab}
          onClick={() => handleTabSwitch("complete")}
        >
          Complete
        </button>
      </div>

      {/* Tab Content */}
      <div className={styles.formContainer}>
        {activeTab === "basic" && (
          <form className={styles.form} onSubmit={handleSubmit}>
            <h2>Basic Registration</h2>
            <div className={styles.inputContainer}>
              <label>Enter Username *</label>
              <input
                name="username"
                type="text"
                placeholder="idea69"
                required
              />
            </div>
            <div className={styles.inputContainer}>
              <label>Enter Email *</label>
              <input name="email" type="email" placeholder="ideas@email.com" required />
            </div>
            <div className={styles.inputContainer}>
              <label>Enter Password *</label>
              <input
                name="password"
                type="password"
                placeholder="Atleast 6 letters!"
                required
              />
            </div>
            <div className={styles.inputContainer}>
              <label>Re Enter Password *</label>
              <input
                name="confirmPassword"
                type="password"
                placeholder="Re-enter Password"
                required
              />
            </div>
            <button type="submit" disabled={isPending}>
              {isPending ? "Registering User..." : "Register"}
            </button>
          </form>
        )}

        {activeTab === "complete" && (
          <form className={styles.form} onSubmit={handleSubmit}>
            <h2>Complete Registration</h2>
            <div className={styles.inputContainer}>
              <label>Enter Full Name</label>
              <input
                name="fullName"
                type="text"
                placeholder="Idea Man"
                required
              />
            </div>
            <div className={styles.inputContainer}>
              <label>Enter Username</label>
              <input
                name="username"
                type="text"
                placeholder="idea69"
                required
              />
            </div>
            <div className={styles.inputContainer}>
              <label>Enter Email</label>
              <input
                name="email"
                type="email"
                placeholder="idea69@gmail.com"
                required
              />
            </div>
            <div className={styles.inputContainer}>
              <label>Enter Password</label>
              <input
                name="password"
                type="password"
                placeholder="******"
                required
              />
            </div>
            <div className={styles.inputContainer}>
              <label>Re Enter Password</label>
              <input
                name="confirmPassword"
                type="password"
                placeholder="******"
                required
              />
            </div>
            <div className={styles.inputContainer}>
              <label>Enter About Yourself</label>
              <textarea
                name="about"
                placeholder="I am ultra cool, fun and nice guy"
              />
            </div>
            <div className={styles.inputContainer}>
              <label>Drop your photo here!</label>
              <input type="file" accept="image/*" name="image" />
            </div>
            {/* <div className={styles.inputCheckbox}>
              <input
                name="agreeToVerification"
                type="checkbox"
                required
                id="checkId"
              />
              <label htmlFor="checkId">I agree to email verification</label>
            </div> */}
            <button type="submit" disabled={isPending || isSuccess}>
              {isPending ? "Registering User..." : "Register"}
            </button>
          </form>
        )}
      </div>

      {isError && <ErrorBox message={error.message} />}
      {isSuccess && (
        <>
          <SuccessBox message="User Registration Successful!" />
          {countdown !== undefined && (
            <p>Redirecting to Login Page in {countdown} seconds...</p>
          )}
        </>
      )}
    </div>
  );
};

export default Register;
