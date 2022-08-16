import React, { useState, useContext, useRef } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../store/auth-context";

const signInHandler = async (email, password) => {
  const response = await fetch(
    "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBl3rcB9zF6RKJu_jhIgtx124tIASRJXoQ",
    {
      method: "POST",
      body: JSON.stringify({ email, password, returnSecureToken: true }),
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const data = await response.json();
  return data;
};

const Login = () => {
  const navigate = useNavigate();
  const authCtx = useContext(AuthContext);
  const [loginError, setLoginError] = useState(null);
  const [formInputValidity, setFormInputValidity] = useState({
    email: true,
    password: true,
  });

  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  const formHandler = async (event) => {
    event.preventDefault();
    const isEmpty = (value) => value.trim() === "";
    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;
    const enteredEmailIsValid = !isEmpty(enteredEmail);
    const enteredPasswordIsValid = !isEmpty(enteredPassword);

    setFormInputValidity({
      email: enteredEmailIsValid,
      password: enteredPasswordIsValid,
    });

    const formIsValid = enteredEmailIsValid && enteredPasswordIsValid;
    if (!formIsValid) {
      return;
    }

    const response = await signInHandler(enteredEmail, enteredPassword);
    if (response.error) {
      setLoginError(response.error.message);
      return;
    }
    setLoginError(null);
    const expirationTime = new Date(
      new Date().getTime() + +response.expiresIn * 1000
    );
    authCtx.login(response.idToken, expirationTime.toISOString());
    navigate("/products", { replace: true });
  };

  return (
    <>
      <form onSubmit={formHandler}>
        <div className="container-sm " style={{ maxWidth: 740 }}>
          <div className=" card">
            <h1 className="card-title text-center mt-4">Log In</h1>
            <div className="card-body">
              <div className="login">
                <label className="form-label">Email</label>
                <input
                  className="form-control"
                  id="id"
                  type="text"
                  placeholder="Email..."
                  name="id"
                  ref={emailInputRef}
                />
                {!formInputValidity.email && (
                  <small id="errorEmail" className="text-danger">
                    Please enter Admin email.
                  </small>
                )}
              </div>
              <div className="login">
                <label>Password</label>
                <input
                  className="form-control"
                  id="password"
                  type="password"
                  placeholder="Password..."
                  name="password"
                  ref={passwordInputRef}
                />
                {!formInputValidity.password && (
                  <small className=" text-danger">
                    Please enter Admin password.
                  </small>
                )}
              </div>
              {loginError ? (
                <small className="text-danger">{loginError}</small>
              ) : null}
              <div className="mt-5 text-center">
                <button className="btn btn-primary">LOG IN</button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default Login;
