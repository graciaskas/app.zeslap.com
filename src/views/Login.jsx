import React, { useEffect } from "react";
import axios from "axios";

export default function Login() {
  useEffect(() => {
    console.log("App started");
  }, []);
  return (
    <div className="App flex justify-center items-center min-h-screen">
      <div class="form__login flex rounded-lg shadow-default bg-white">
        <div class="block__image bg-primary d-lg-flex flex-column items-center  justify-center">
          <img src="/src/register_.png" alt="infographic" srcset="" />
        </div>

        <div class="block__form">
          <div class="form__header">
            <h3 class="text-primary">Sign In.</h3>
          </div>

          <form class="p-4" id="userLogin">
            <div class="input__group border  w-100 mt-2">
              <span class="input__icon" id="basic-addon1">
                <i class="ri-user-6-line"></i>
              </span>
              <input type="email" placeholder="Email" required />
            </div>

            <div class="input__group border  w-100 mt-2 bg-white">
              <span class="input__icon">
                <i class="ri-lock-password-line"></i>
              </span>
              <input
                type="password"
                placeholder="Password"
                class="w-75"
                required
              />
            </div>

            <a href="/reset" class="py-2 mt-2 block">
              <small class="text-primary  fst-normal fs-6 text-decoration-underline">
                I forget my account password.
              </small>
            </a>
            <button
              type="submit"
              class="btn bg-primary text-white  w-100  mt-2 w-full">
              Sign in
            </button>
            <a
              href="/register"
              class="btn w-100  bg-secondary text-white block mt-2">
              Create an account
            </a>
          </form>
        </div>
      </div>
    </div>
  );
}
