import { useRef, useState, useEffect } from "react";
import { FaCheck, FaTimes, FaInfoCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import Button from "../../components/Button";

const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

const Register = () => {
  const userRef = useRef();
  const errRef = useRef();

  const [username, setUsername] = useState("");
  const [validName, setValidName] = useState(false);
  const [userFocus, setUserFocus] = useState(false);

  const [pwd, setPwd] = useState("");
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  const [matchPwd, setMatchPwd] = useState("");
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setValidName(USER_REGEX.test(username));
  }, [username]);

  useEffect(() => {
    setValidPwd(PWD_REGEX.test(pwd));
    setValidMatch(pwd === matchPwd);
  }, [pwd, matchPwd]);

  useEffect(() => {
    setErrMsg("");
  }, [username, pwd, matchPwd]);

  const handleSubmit = (e) => {
    e.preventDefault();
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
        <section className="flex flex-col gap-1 justify-start p-4 bg-slate-200 w-[500px] rounded-md">
          <p
            ref={errRef}
            className={errMsg ? "errmsg" : "absolute left-[-9999px]"}
            aria-live="assertive"
          >
            {errMsg} Error Messages Here
          </p>
          <h1 className="text-2xl border-b-2 border-1 border-red-800 pb-2 text-red-900">
            Register
          </h1>
          <form
            onSubmit={handleSubmit}
            className="flex flex-col justify-start gap-1"
          >
            <label htmlFor="username" className="text-red-900">
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
              onFocus={() => setUserFocus(true)}
              onBlur={() => setUserFocus(false)}
              className="px-2 py-1 rounded-md outline-none bg-red-50"
            />
            <p
              id="uidnote"
              className={
                userFocus && !validName
                  ? "relative text-xs rounded-lg bg-slate-100 text-dark-base p-1 -bottom-1"
                  : "absolute left-[-9999px]"
              }
            >
              <FaInfoCircle className="mr-1" />
              4 to 24 characters.
              <br />
              Must begin with a letter.
              <br />
              Letters, numbers, underscores, hyphens allowed.
            </p>

            <label htmlFor="password" className="text-red-900">
              Password:
              <FaCheck
                className={validPwd ? "text-green-300 ml-1" : "hidden"}
              />
              <FaTimes
                className={validPwd || !pwd ? "hidden" : "text-red-300 ml-1"}
              />
            </label>
            <input
              type="password"
              id="password"
              onChange={(e) => setPwd(e.target.value)}
              value={pwd}
              required
              aria-invalid={validPwd ? "false" : "true"}
              aria-describedby="pwdnote"
              onFocus={() => setPwdFocus(true)}
              onBlur={() => setPwdFocus(false)}
              className="px-2 py-1 rounded-md outline-none bg-red-50"
            />
            <p
              id="pwdnote"
              className={
                pwdFocus && !validPwd
                  ? "relative text-xs rounded-lg bg-slate-100 text-dark-base p-1 -bottom-1"
                  : "absolute left-[-9999px]"
              }
            >
              <FaInfoCircle className="mr-1" />
              8 to 24 characters.
              <br />
              Must include uppercase and lowercase letters, a number and a
              special character.
              <br />
              Allowed special characters:{" "}
              <span aria-label="exclamation mark">!</span>{" "}
              <span aria-label="at symbol">@</span>{" "}
              <span aria-label="hashtag">#</span>{" "}
              <span aria-label="dollar sign">$</span>{" "}
              <span aria-label="percent">%</span>
            </p>

            <label htmlFor="confirm_pwd" className="text-red-900">
              Confirm Password:
              <FaCheck
                className={
                  validMatch && matchPwd ? "text-green-300 ml-1" : "hidden"
                }
              />
              <FaTimes
                className={
                  validMatch || !matchPwd ? "hidden" : "text-red-300 ml-1"
                }
              />
            </label>
            <input
              type="password"
              id="confirm_pwd"
              onChange={(e) => setMatchPwd(e.target.value)}
              value={matchPwd}
              required
              aria-invalid={validMatch ? "false" : "true"}
              aria-describedby="confirmnote"
              onFocus={() => setMatchFocus(true)}
              onBlur={() => setMatchFocus(false)}
              className="px-2 py-1 rounded-md outline-none bg-red-50"
            />
            <p
              id="confirmnote"
              className={
                matchFocus && !validMatch
                  ? "relative text-xs rounded-lg bg-slate-100 text-dark-base p-1 -bottom-1"
                  : "absolute left-[-9999px]"
              }
            >
              <FaInfoCircle className="mr-1" />
              Must match the first password input field.
            </p>

            <Button
              disabled={!validName || !validPwd || !validMatch ? true : false}
              tail="w-full bg-red-200 my-3 text-red-900"
            >
              Sign Up
            </Button>
          </form>
          <p>
            Already registered?
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

export default Register;
