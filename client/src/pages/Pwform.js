import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { ADD_PASSWORD } from "../utils/mutations";

import Auth from "../utils/auth";

const PwForm = ({profileId}) => {
    const [pw, setPw] = useState('');
    const [addPw, {error}] = useMutation(ADD_PASSWORD);
    const handleFormSubmit = async (event) => {
        event.preventDefault()

        try{
            const data = await addPw({
                variables: {_id: _id,  }
            })
            setPw('')
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div>
          <h4>Add a website, username and password below.</h4>
    
          {Auth.loggedIn() ? (
            <form
              className="flex-row justify-center justify-space-between-md align-center"
              onSubmit={handleFormSubmit}
            >
              <div className="col-12 col-lg-9">
                <input
                  placeholder="Add a website..."
                  value={website}
                  className="form-input w-100"
                  onChange={(event) => setPw(event.target.value)}
                />
                <input
                  placeholder="Add a username..."
                  value={username}
                  className="form-input w-100"
                  onChange={(event) => setPw(event.target.value)}
                />
                <input
                  placeholder="Add a password..."
                  value={password}
                  className="form-input w-100"
                  onChange={(event) => setPw(event.target.value)}
                />
              </div>
    
              <div className="col-12 col-lg-3">
                <button className="btn btn-info btn-block py-3" type="submit">
                  Add password
                </button>
              </div>
              {error && (
                <div className="col-12 my-3 bg-danger text-white p-3">
                  {error.message}
                </div>
              )}
            </form>
          ) : (
            <p>
              You need to be logged in to add a password. Please{' '}
              <Link to="/login">login</Link> or <Link to="/signup">signup.</Link>
            </p>
          )}
        </div>
      );
    };
    
    export default PwForm;
    
