import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useContext } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { GlobalContext } from "../../contexts/GlobalContext";
import AppBar from "../../components/AppBar";
import Error from "../../components/Error";
import Toast from "../../components/Toast";
import Blog from "./BlogCard";
import BlogList from "./BlogList";
import NewDocument from "../../components/NewDocument";

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
              <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1  ">
                {posts.map((post, id) => (
                  <Blog data={post} key={id} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
