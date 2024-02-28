import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import { getToken, parseJwt } from "../utilities/utilities";

export const destUrl =
  process.env.REACT_APP_MODE === "production"
    ? "https://zeslap.com/login"
    : "http://localhost:8082/login";

export const AuthContext = React.createContext();

/**
 * Authentication provider for the app
 * @param {*} param0
 * @returns
 */
export default function AuthProvider({ children }) {
  const currentLocation = useLocation();
  const [state, setState] = useState({
    user: null,
    authenticated: false,
  });

  let params = new URLSearchParams(window.location.search);
  let auth = params.has("auth") && params.get("auth");

  useEffect(() => {
    //Store token on first user access app with the "auth" parameter
    if (auth) {
      window.localStorage.setItem(
        "zeslap-user",
        JSON.stringify({
          zeslap_key: auth,
        })
      );
    }

    //Check if token is stored
    if (!getToken()) {
      return (window.location.href = destUrl);
    }

    //Parse the token as user
    const user = parseJwt(getToken());

    //Check user and token not expired
    if (!user || user.exp * 1000 < Date.now()) {
      // return (window.location.href = destUrl);
    }

    setState({ authenticated: true, user });
  }, [currentLocation]);

  const values = {
    token: getToken(),
    user: state.user,
  };
  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
}
