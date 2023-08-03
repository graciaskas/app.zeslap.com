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
import AppBar from "./AppBar";
import { GlobalContext } from "../contexts/GlobalContext";
import Error from "./Error";
import Toast from "./Toast";

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
	const [posts, setPosts] = useState([]);
	const [error, setError] = useState(null);
	const { BASE_URI, setLoading, headers, getPosts } = useContext(GlobalContext);

	useEffect(function () {
		getPosts(setPosts);
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
			<div className="row">
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

				<div className="col-12">
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
			</div>
		</div>
	);
}
