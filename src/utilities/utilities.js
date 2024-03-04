export const parseJwt = (token) => {
  try {
    return JSON.parse(atob(token.split(".")[1]));
  } catch (e) {
    return null;
  }
};

export const setToken = (token) => {
  if (!typeof token || token === null || !token) {
    throw Error("Missing arguments token !!");
  }

  window.localStorage.setItem(
    "zeslap-user",
    JSON.stringify({
      zeslap_key: token,
    })
  );
};

export const getToken = () => {
  try {
    let client = window.localStorage.getItem("zeslap-user");
    if (!client) return null;
    client = JSON.parse(client);
    return client["zeslap_key"];
  } catch (error) {
    throw Error(error);
  }
};

export function closeModal(modalId) {
  if (!typeof modalId || !modalId) {
    throw Error("Argument modalId missing on close modal !");
  }
  let modal = document.querySelector(`#${modalId}`);
  return modal.classList.replace("flex", "hidden");
}

export function showModal(modalId) {
  if (!typeof modalId || !modalId) {
    throw Error("Argument modalId missing on close modal !");
  }
  let modal = document.querySelector(`#${modalId}`);
  return modal.classList.replace("hidden", "flex");
}
