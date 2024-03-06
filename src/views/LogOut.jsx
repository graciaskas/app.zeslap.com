import React, { useContext, useEffect } from "react";

import { GlobalContext } from "../contexts/GlobalContext";
import { destUrl } from "../contexts/AuthContext";
import { getToken } from "../utilities/utilities";

export default function LogOut() {
  const token = getToken();
  if (token) {
    window.localStorage.removeItem("zeslap-user");
    return (window.location.href = destUrl);
  }
  return (window.location.href = destUrl);
}
