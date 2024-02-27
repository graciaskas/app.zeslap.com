import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useContext } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { GlobalContext } from "../../contexts/GlobalContext";
import AppBar from "../AppBar";
import Error from "../Error";
import Toast from "../Toast";
import Blog from "./BlogCard";
import BlogList from "./BlogList";
import NewDocument from "../NewDocument";

export default function Blogs() {
  const { params, getPosts, posts } = useContext(GlobalContext);

  const [error, setError] = useState(null);

  const viewType = params.get("view") || "th";

  useEffect(function () {
    getPosts({ limit: 12 });
  }, []);

  return (
    <div className="container-lg">
      <div className="row">
        <AppBar
          data={[]}
          appName="Blogs"
          create={true}
          viewTypes={["list", "th"]}
        />

        <div className="col-12">
          <div className="p-3 bg-white rounded shadow-default">
            {viewType === "list" ? (
              posts.map((post, id) => <BlogList data={post} />)
            ) : (
              <div className="row">
                {posts.map((post, id) => (
                  <div className="col-lg-4 col-md-6 col-12" key={id}>
                    <Blog data={post} />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
