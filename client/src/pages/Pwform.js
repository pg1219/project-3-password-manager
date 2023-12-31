import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { ADD_PASSWORD } from "../utils/mutations";
import { Link } from "react-router-dom";

import Auth from "../utils/auth";

const CreatePass = () => {
  const [loginTo, setLoginTo] = useState("");
  const [savedUsername, setSavedUsername] = useState("");
  const [savedPassword, setSavedPassword] = useState("");

  const [addPass, { loading, error }] = useMutation(ADD_PASSWORD);

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await addPass({
        variables: { loginTo, savedUsername, savedPassword },
      });

      setSavedPassword("");
      setSavedUsername("");
      setLoginTo("");
      window.location.assign("/")
      console.log(data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      {Auth.loggedIn() ? (
        <>
          <h4 className="text-center custom-h4">
            Add the credentials you want to lock in
          </h4>

          <form
            className="flex-column align-center"
            onSubmit={handleFormSubmit}
          >
            <div className="col-12 col-lg-10 mx-auto mt-4">
              <input
                placeholder="Add a website..."
                value={loginTo}
                className="form-input w-100 mb-3"
                onChange={(event) => setLoginTo(event.target.value)}
              />
              <input
                placeholder="Add a username..."
                value={savedUsername}
                className="form-input w-100 mb-3"
                onChange={(event) => setSavedUsername(event.target.value)}
              />
              <input
                placeholder="Add a password..."
                value={savedPassword}
                className="form-input w-100 mb-3"
                onChange={(event) => setSavedPassword(event.target.value)}
              />
            </div>

            <div className="col-12 col-lg-9">
              <button className="btn btn-info btn-block py-3" type="submit">
                Add Credentials
              </button>
            </div>

            {error && (
              <div className="col-12 my-3 bg-danger text-white p-3">
                {error.message}
              </div>
            )}
          </form>
        </>
      ) : (
        <p>
          Please login to add credentials <Link to="/login">login</Link> or{" "}
          <Link to="/signup">signup</Link>
        </p>
      )}
    </div>
  );
};

export default CreatePass;
