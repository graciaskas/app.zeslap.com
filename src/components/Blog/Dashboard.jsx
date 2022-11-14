import React from 'react';
import { Link } from 'react-router-dom';
import Blog from './Blog';

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
    Tooltip,
    Legend,
  ResponsiveContainer
} from "recharts";

import { LineChart, Line,   } from 'recharts';
import { ComposedChart, Bar, Scatter } from 'recharts';
import AppBar from '../AppBar';





// import Blog from '../Blog';
const data = [
  {
    name: 'A',
    uv: 400,
    pv: 240,
    amt: 240,
  },
  {
    name: 'B',
    uv: 300,
    pv: 138,
    amt: 210,
  },
  {
    name: 'C',
    uv: 200,
    pv: 980,
    amt: 220,
  },
  {
    name: 'D',
    uv: 278,
    pv: 398,
    amt: 200,
  }
];

export default function Dashboard() {
  return (
    <div className="container">
        <div className="row">
            
            <AppBar data={[]} appName='Blogs'/>
              
            <div className="col-lg-4 col-md-6 col-12">
                <div className="border-bottom bg-white shadow-default rounded mb-3">
                    <div className="modal-header">
                        <h5>Publications</h5>
                        <span role={'button'}>
                            <i className="fa fa-ellipsis-h"></i>
                        </span>
                    </div>
                    <div className="py-2">
                        <AreaChart
                            width={300} height={205}
                            data={data}
                            margin={{
                                top: 0,
                                right: 0,
                                left: 0,
                                bottom: 0
                            }}
                            >
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
                        <span role={'button'}>
                            <i className="fa fa-ellipsis-h"></i>
                        </span>
                      </div>
                      <div className="py-2">
                          
                        <LineChart
                            width={300} height={205}
                            data={data}
                            margin={{
                                top: 0,
                                right: 0,
                                left: 0,
                                bottom: 0
                            }}>
                            
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Line type="monotone" dataKey="pv" stroke="#8884d8" activeDot={{ r: 8 }} />
                            <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
                        </LineChart>
                      
                      </div>
                </div>
            </div>

            <div className="col-lg-4 col-12">
                <div className="border-bottom bg-white shadow-default rounded mb-3">
                    <div className="modal-header">
                        <h5>Category Views</h5>
                        <span role={'button'}>
                            <i className="fa fa-ellipsis-h"></i>
                        </span>
                      </div>
                      <div className='py-2'>
                          <ComposedChart
                            width={300} height={205}
                            data={data}
                            margin={{
                                top: 0,
                                right: 0,
                                left: 0,
                                bottom: 0
                            }}
                            >
                            <CartesianGrid stroke="#f5f5f5" />
                            <XAxis dataKey="name" scale="band" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Area type="monotone" dataKey="amt" fill="#8884d8" stroke="#8884d8" />
                            <Bar dataKey="pv" barSize={20} fill="#413ea0" />
                            <Line type="monotone" dataKey="uv" stroke="#ff7300" />
                            <Scatter dataKey="cnt" fill="red" />
                        </ComposedChart>
                      </div>
                </div>
            </div>


            <div className="col-12">
                <div className="p-3 bg-white rounded shadow-default mb-3">
                    <table className="table border">
                        <thead>
                            <tr>
                                <th><input type="checkbox" name="" id="" /></th> 
                                <th className="border-right">#</th>
                                <th>Author's name</th>
                                <th>Likes</th>
                                <th>Comments</th>
                                <th>Category</th>
                                <th>Post date</th>
                                <th className="text-right">State</th>
                            </tr>
                        </thead>
    
                        <tbody className='table-body-striped'>
                            <tr>
                                <td><input type="checkbox" name="" id="" /></td>
                                <td>5</td>
                                <td>Gracias Kasongo</td>
                                <td> <i className="fa fa-heart"/> 3k</td>
                                <td> <i className="fa fa-comments"/> 1k</td>
                                <td>Tech support</td>
                                <td>30/10/2022</td>
                                <td className="text-right">
                                    <span className="badge bg-success rounded-pill px-3">Completed</span>
                                </td>
                            </tr>

                            <tr className='row-danger'>
                                <td><input type="checkbox" name="" id="" /></td>
                                <td>4</td>
                                <td>Ngudia Kazadi</td>
                                <td> <i className="fa fa-heart"/> 1k</td>
                                <td> <i className="fa fa-comments"/> 1.5k</td>
                                <td>Programming and science</td>
                                <td>23/10/2022</td>
                                <td className="text-right">
                                    <small className="badge bg-danger rounded-pill px-3">Closed</small>
                                </td>
                            </tr>

                            <tr className='row-primary'>
                                <td><input type="checkbox" name="" id="" /></td>
                                <td>3</td>
                                <td>Thina Kasongo</td>
                                <td> <i className="fa fa-heart"/> 500</td>
                                <td> <i className="fa fa-comments"/> 3k</td>
                                <td>Visa</td>
                                <td>30/10/2022</td>
                                <td className="text-right">
                                    <span className="badge bg-primary-light-7 text-secondary rounded-pill px-3">Draft</span>
                                </td>
                            </tr>

                            <tr>
                                <td><input type="checkbox" name="" id="" /></td>
                                <td>2</td>
                                <td>Gracias Kasongo</td>
                                <td>Email</td>
                                <td>$50.00</td>
                                <td>Visa</td>
                                <td>30/10/2022</td>
                                <td className="text-right">
                                    <span className="badge bg-odoo-light-2 rounded-pill px-3">To approve</span>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
              </div>
              
            <div className="col-12">
                <div className="p-3 bg-white rounded shadow-default">
                    <div className="row">
                        <div className="col-lg-6 col-md-6 col-12">
                            <Blog data={null} />
                        </div>
                        <div className="col-lg-6 col-md-6 col-12">
                            <Blog data={null} />
                        </div>
                    </div>  
                </div>
            </div>
              
        </div>
    </div>
  )
}
