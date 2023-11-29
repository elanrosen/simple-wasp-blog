import React from "react";
import { Link } from "react-router-dom";
import useAuth from "@wasp/auth/useAuth";
import logout from "@wasp/auth/logout";
import "./Main.css";

export const Layout = ({ children }) => {
  const { data: user } = useAuth();

  return (
    <div className="flex flex-col h-screen">
      <header className="header">
        <div className="container mx-auto">
          <div className="flex justify-between items-center py-4">
            <Link to="/">
              <h1 className="text-2xl font-semibold text-white">Blog</h1>
            </Link>
            {user ? (
              <div className="flex items-center">
                <div className="user-info text-xl2 mr-4">
                  <div className="username-card bg-white rounded-lg shadow-md p-2">
                    <p className="text-sm text-gray-600">{user.username}</p>
                  </div>
                  <button
                    onClick={logout}
                    className="logout-button text-link underline hover:text-red-500 ml-4"
                  >
                    (Log out)
                  </button>
                </div>
              </div>
            ) : (
              <Link to="/login">
                <h1 className="login-button text-xl2 underline">Log in</h1>
              </Link>
            )}
          </div>
        </div>
      </header>
      <main className="container mx-auto">{children}</main>
      <footer className="footer">
        <div className="container mx-auto text-center">
          <p className="text-sm">Blog ~ Powered by Wasp</p>
        </div>
      </footer>
    </div>
  );
};
