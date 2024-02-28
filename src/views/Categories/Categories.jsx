import React from "react";
import { useState } from "react";
import NewDocument from "../../components/NewDocument";
import AppBar from "../../components/AppBar";
import { GlobalContext } from "../../contexts/GlobalContext";
import { useEffect } from "react";
import { useContext } from "react";
import { Link } from "react-router-dom";

export default function Categories() {
  const [categories, setCategories] = useState([]);
  const { getCategories } = useContext(GlobalContext);
  let viewType = "list";

  useEffect(() => {
    getCategories(setCategories);
  }, []);

  return (
    <div className="container-lg">
      <div className="row">
        <AppBar
          data={[]}
          appName="Categories"
          create={true}
          viewTypes={["list", "th"]}
        />

        <div className="col-12">
          <div className="p-3 bg-white rounded shadow-default">
            {viewType === "list" ? (
              <table className="table border">
                <thead>
                  <tr>
                    <th className="border-right">#</th>
                    <th>Name</th>
                    <th>Posts</th>
                    <th>Likes</th>

                    <th>Parent</th>
                    <th>Options</th>
                  </tr>
                </thead>

                <tbody className="table-body-striped">
                  {categories.map((item, id) => (
                    <>
                      <tr key={id}>
                        <td>{item.id}</td>
                        <td>{item.name}</td>
                        <td>{item.posts}</td>
                        <td>{item.likes}</td>

                        <td>{item.parent_id[1]}</td>
                        <td className="text-right">
                          <Link
                            to={`?act=view&id=${item.id}#viewCategory`}
                            data-bs-toggle="modal"
                            className="rounded-pill badge bg-danger text-white">
                            Archive
                          </Link>
                        </td>
                      </tr>
                    </>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="row">
                {categories.map((comment, id) => (
                  <div className="col-lg-4 col-md-6 col-12" key={id}>
                    {/* <Blog data={comment} /> */}
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
