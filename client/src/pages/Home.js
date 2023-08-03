import React, { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { REMOVE_PASSWORD } from "../utils/mutations";
import { QUERY_ME } from "../utils/queries";

import Auth from "../utils/auth";


const SavedPasswords = ({ passwords, isLoggedInUser = false }) => {
  const { loading, data } = useQuery(QUERY_ME);
  const userData = data?.me || {};

  const [removePassword, { error }] = useMutation(REMOVE_PASSWORD, {
    update(cache, { data: { removePassword } }) {
      try {
        cache.writeQuery({ query: QUERY_ME, data: { me: removePassword } });
      } catch (err) {
        console.log(err);
      }
    },
  });

  const handleDeletePassword = async (_id) => {
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    try {
      const { data } = await removePassword({
        variables: { _id: _id },
      });
      console.log("data ", data);
    } catch (err) {
      console.log(err);
    }
  };

  if (loading) {
    return <h1> One Moment Please...</h1>;
  }
  return (
    <div>
      <div>
        <h1> Your Saved Passwords!</h1>
      </div>
      <div>
        <h2 className="pt-5">
          {userData.savedPassword?.length
            ? `Viewing ${userData.savedPassword.length} saved ${
                userData.savedPassword.length === 1 ? "password" : "passwords"
              }:`
            : "You have no saved passwords yet!"}
        </h2>

        <div>
          {userData.savedPasswords?.map((password) => {
            return (
              <div>
                <main>
                  <h3>This is your login information for {password.loginTo}</h3>
                  <h4>Your Username: {password.savedUsername}</h4>
                  <h4>Your Password: {password.savedPassword}</h4>
                  <button
                    className="btn-block btn-danger"
                    onClick={() => handleDeletePassword(password._id)}
                  >
                    Delete Credentials for {password.loginTo} !
                  </button>
                </main>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default SavedPasswords;
