import React, { type FormEvent, useState, useEffect } from "react";
import "./styles.css";
import { useLocation, useNavigate, Link } from "react-router-dom";
import loginApi from "../../api/auth/loginApi";

function Login() {
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const cookies = document.cookie
      .split(";")
      .reduce<{ [key: string]: string }>((acc, cookie) => {
        const [key, value] = cookie.trim().split("=");
        acc[key] = value;
        return acc;
      }, {});

    if (cookies && cookies.email) {
      const userEmail: string = cookies.email;
      setEmail(decodeURIComponent(userEmail));
    }
  }, []);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const res = await loginApi.loginUser(email, password);
      if (res.user) {
        navigate("/profile"); //, { state: res.user.email }
      } else {
        setMessage(res.msg);
      }
    } catch (e) {
      console.log(e);
      setMessage("Error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <div className="login-container">
        <p>{loading ? 'Loading...' : message}</p>
        {!loading && (
          <>
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
              <input
                type="email"
                defaultValue={email}
                id="email"
                name="email"
                maxLength={50}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                required
              />
              <input
                type="password"
                id="password"
                name="password"
                maxLength={30}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                required
              />
              <input type="submit" value="Submit" className="submit" />
            </form>
            <Link to="/SignUp" className="signup-link">
              Sign Up
            </Link>
          </>
        )}
      </div>
    </>
  );
}

export default Login;
