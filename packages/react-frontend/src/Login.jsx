// src/Login.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login(props) {
  const [person, setPerson] = useState({
    name: "",
    password: "",
  });

  const [loginError, setLoginError] = useState(false);

  const navigate = useNavigate();

  function handleKeyDown(event) {
    if (event.key === "Enter") {
      submitForm();
    }
  }

  function handleChange(event) {
    const { name, value } = event.target;
    setPerson((prevPerson) => ({
      ...prevPerson,
      [name]: value,
    }));
  }

  function submitForm() {
    props
      .handleLogin(person)
      .then((res) => {
        localStorage.setItem("username", person.name);
        localStorage.setItem("token", res.token);
        navigate("/main");
      })
      .catch((error) => {
        console.error("Login failed:", error);
        setLoginError(true); // Set login error state
      })
      .finally(() => setPerson({ name: "", password: "" }));
  }

  return (
    <div className="center-box">
      <div className="title-card">Nibble and Scribble</div>
      <form>
        <label htmlFor="name" className="form-label">
          Name
        </label>
        <input
          type="text"
          name="name"
          id="name"
          value={person.name}
          onChange={handleChange}
          className="form-input"
          placeholder="name"
        />
        <label htmlFor="password" className="form-label">
          Password
        </label>
        <input
          type="password"
          name="password"
          id="password"
          value={person.password}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          className="form-input"
          placeholder="password"
        />
        {loginError && (
          <div className="error-message">Invalid username or password</div>
        )}
        <input
          type="button"
          value="Login"
          onClick={submitForm}
          className="form-button"
        />
        <input
          type="button"
          value="New User"
          onClick={() => navigate("/create")}
          className="form-button"
        />
      </form>
    </div>
  );
}
export default Login;
