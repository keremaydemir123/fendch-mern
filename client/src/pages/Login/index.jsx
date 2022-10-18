import React, { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Button from "../../components/Button";
import { useAsyncFn } from "../../hooks/useAsync";
import { login } from "../../services/auth";
import Loading from "../../components/Loading";

const Login = () => {
  const userRef = useRef();
  const errRef = useRef();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    userRef.current.focus();
  }, []);

  const { loading, error, execute: loginFn } = useAsyncFn(login);
  if (loading) return <Loading />;
  const handleSubmit = async (e) => {
    e.preventDefault();
    await loginFn({ username, password });
    setSuccess(true);
  };

  return (
    <div className="flex items-center justify-center h-screen w-full bg-red-400">
      {success ? (
        <section className="flex flex-col gap-1 justify-start p-8 bg-slate-200 w-[500px] rounded-md">
          <h1> You just logged in!</h1>
          <br />
          <p>
            <Link to="/">Go to Home</Link>
          </p>
        </section>
      ) : (
        <section className="flex flex-col gap-1 justify-start p-8 bg-slate-200 w-[500px] rounded-md">
          <p
            ref={errRef}
            className={
              error ? "bg-red-300 p-2 text-center" : "absolute left-[-9999px] "
            }
            aria-live="assertive"
          >
            {error}
          </p>
          <h1 className="text-2xl border-b-2 border-1 border-red-800 pb-2 text-red-900">
            Sign In
          </h1>
          <form
            onSubmit={handleSubmit}
            className="flex flex-col justify-start gap-1"
          >
            <label htmlFor="username" className="text-red-900">
              Username:
            </label>
            <input
              type="text"
              id="username"
              ref={userRef}
              value={username}
              autoComplete="off"
              onChange={(e) => setUsername(e.target.value)}
              required
              className="px-2 py-1 rounded-md outline-none bg-red-50"
            />

            <label htmlFor="password" className="text-red-900">
              Password:
            </label>
            <input
              type="password"
              id="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              required
              className="px-2 py-1 rounded-md outline-none bg-red-50"
            />
            <Button type="submit" tail="w-full bg-red-200 my-3 text-red-900">
              Sign In
            </Button>
          </form>
          <p>
            Need an Account?
            <br />
            <span className="line">
              <Link to="/signin">
                <Button tail="bg-red-200 my-3 text-red-900 px-4 shadow-sm">
                  Sign Up
                </Button>
              </Link>
            </span>
          </p>
        </section>
      )}
    </div>
  );
};

export default Login;
