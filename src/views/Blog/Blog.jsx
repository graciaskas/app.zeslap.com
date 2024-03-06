import React, { useEffect, useState, useContext } from "react";

import { GlobalContext } from "../../contexts/GlobalContext";
import AppBar from "../../components/AppBar";
import Error from "../../components/Error";
import Toast from "../../components/Toast";
import Keyboard from "../../components/Keyboard";
import { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";

import "../../css/ckeditor.css";
import { AuthContext } from "../../contexts/AuthContext";
import axiosClient from "../../axios/axiosClient";

function Blog(props) {
  const [post, setPost] = useState(null);
  const [postComments, setPostComments] = useState([]);
  const {
    SITE_URL,
    BASE_URI,
    getPost,
    getPostComments,
    params,
    setLog,
    setToast,
  } = useContext(GlobalContext);

  const postContentRef = useRef(null);
  const navigate = useNavigate();

  /**
   * Archive post
   * @param {*} post post identifier
   * @returns :void
   */
  const actionArchivePost = async (post) => {
    if (!post) {
      return;
    }
    try {
      const { data } = await axiosClient.delete("/posts/" + post);
      return navigate("/blog/blogs");
    } catch (error) {
      console.error(error.response.data);
    }
  };

  //Get requested blog by ?blog={id} on initialise component
  useEffect(() => {
    if (!params.has("blog")) {
      setLog(true);
      setToast({
        content: "Request or query parameter value ! " + params.get("blog"),
        title: "Parameter error",
        type: "warning",
      });
      return;
    }

    //Get post
    getPost(setPost, params.get("blog"));
  }, []);

  //Get all related comments on change Blog ID
  useEffect(() => {
    if (post) getPostComments(setPostComments, post._id);
    console.log(post);
  }, [post]);

  return (
    post && (
      <div className="container-lg">
        <AppBar
          appName="Blogs"
          title={post.id}
          create={false}
          showPagination={false}
          data={[]}
        />

        <form className="mt-3 p-3 bg-white rounded shadow-default contact-form">
          <div className="border rounded p-4">
            <div className="flex border-bottom relative pb-2">
              <div className="icon_round bg-secondary text-white">
                <i className="fa fa-user" />
              </div>
              <div style={{ marginLeft: "5px", marginTop: "-5px" }}>
                <h4>
                  <strong>{post.author_id[1]}</strong>
                </h4>
                {/* <small className="block" style={{ fontSize: ".75rem" }}>
                  Software developer.
                </small> */}
              </div>
              {post.read ? (
                <small className="absolute top-0 end-0 bg-secondary-light-7 rounded-pill px-3 p-1">
                  Read
                </small>
              ) : (
                <small className="absolute top-0 end-0 bg-primary-light-7 rounded-pill px-3 p-1">
                  Not read
                </small>
              )}
            </div>

            <div className="py-3">
              <h4 className="mb-2 block h4"> {post.title} </h4>
              {/* Blog header */}
              <div>
                <span>
                  <i className="fa fa-calendar"></i>{" "}
                  {new Date(post.createdAt).toLocaleString()}
                </span>
                <span style={{ marginLeft: "15px" }}>
                  <i className="fa fa-clipboard-list"></i>
                  {post.category_id[1]}
                </span>
              </div>
              {/* Blog image cover */}
              <div
                style={{ height: "200px", overflow: "hidden" }}
                className="mt-2">
                <img
                  src={`${SITE_URL}/uploads/${post.cover}`}
                  alt="dds"
                  style={{
                    objectFit: "fill",
                    maxWidth: "100%",
                    height: "auto",
                  }}
                />
              </div>
              {/* Blog content */}

              <div
                className="mt-4 overflow-auto ck-content"
                ref={postContentRef}
                dangerouslySetInnerHTML={{ __html: post.content }}
              />
            </div>

            <div className="flex items-center pt-2 pb-3">
              <div className="flex items-center">
                <span className="fa fa-heart"></span>
                <small
                  className="text-montserrat"
                  style={{ marginLeft: "5px" }}>
                  {post.likes} Like(s)
                </small>
              </div>
              <div style={{ marginLeft: "15px" }}>
                <i className="fa fa-comments" />
                <small
                  className="text-montserrat"
                  style={{ marginLeft: "5px" }}>
                  {post.comments} Comment(s)
                </small>
              </div>
            </div>

            <div className="flex items-center justify-between border-top pt-3">
              <Link
                to={`/blog/edit?blog=${post._id}`}
                role={"button"}
                className=" btn-sm bg-primary text-white rounded-pill">
                <i className="fa fa-edit" /> Update content
              </Link>
              <div
                className="btn-sm bg-danger text-white rounded-pill"
                onClick={() => actionArchivePost(post._id)}>
                <i className="fa fa-trash" /> Archive
              </div>
            </div>
          </div>
        </form>

        {/* Blog comments */}
        <div className="col-12 bg-white mt-3 rounded shadow-default p-3">
          <div className="border-bottom pb-3">
            <h4>{postComments.length} Comment(s)</h4>
          </div>
          <div className="comments">
            {postComments.map((postComment) => (
              <div
                className="comment flex align-items-start mt-3"
                id={`${postComment._id}`}>
                <div className="commenter bg-secondary icon_round">
                  <span className="text-white">GK</span>
                </div>
                <div className="w-100 " style={{ marginLeft: "7px" }}>
                  <h5>{postComment.commentor}</h5>
                  <div
                    className="bg-primary-light-9 p-3"
                    style={{ borderRadius: "1rem" }}
                    dangerouslySetInnerHTML={{
                      __html: postComment.comment,
                    }}></div>
                  <div className="flex justify-content-end">
                    <small className="mt-2">
                      Commented on:
                      {new Date(postComment.createdAt).toLocaleString()}
                    </small>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  );
}

Blog.propTypes = {};

export default Blog;