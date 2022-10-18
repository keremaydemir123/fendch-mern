import { useRef, useState, useEffect } from "react";
import { FaCheck, FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";
import Button from "../../components/Button";
import { useAsyncFn } from "../../hooks/useAsync";
import { signup } from "../../services/auth";
import Loading from "../../components/Loading";

const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const EMAIL_REGEX = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
const PASSWORD_REGEX =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

const Signup = () => {
  const userRef = useRef();
  const errRef = useRef();

  const [username, setUsername] = useState("");
  const [validName, setValidName] = useState(false);

  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(false);

  const [password, setPassword] = useState("");
  const [validPassword, setValidPassword] = useState(false);

  const [matchPassword, setMatchPassword] = useState("");
  const [validMatch, setValidMatch] = useState(false);

  const [success, setSuccess] = useState(false);

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setValidName(USER_REGEX.test(username));
  }, [username]);

  useEffect(() => {
    setValidEmail(EMAIL_REGEX.test(email));
  }, [email]);

  useEffect(() => {
    setValidPassword(PASSWORD_REGEX.test(password));
    setValidMatch(password === matchPassword);
  }, [password, matchPassword]);

  const { loading, error, execute: signupFn } = useAsyncFn(signup);

  if (loading) return <Loading />;

  const handleSubmit = async (e) => {
    e.preventDefault();
    await signupFn({ username, email, password });
    setSuccess(true);
  };

  return (
    <div className="flex items-center justify-center h-screen w-full bg-red-400">
      {success ? (
        <section>
          <h1>Success!</h1>
          <p>
            <Link to="/login">Sign In</Link>
          </p>
        </section>
      ) : (
        <section className="flex flex-col gap-1 justify-start p-8 bg-slate-200 w-[500px] rounded-md">
          <p
            ref={errRef}
            className={error ? "errmsg" : "absolute left-[-9999px]"}
            aria-live="assertive"
          >
            {error}
          </p>
          <h1 className="text-2xl border-b-2 border-1 border-red-800 pb-2 text-red-900">
            Sign Up
          </h1>
          <form
            onSubmit={handleSubmit}
            className="flex flex-col justify-start gap-1 py-2"
          >
            <label
              htmlFor="username"
              className="text-red-900 flex items-center"
            >
              Username:
              <FaCheck
                className={validName ? "text-green-300 ml-1" : "hidden"}
              />
              <FaTimes
                className={
                  validName || !username ? "hidden" : "text-red-300 ml-1"
                }
              />
            </label>
            <input
              type="text"
              id="username"
              ref={userRef}
              autoComplete="off"
              onChange={(e) => setUsername(e.target.value)}
              value={username}
              required
              aria-invalid={validName ? "false" : "true"}
              aria-describedby="uidnote"
              className="px-2 py-1 rounded-md outline-none bg-red-50"
            />

            <label htmlFor="email" className="text-red-900 flex items-center">
              Email:
              <FaCheck
                className={validEmail ? "text-green-300 ml-1" : "hidden"}
              />
              <FaTimes
                className={
                  validEmail || !email ? "hidden" : "text-red-300 ml-1"
                }
              />
            </label>
            <input
              type="email"
              id="email"
              autoComplete="on"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              required
              aria-invalid={validEmail ? "false" : "true"}
              aria-describedby="uidnote"
              className="px-2 py-1 rounded-md outline-none bg-red-50"
            />

            <label
              htmlFor="password"
              className="text-red-900 flex items-center"
            >
              Password:
              <FaCheck
                className={validPassword ? "text-green-300 ml-1" : "hidden"}
              />
              <FaTimes
                className={
                  validPassword || !password ? "hidden" : "text-red-300 ml-1"
                }
              />
            </label>
            <input
              type="password"
              id="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              required
              aria-invalid={validPassword ? "false" : "true"}
              aria-describedby="passwordnote"
              className="px-2 py-1 rounded-md outline-none bg-red-50"
            />
            <label
              htmlFor="confirm_password"
              className="text-red-900 flex items-center"
            >
              Confirm Password:
              <FaCheck
                className={
                  validMatch && matchPassword ? "text-green-300 ml-1" : "hidden"
                }
              />
              <FaTimes
                className={
                  validMatch || !matchPassword ? "hidden" : "text-red-300 ml-1"
                }
              />
            </label>
            <input
              type="password"
              id="confirm_password"
              onChange={(e) => setMatchPassword(e.target.value)}
              value={matchPassword}
              required
              aria-invalid={validMatch ? "false" : "true"}
              aria-describedby="confirmnote"
              className="px-2 py-1 rounded-md outline-none bg-red-50"
            />
            <Button
              tail="w-full bg-red-200 my-3 text-red-900"
              disabled={
                !validName || !validPassword || !validMatch ? true : false
              }
            >
              Sign Up
            </Button>
          </form>
          <p>
            Already have an account?
            <br />
            <span className="line">
              <Link to="/login">
                <Button tail="bg-red-200 my-3 px-4 text-red-900 shadow-sm">
                  Sign In
                </Button>
              </Link>
            </span>
          </p>
        </section>
      )}
    </div>
  );
};

export default Signup;
