import React, { useEffect, useState, useContext } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { AuthContext } from "./AuthContext";

const SITE_URL =
  process.env.REACT_APP_MODE === "production"
    ? "https://zeslap.com/"
    : "http://localhost:8082/";

export const BASE_URI =
  process.env.REACT_APP_MODE === "production"
    ? "https://api.zeslap.com/v1"
    : "http://localhost:8081/v1";

export const GlobalContext = React.createContext();

export default function GlobalProvider({ children }) {
  const { token } = useContext(AuthContext);

  //*** App data
  const [posts, setPosts] = useState([]);

  const [loading, setIsLoading] = useState(false);
  const [log, setLog] = useState(false);

  const [toast, setToast] = useState({
    title: "Something went wrong",
    content: "The server is not respoding or something went wrong !",
    type: "danger",
  });

  const params = useSearchParams()[0];

  //Custom setState function to manage loading state variable
  const setLoading = (value) => setTimeout(setIsLoading(value), 500);

  function getNextItems() {}

  function getPreviousItems() {}

  /**
   * Get posts and bind to posts state varibale
   * @param {*} limit data limit
   * @returns :void
   */
  async function getPosts({ limit = 10 }) {
    setLoading(true);
    try {
      const res = await fetch(`${BASE_URI}/posts?limit=${limit}`, {
        method: "GET",
        headers: {
          authorization: "Bearer " + token,
        },
      });
      const json = await res.json();
      setLoading(false);
      if (!json.error) {
        return setPosts(json.data);
      }
      setToast({
        ...toast,
        content: json.message,
      });
    } catch (error) {
      setLog(true);
      setLoading(false);
      throw Error(error);
    }
  }
  /**
   * Get single post and bind to post state varibale
   * @param {*} setPost data limit
   * @param {*} id pos id
   * @returns :void
   */
  async function getPost(setPost, id) {
    setLoading(true);
    try {
      const response = await fetch(BASE_URI + "/posts/" + id, {
        headers: {
          authorization: "Bearer " + token,
        },
      });
      const { data } = await response.json();
      setLoading(false);

      if (!response.error) return setPost(data);
      setLog(true);
      setToast({
        ...toast,
        content:
          data.message ||
          "The Post you tried to view is not found on this server !",
      });
    } catch (e) {
      setLoading(false);
      setToast({ ...toast, content: e.message });
      throw Error(e);
    }
  }

  /**
   * Get Blog comments
   * @param {*} setPostComments function to update state
   * @param {*} postId post id
   * @returns :void
   */
  async function getPostComments(setPostComments, postId = null) {
    setLoading(true);
    try {
      const response = await fetch(BASE_URI + "/comments/?blog=" + postId, {
        headers: {
          authorization: "Bearer " + token,
        },
      });
      setLoading(false);

      if (response.status < 399) {
        const { data } = await response.json();
        setPostComments(data);
        return;
      }
    } catch (toast) {}
  }

  async function getComments(setComments) {
    setLoading(true);
    try {
      const res = await fetch(BASE_URI + "/comments", {
        method: "GET",
        headers: {
          authorization: "Bearer " + token,
        },
      });
      const json = await res.json();
      setLoading(false);

      res.status === 200
        ? setComments(json.data)
        : setToast({
            ...toast,
            content: json.message,
          });
    } catch (error) {
      setLog(true);
      setLoading(false);
      throw Error(error);
    }
  }

  async function getCategories(setCategories) {
    setLoading(true);
    try {
      const res = await fetch(BASE_URI + "/categories", {
        method: "GET",
        headers: {
          authorization: "Bearer " + token,
        },
      });
      const json = await res.json();
      setLoading(false);

      res.status === 200
        ? setCategories(json.data)
        : setToast({
            ...toast,
            content: json.message,
          });
    } catch (error) {
      console.log(error);
      setLog(true);
      setLoading(false);
    }
  }

  const getBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.ontoast = (e) => reject(e);
    });
  };

  useEffect(() => {
    console.log(document.querySelectorAll('button[name="modifyBtn"]'));
  }, []);

  //Context shared values
  const values = {
    BASE_URI,
    loading,
    getBase64,
    setLoading,
    getPosts,
    posts,
    getPost,
    getPostComments,
    getComments,
    getCategories,
    toast,
    setToast,
    SITE_URL,
    setLog,
    log,
    params,
    headers: {
      authorization: "Bearer " + token,
      "Content-Type": "application/json",
    },
  };

  return (
    <GlobalContext.Provider value={values}>{children}</GlobalContext.Provider>
  );
}
