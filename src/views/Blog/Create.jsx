import React, { useState, useEffect, useRef } from "react";
import { useContext } from "react";
import { Link, useNavigate, useNavigation } from "react-router-dom";

import AppBarCreate from "../../components/AppBarCreate";
import Keyboard from "../../components/Keyboard";
import { GlobalContext } from "../../contexts/GlobalContext";
import Toast from "../../components/Toast";
import Editor from "../../components/Editor";
import { AuthContext } from "../../contexts/AuthContext";

const imgDefault = "/img/user_icon.png";

export default function Create() {
  const {
    getPost,
    BASE_URI,
    headers,
    toast,
    setToast,
    setLoading,
    params,
    setLog,
  } = useContext(GlobalContext);
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();
  const [action, setAction] = useState("create");
  const [post, setPost] = useState(null);
  const [image, setImage] = useState(imgDefault);
  const [selecting, setSelecting] = useState(false);
  const [categories, setCategories] = useState([]);

  const fileCoverRef = useRef(null);
  const imgRef = useRef(null);

  const categoryRef = useRef(null);

  //Blog state object
  const [state, setState] = useState({
    title: null,
    category_id: null,
    content: null,
    cover: null,
    description: "",
    tags: [],
  });

  useEffect(() => {
    if (params.has("blog") || Number(params.get("blog"))) {
      setAction("edit");
      //Fetch post and bind result to state
      getPost(setPost, params.get("blog"));
    }
  }, []);

  useEffect(() => {
    if (post) {
      setState({ ...state, ...post });
      //Set post cover image display
      setImage(`http://localhost:8082/src/${post.cover}`);
    }
  }, [post]);

  async function submitBlog(event) {
    event.preventDefault();
    const { title, category_id, content } = state;

    if (title === null || category_id === null || content === null) {
      setLog(true);
      setToast({
        title: "Form validation toast",
        content: "Please some required field are empty",
        type: "danger",
      });

      return;
    }

    try {
      setLoading(true);
      const uri =
        action === "create"
          ? `${BASE_URI}/posts`
          : `${BASE_URI}/posts/${post?.id}`;

      const formData = new FormData();
      for (let key in state) {
        formData.append(key, state[key]);
      }

      const response = await fetch(uri, {
        method: action === "create" ? "POST" : "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });
      setLoading(false);
      const { error, message } = await response.json();

      if (!error) {
        //Handle user UI Error view
        setLog(true);
        setToast({
          ...toast,
          content: "Post creation completed with success !",
          type: "success",
          title: "Post action done",
        });
        return navigate("/blog/blogs");
      } else {
        setLog(true);
        setToast({
          ...toast,
          content: message,
          type: "danger",
          title: "Action fail",
        });
      }
    } catch (e) {
      setLoading(false);
      setToast({ ...toast, content: e.message });
      throw Error(e);
    }
  }

  async function selectCategory(e) {
    e.preventDefault();
    try {
      setSelecting(true);
      let string = e.target.value;
      let request = await fetch(`${BASE_URI}/categories/?q=${string}`, {
        headers,
      });
      let json = await request.json();

      //console.log(json);
      if (string === "" || string == null) setSelecting(false);

      if (request.status > 399) return;

      setCategories(json.data);
    } catch (toast) {
      setToast(toast.message);
    }
  }

  function bindCategory(category, element) {
    categoryRef.current.value = category.name;
    setState({ ...state, category_id: [category.id, category.name] });
    setSelecting(false);
  }

  function removeCover() {
    setImage(imgDefault);
    setState({
      ...state,
      cover: null,
    });
  }

  function clickFileCover() {
    fileCoverRef.current.focus();
    fileCoverRef.current.click();
    return;
  }

  async function updateBlogCover(e) {
    e.preventDefault();
    const file = e.target.files[0];
    const base64 = await getBase64(file);
    setState({ ...state, cover: file });
    //Display image
    setImage(base64);
  }

  function getBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.ontoast = (toast) => reject(toast);
    });
  }

  function onChangeEditor(editorContent) {
    return setState({ ...state, content: editorContent });
  }

  return (
    <div className="container-lg">
      <div className="row">
        <div className="col-12">
          <form className="text__form" onSubmit={submitBlog}>
            <div className="row">
              <AppBarCreate appName="Blogs" />

              <div className="col-12">
                <div className="p-3 bg-white mt-3 shadow-default rounded">
                  <div className="row">
                    <div className="col-md-2">
                      <div className="border mt-2 rounded input-image">
                        <div className="input-image-actions d-flex justify-content-between bg-primary text-white p-1 px-2">
                          <span
                            className="fa fa-edit"
                            style={{ cursor: "pointer" }}></span>
                          <span
                            style={{ cursor: "pointer" }}
                            className="fa fa-trash"
                            onClick={removeCover}></span>
                        </div>
                        <div
                          onClick={clickFileCover}
                          style={{ cursor: "pointer" }}>
                          <img src={image} alt="" ref={imgRef} />
                        </div>
                        <input
                          type="file"
                          hidden
                          ref={fileCoverRef}
                          onChange={updateBlogCover}
                          name="cover"
                          accept="image/*"
                        />
                      </div>
                    </div>

                    <div className="col-md-10">
                      <div className="row">
                        <div className="col-md-6 col-12">
                          <div className="input-group border  w-100 mt-2 ">
                            <span
                              className="input-group-text"
                              id="basic-addon1">
                              <i className="fa fa-book" />
                            </span>
                            <input
                              type="text"
                              placeholder="Post title"
                              required
                              name="title"
                              defaultValue={post?.title}
                              onChange={(e) =>
                                setState({ ...state, title: e.target.value })
                              }
                            />
                          </div>
                        </div>

                        <div className="col-md-6 col-12 position-relative">
                          <div className="input-group border  w-100 mt-2">
                            <span
                              className="input-group-text"
                              id="basic-addon1">
                              <i className="fa fa-th" />
                            </span>
                            <input
                              type="text"
                              placeholder="Post category"
                              onChange={(e) => selectCategory(e)}
                              required
                              defaultValue={post?.category_id[1]}
                              name="category"
                              ref={categoryRef}
                            />
                          </div>
                          {selecting && (
                            <div
                              className="input-select position-absolute bg-white shadow-default p-3 rounded"
                              style={{
                                zIndex: 10,
                                overflow: "hidden",
                                width: "100%",
                              }}>
                              {categories.map((category, id) => (
                                <li
                                  key={id}
                                  id={category.id}
                                  onClick={(e) => bindCategory(category, e)}>
                                  {category.name}
                                </li>
                              ))}
                            </div>
                          )}
                        </div>

                        {/* Post description field */}
                        <div className="col-md-12">
                          <div className="input-group border  w-100 mt-2">
                            <span
                              className="input-group-text"
                              id="basic-addon1">
                              <i className="fa fa-list" />
                            </span>
                            <input
                              type="text"
                              placeholder="Post tags (separte with a coma)"
                              onChange={(e) => {
                                let tags = e.target.value;
                                tags.split(",");
                                setState({ ...state, tags });
                              }}
                              name="tags"
                            />
                          </div>
                        </div>

                        {/* Post description field */}
                        <div className="col-md-12">
                          <div className="input-group border  w-100 mt-2">
                            <span
                              className="input-group-text"
                              id="basic-addon1">
                              <i className="fa fa-book" />
                            </span>
                            <textarea
                              type="text"
                              placeholder="Post description"
                              onChange={(e) =>
                                setState({
                                  ...state,
                                  description: e.target.value,
                                })
                              }
                              name="description"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* <Keyboard refElement={writingAreaRef} /> */}
              <Editor onChange={onChangeEditor} initialData={post?.content} />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
