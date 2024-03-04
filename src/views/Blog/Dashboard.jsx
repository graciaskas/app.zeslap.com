import React, { useContext, useEffect, useState } from "react";
import { Link, useMatch, useParams, useSearchParams } from "react-router-dom";
import Blog from "./BlogCard";

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
import AppBar from "../../components/AppBar";
import { GlobalContext } from "../../contexts/GlobalContext";
import Error from "../../components/Error";
import Toast from "../../components/Toast";
import axiosClient from "../../axios/axiosClient";

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
  const { posts, getPosts } = useContext(GlobalContext);

  useEffect(function () {
    getPosts({ limit: 12 });
  }, []);

  return (
    <div className="container-lg">
      <AppBar data={[]} appName="Blogs" showPagination={false} create={true} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <div className="border-bottom bg-white shadow-default rounded mb-3 overflow-auto">
          <div className="modal-header">
            <h4 className="h4">Publications</h4>
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

        <div className="border-bottom bg-white shadow-default rounded mb-3 overflow-auto">
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

        <div className="border-bottom bg-white shadow-default rounded mb-3 overflow-auto">
          <div className="modal-header">
            <h5>Category Views</h5>
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

      <div className="p-3 bg-white rounded-md shadow-default">
        <h4 className="border-b h4 py-2">Lastest posts</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {posts.map((post, id) => (
            <Blog data={post} key={id} />
          ))}
        </div>
      </div>
    </div>
  );
}
