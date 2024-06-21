"use client";

import React from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

const UserForm = () => {
  const router = useRouter();
  const [login, setLogin] = React.useState(true);
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();

      const login = await signIn("credentials", {
        username,
        password,
        redirect: false,
      });
      if (login?.error) {
        window.alert("Incorrect credentials");
      } else {
        router.push('/')
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="text-black py-10 bg-white min-h-[80vh] flex items-center">
      <div className="bg-white p-8 rounded-lg shadow-md md:w-96 w-80 mx-auto">
        <div className="flex justify-between items-center mb-8">
          <button
            id="toggleButton"
            className="px-4 py-2 rounded-lg bg-gray-900 text-white focus:outline-none"
            onClick={() => setLogin(!login)}
          >
            {login ? "New User? Click here" : "Already Registered?"}
          </button>
          <h2 className="text-2xl font-bold">Welcome!</h2>
        </div>

        {login ? (
          <form id="loginForm" className="block" method="post">
            <div className="mb-4">
              <label htmlFor="username" className="block mb-2">
                Username
              </label>
              <input
                type="text"
                id="username"
                name="username"
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-gray-500"
                required
                onChange={(event) => {
                  setUsername(event.target.value);
                }}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="block mb-2">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-gray-500"
                required
                onChange={(event) => {
                  setPassword(event.target.value);
                }}
              />
            </div>
            <button
              type="submit"
              className="w-full py-2 px-4 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition duration-300"
              onClick={handleSubmit}
            >
              Login
            </button>
          </form>
        ) : (
          <form id="signupForm" className="block">
            <div className="mb-4">
              <label htmlFor="username" className="block mb-2">
                Username
              </label>
              <input
                type="text"
                id="username"
                name="username"
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-gray-500"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-gray-500"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="block mb-2">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-gray-500"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full py-2 px-4 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition duration-300"
            >
              Sign Up
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default UserForm;
