// src/CreateUser.jsx

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function CreateUser(props) {
  const [person, setPerson] = useState({
    name: "",
    password: "",
  });

  const [createUserError, setCreateUserError] = useState(null);
  const [usernameError, setUsernameError] = useState(null);
  const [passwordError, setPasswordError] = useState(null);

  const navigate = useNavigate();

  function handleChange(event) {
    const { name, value } = event.target;
    setPerson((prevPerson) => ({
      ...prevPerson,
      [name]: value,
    }));

    // Validate username and password on input change
    if (name === "name") {
      validateUsername(value);
    } else if (name === "password") {
      const strength = strengthOmeter(value);
      const message = strengthMessage(strength);
      setPasswordError(message);
    }
  }

  function validateUsername(username) {
    if (username.length < 1) {
      setUsernameError("U53RN4M3 2 5H0R7 :(");
    } else {
      setUsernameError(null);
    }
  }

  function strengthOmeter(password) {
    let strength = 0;

    if (password.length >= 5) {
      strength += 1;
    }

    if (/[A-Z]/.test(password)) {
      strength += 1;
    }

    if (/[a-z]/.test(password)) {
      strength += 1;
    }

    if (/\d/.test(password)) {
      strength += 1;
    }

    if (/[^A-Za-z0-9]/.test(password)) {
      strength += 1;
    }

    return strength;
  }

  function strengthMessage(strength) {
    switch (strength) {
      case 0:
        return "P455W0RD 2 W34K :(";
      case 1:
        return "P455W0RD 2 W34K :(";
      case 2:
        return "P455W0RD 2 W34K :(";
      case 3:
        return null;
      case 4:
        return null;
      case 5:
        return null;
      default:
        return "no pswd :(";
    }
  }

  function submitUser() {
    if (usernameError || passwordError) {
      alert("Please fix the errors before submitting.");
      return;
    }

    props
      .handleSubmit(person)
      .then(() => {
        // Handle success, return user to login for authentication
        navigate("/");
      })
      .catch((error) => {
        // Handle error
        console.error("Error creating user:", error);
        setCreateUserError(error.message || "Failed to create user.");
      })
      .finally(() => {
        setPerson({ name: "", password: "" });
      });
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
        {usernameError && <div className="error-message">{usernameError}</div>}
        <label htmlFor="password" className="form-label">
          Password
        </label>
        <input
          type="password"
          name="password"
          id="password"
          value={person.password}
          onChange={handleChange}
          className="form-input"
          placeholder="password"
        />
        {passwordError && <div className="error-message">{passwordError}</div>}
        {createUserError && (
          <div className="error-message">{createUserError}</div>
        )}
        <input
          type="button"
          value="Create"
          onClick={submitUser}
          className="form-button"
        />
        <input
          type="button"
          value="Login"
          onClick={() => navigate("/")}
          className="form-button"
        />
      </form>
    </div>
  );
}
export default CreateUser;
