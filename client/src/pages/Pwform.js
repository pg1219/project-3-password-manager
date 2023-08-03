import React, { useState } from 'react';
import { useMutation } from "@apollo/client";
import { ADD_PASSWORD } from "../utils/mutations";
import { Link } from 'react-router-dom';

import Auth from "../utils/auth";

const CreatePass = () => {
    const [loginTo, setLoginTo] = useState("");
    const [savedUsername, setSavedUsername] = useState("");
    const [savedPassword, setSavedPassword] = useState("");
    
    const [addPass, { loading, error }] = useMutation(ADD_PASSWORD);

    const handleFormSubmit = async (event) => {
        event.preventDefault()
        // const token = Auth.loggedIn() ? Auth.getToken() : null;

        // if (!token) {
        //   return false;
        // }

        try{
            const { data } = await addPass({
              variables:  { loginTo, savedUsername, savedPassword }
            })
            setSavedPassword("")
            setSavedUsername("")
            setLoginTo("")
            console.log(data)
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div>
          
          {Auth.loggedIn() ? (
            <>
            <h4>Add a website, username and password below.</h4>
            <form
              className="flex-row justify-center justify-space-between-md align-center"
              onSubmit={handleFormSubmit}
            >
              <div className="col-12 col-lg-9">
                <input
                  placeholder="Add a website..."
                  value={loginTo}
                  className="form-input w-100"
                  onChange={(event) => setLoginTo(event.target.value)}
                />
                <input
                  placeholder="Add a username..."
                  value={savedUsername}
                  className="form-input w-100"
                  onChange={(event) => setSavedUsername(event.target.value)}
                />
                <input
                  placeholder="Add a password..."
                  value={savedPassword}
                  className="form-input w-100"
                  onChange={(event) => setSavedPassword(event.target.value)}
                />
              </div>
    
              <div className="col-12 col-lg-3">
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
              Please login to add a password{' '}
              <Link to="/login">login</Link> or <Link to="/signup">signup</Link>
            </p>
          )} 
        </div>
      );
    };
    
    export default CreatePass;
    
