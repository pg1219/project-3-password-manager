import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { UPDATE_PASSWORD } from "../utils/mutations";
import { QUERY_ME } from "../utils/queries"
import { Link, useParams } from "react-router-dom";

import Auth from "../utils/auth";

const UpdatePass = () => {

    const { loginTo } = useParams();
    const [savedUsername, setSavedUsername] = useState("");
    const [savedPassword, setSavedPassword] = useState("");

    const [updatePass, { data, error }] = useMutation(UPDATE_PASSWORD, { 
        update(cache, { data: { updatePass } }) {
            try {
                cache.writeQuery({
                    query: QUERY_ME,
                    data: { me: [updatePass, loginTo,savedUsername, savedPassword] }, 
                });
            }
            catch (err) {
                console.log(err)
            }
        }
    });

    const handleFormSubmit = async (event) => {
        event.preventDefault();
    
            console.log(loginTo + savedUsername + savedPassword);


            try {
                const { data } = await updatePass({
                    variables: { loginTo, savedUsername, savedPassword }, 
                });
                setSavedPassword("");
                setSavedUsername("");
                window.location.assign("/")
                console.log(data);
            } catch (err) {
              console.error(err);
            }
    };
    return (
      <div className="center-content">
        {Auth.loggedIn() ? (
          <div className="form-container">
            <h4 className="text-center custom-h4">
              Update your credentials for {loginTo}
            </h4>
  
            <form className="form" onSubmit={handleFormSubmit}>
              <div className="form-group">
                <input
                  placeholder="Add a username..."
                  value={savedUsername}
                  className="form-input"
                  onChange={(event) => setSavedUsername(event.target.value)}
                />
              </div>
              <div className="form-group">
                <input
                  placeholder="Add a password..."
                  value={savedPassword}
                  className="form-input"
                  onChange={(event) => setSavedPassword(event.target.value)}
                />
              </div>
  
              <div className="text-center">
                <button className="btn btn-info btn-block" type="submit">
                  Update Credentials
                </button>
              </div>
  
              {error && (
                <div className="error-message">
                  {error.message}
                </div>
              )}
            </form>
          </div>
        ) : (
          <p>
            Please login to add a password <Link to="/login">login</Link> or{" "}
            <Link to="/signup">signup</Link>
          </p>
        )}
      </div>
    );
  };
  
  export default UpdatePass;