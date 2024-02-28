import React from "react";
export default function Login() {
  return (
    <div className="App flex justify-center items-center min-h-screen">
      <div class="register__content d-flex rounded shadow-default bg-white">
        <div class="block__image bg-primary d-lg-flex flex-column align-items-center  justify-content-center">
          <img src="/src/register_.png" alt="infographic" srcset="" />
        </div>

        <div class="block__form">
          <div class="form-description">
            <h3 class="t-blue">Sign In.</h3>
          </div>

          <form class="p-4" id="userLogin">
            <div class="input-group border  w-100 mt-2">
              <span class="input-group-text" id="basic-addon1">
                <i class="ri-user-6-line"></i>
              </span>
              <input type="text" placeholder="Email" required />
            </div>

            <div class="input-group border  w-100 mt-2 bg-white">
              <span class="input-group-text">
                <i class="ri-lock-password-line"></i>
              </span>
              <input
                type="password"
                placeholder="Password"
                class="w-75"
                required
              />
            </div>

            <a href="/reset" class="py-2 mt-2 d-block">
              <small class="text-primary  fst-normal fs-6 text-decoration-underline">
                I forget my account password.
              </small>
            </a>
            <button
              type="submit"
              class="btn bg-primary text-white  w-100  mt-2 ">
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
