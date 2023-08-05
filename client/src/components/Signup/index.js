import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { CREATE_USER } from "../../utils/mutations";

import Auth from "../../utils/auth";

const SignupForm = () => {
  const [userFormData, setUserFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [createUser, { error, data }] = useMutation(CREATE_USER);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserFormData({ ...userFormData, [name]: value });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await createUser({ variables: { ...userFormData } });

      Auth.login(data.createUser.token);

      console.log(data);
    } catch (err) {
      console.log(err);
    }

    setUserFormData({
      username: "",
      email: "",
      password: "",
    });
  };

  return (
    <main className="signup-form">
      <div className="card-body">
        <h2>Please Sign Up Here</h2>
        <div>
          {data ? (
            <p>Success!</p>
          ) : (
            <form onSubmit={handleFormSubmit}>
              <input
                className="form-input"
                placeholder="Your username"
                name="username"
                type="text"
                value={userFormData.username}
                onChange={handleInputChange}
              />
              <input
                className="form-input"
                placeholder="Your email"
                name="email"
                type="email"
                value={userFormData.email}
                onChange={handleInputChange}
              />
              <input
                className="form-input"
                placeholder="******"
                name="password"
                type="password"
                value={userFormData.password}
                onChange={handleInputChange}
              />
              <button
                className="btn btn-block btn-info signup"
                style={{ cursor: "pointer" }}
                type="submit"
              >
                Sign Up!
              </button>
            </form>
          )}

          {error && <div>{error.message}</div>}
        </div>
      </div>
    </main>
  );
};

export default SignupForm;
