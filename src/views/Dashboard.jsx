import React, { useContext, useEffect, useState } from "react";
import { Link, useMatch, useParams, useSearchParams } from "react-router-dom";
import Blog from "./Blog/BlogCard";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

import { LineChart, Line } from "recharts";
import { ComposedChart, Bar, Scatter } from "recharts";
import AppBar from "../components/AppBar";
import { GlobalContext } from "../contexts/GlobalContext";
import Error from "../components/Error";
import Toast from "../components/Toast";
import { AuthContext } from "../contexts/AuthContext";

// import Blog from '../Blog';
const data = [
  {
    name: "A",
    uv: 400,
    pv: 240,
    amt: 240,
  },
  {
    name: "B",
    uv: 300,
    pv: 138,
    amt: 210,
  },
  {
    name: "C",
    uv: 200,
    pv: 980,
    amt: 220,
  },
  {
    name: "D",
    uv: 278,
    pv: 398,
    amt: 200,
  },
];

export default function Dashboard() {
  const [params, setParams] = useSearchParams();
  const [view, setView] = useState(params.get("view"));

  const [error, setError] = useState(null);
  const { getPosts, posts, user } = useContext(GlobalContext);

  useEffect(function () {
    getPosts({ limit: 2 });
  }, []);

  //Check if there is an error
  if (error) {
    return (
      <Error code={500} content="The page is not available for the moment!">
        <Toast type="danger" title="Something went wrong !" content={error} />
      </Error>
    );
  }

  return (
    <div className="container-lg">
      <div className="w-full">
        <h2>Hello {user && user.username}</h2>
        <p>We are happy to see you again...</p>
      </div>
      <div className="grid grid-col lg:grid-cols-3 gap-5">
        <div className="col-lg-4 col-md-6 col-12">
          <div className="border-bottom bg-white shadow-default rounded mb-3">
            <div className="modal-header">
              <h5>Publications</h5>
              <span role={"button"}>
                <i className="fa fa-ellipsis-h"></i>
              </span>
            </div>
            <div className="py-2">
              <AreaChart
                width={300}
                height={205}
                data={data}
                margin={{
                  top: 0,
                  right: 0,
                  left: 0,
                  bottom: 0,
                }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="uv"
                  stackId="1"
                  stroke="#8884d8"
                  fill="#8884d8"
                />
                <Area
                  type="monotone"
                  dataKey="pv"
                  stackId="1"
                  stroke="#82ca9d"
                  fill="#82ca9d"
                />
                <Area
                  type="monotone"
                  dataKey="amt"
                  stackId="1"
                  stroke="#ffc658"
                  fill="#ffc658"
                />
              </AreaChart>
            </div>
          </div>
        </div>

        <div className="col-lg-4 col-md-6 col-12">
          <div className="border-bottom bg-white shadow-default rounded mb-3">
            <div className="modal-header">
              <h5>Shares</h5>
              <span role={"button"}>
                <i className="fa fa-ellipsis-h"></i>
              </span>
            </div>
            <div className="py-2">
              <LineChart
                width={300}
                height={205}
                data={data}
                margin={{
                  top: 0,
                  right: 0,
                  left: 0,
                  bottom: 0,
                }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="pv"
                  stroke="#8884d8"
                  activeDot={{ r: 8 }}
                />
                <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
              </LineChart>
            </div>
          </div>
        </div>

        <div className="col-lg-4 col-12">
          <div className="border-bottom bg-white shadow-default rounded mb-3">
            <div className="modal-header">
              <h5>Site Visit</h5>
              <span role={"button"}>
                <i className="fa fa-ellipsis-h"></i>
              </span>
            </div>
            <div className="py-2">
              <ComposedChart
                width={300}
                height={205}
                data={data}
                margin={{
                  top: 0,
                  right: 0,
                  left: 0,
                  bottom: 0,
                }}>
                <CartesianGrid stroke="#f5f5f5" />
                <XAxis dataKey="name" scale="band" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Area
                  type="monotone"
                  dataKey="amt"
                  fill="#8884d8"
                  stroke="#8884d8"
                />
                <Bar dataKey="pv" barSize={20} fill="#413ea0" />
                <Line type="monotone" dataKey="uv" stroke="#ff7300" />
                <Scatter dataKey="cnt" fill="red" />
              </ComposedChart>
            </div>
          </div>
        </div>
      </div>

      <div>
        {user?.role !== "user" && (
          <div className="col-12 mb-3">
            <div className="p-3 bg-white rounded shadow-default">
              <h4 className="border-bottom py-2">Lastest posts</h4>
              <div className="row">
                {posts.map((post, id) => (
                  <div className="col-lg-6 col-md-6 col-12" key={id}>
                    <Blog data={post} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
        <div className="col-12">
          <div className="">
            <div className="row">
              <div className="col-md-6 ">
                <div className="p-3 bg-white rounded shadow-default">
                  <h4 className="border-bottom py-2">Lastest payments</h4>
                  <table className="table table-sm">
                    <thead>
                      <tr>
                        <th>#no</th>
                        <th>Date</th>
                        <th>Amout</th>
                        <th>State</th>
                      </tr>
                    </thead>
                    {/* <tbody>
											<tr>
												<td>#45</td>
												<td>2023-08-12</td>
												<td>$ 567.09</td>
												<td>
													<span className="badge bg-success text-white">
														Paid
													</span>
												</td>
											</tr>
											<tr>
												<td>#65</td>
												<td>2023-08-12</td>
												<td>$ 867.09</td>
												<td>
													<span className="badge bg-success text-white">
														Paid
													</span>
												</td>
											</tr>
										</tbody> */}
                  </table>
                </div>
              </div>

              <div className="col-md-6 ">
                <div className="p-3 bg-white rounded shadow-default">
                  <h4 className="border-bottom py-2">Lastest payments</h4>
                  {/* <table className="table table-sm">
										<thead>
											<tr>
												<th>#no</th>
												<th>Date</th>
												<th>Amout</th>
												<th>State</th>
											</tr>
										</thead>
										<tbody>
											<tr>
												<td>#45</td>
												<td>2023-08-12</td>
												<td>$ 567.09</td>
												<td>
													<span className="badge bg-success text-white">
														Paid
													</span>
												</td>
											</tr>
											
										</tbody>
									</table> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
