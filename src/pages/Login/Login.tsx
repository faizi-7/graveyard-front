import { Link, useNavigate } from "react-router-dom";
import styles from "./Login.module.css";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { loginUser } from "../../api/authApi";
import { useSetRecoilState } from "recoil";
import { tokenState } from "../../recoil/atom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repass, setRepass] = useState("");
  const setToken= useSetRecoilState(tokenState)
  const navigate= useNavigate()
  
  // Correcting mutation options
  const { isPending, mutate } = useMutation({
    mutationFn: (arg: { email: string; password: string }) => loginUser(arg),
    onSuccess: (data) => {
      localStorage.setItem("token", data);
      setToken(data)
      console.log("Login successful!", data);
      navigate('/')
    },
    onError: (error: any) => {
      console.error("Login failed!", error.response?.data || error.message);
      alert('Login Failed Try Again!')
    },
  });

  // Form submission
  function submitForm(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault(); // Prevent default form submission
    if (password !== repass) {
      return alert("Passwords do not match!");
    }
    // Trigger the mutation
    mutate({ email, password });
  }

  return (
    <div className={styles.registerContainer}>
      <div className={styles.formContainer}>
        <form className={styles.form} onSubmit={submitForm}>
          <h2>Login</h2>
          <input
            type="email"
            placeholder="Email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            type="password"
            placeholder="Re-enter Password"
            required
            value={repass}
            onChange={(e) => setRepass(e.target.value)}
          />
          <button type="submit" disabled={isPending}>
            {isPending ? "Logging in..." : "Login"}
          </button>
          <div className={styles.warning}>
            <Link to="/forgot">Forgot Password?</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
