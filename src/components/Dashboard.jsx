import React from 'react';

import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, LineChart, Line } from 'recharts';
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


import { ComposedChart, Bar, Scatter } from 'recharts';



const data = [
  {
    subject: 'Math',
    A: 120,
    B: 110,
    fullMark: 150,
  },
  {
    subject: 'Chinese',
    A: 98,
    B: 130,
    fullMark: 150,
  },
  {
    subject: 'English',
    A: 86,
    B: 130,
    fullMark: 150,
  },
  {
    subject: 'Geography',
    A: 99,
    B: 100,
    fullMark: 150,
  },
  {
    subject: 'Physics',
    A: 85,
    B: 90,
    fullMark: 150,
  },
  {
    subject: 'History',
    A: 65,
    B: 85,
    fullMark: 150,
  },
];

export default function Dashboard() {
  return (
    <div className="container-lg">
        <div className="row">
              
            <div className="col-lg-4 col-md-6 col-sm-6 col-12">
                <div className="border-bottom bg-white shadow-default rounded mb-3">
                    <div className="modal-header">
                        <h5>Subscriptions</h5>
                    </div>
                    <div className="modal-body">
                        <RadarChart
                            cx={70}
                            cy={75}
                            outerRadius={75}
                            width={300} height={205}
                            data={data}
                            >
                            <PolarGrid />
                            <PolarAngleAxis dataKey="subject" />
                            <PolarRadiusAxis />
                            <Radar
                                name="Mike"
                                dataKey="A"
                                stroke="#8884d8"
                                fill="#8884d8"
                                fillOpacity={0.6}
                            />
                        </RadarChart>    
                    </div>        
                </div>
            </div>
              
            <div className="col-lg-4 col-md-6 col-sm-6 col-12">
                <div className="border-bottom bg-white shadow-default rounded mb-3">
                    <div className="modal-header">
                        <h5>Subscriptions</h5>
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
              

            <div className="col-lg-4 col-md-6 col-12">
            <div className="border-bottom bg-white shadow-default rounded mb-3">
                <div className="modal-header">
                    <h5>Subscriptions</h5>
                </div>
                <div className="py-2">
                    <RadarChart
                        cx={70}
                        cy={75}
                        outerRadius={75}
                        width={300} height={205}
                        data={data}
                        >
                        <PolarGrid />
                        <PolarAngleAxis dataKey="subject" />
                        <PolarRadiusAxis />
                        <Radar
                            name="Mike"
                            dataKey="A"
                            stroke="#8884d8"
                            fill="#8884d8"
                            fillOpacity={0.6}
                        />
                    </RadarChart>    
                </div>        
            </div>
            </div>
              
            <div className="col-lg-6 col-md-6 col-12">
            <div className="bg-white shadow-default rounded mb-3">
                <div className="modal-header">
                <h5>Gracias Kasongo</h5>
                <i className="badge bg-primary">45</i>
                </div>
                <div className="p-3">
                    <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis aspernatur ipsam pariatur, magnam incidunt non nemo porro nam repellendus, sequi voluptatibus dolorem distinctio voluptates officiis, quos consequatur doloribus accusamus odio!
                    </p>
                </div>
            </div>
            </div>

            <div className="col-lg-6 col-md-6 col-12">
                <div className="bg-white shadow-default rounded mb-3">
                    <div className="modal-header">
                        <h5>Gracias Kasongo</h5>
                        <i className="badge bg-danger">54</i>
                    </div>
                    <div className="modal-body">
                        <p>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis aspernatur ipsam pariatur, magnam incidunt non nemo porro nam repellendus, sequi voluptatibus dolorem distinctio voluptates officiis, quos consequatur doloribus accusamus odio!
                        </p>
                    </div>
                </div>
            </div>
            
            <div className="col-12">
                <h5 className="mb-2">Lastest transactions</h5>
                <div className="bg-white shadow-default rounded">
                    <table className="table">
                        <thead>
                        <tr>
                            <th className="border-right">#</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Amount</th>
                            <th>Cart type</th>
                            <th>Date</th>
                            <th className="text-right">State</th>
                        </tr>
                        </thead>
                    
                        <tbody className='table-body-striped'>
                            <tr>
                                <td>5</td>
                                <td>Gracias Kasongo</td>
                                <td>Email</td>
                                <td>$50.00</td>
                                <td>Visa</td>
                                <td>30/10/2022</td>
                                <td className="text-right"><span className="badge bg-success">Completed</span></td>
                            </tr>

                            <tr>
                                <td>4</td>
                                <td>Ngudia Kazadi</td>
                                <td>Email</td>
                                <td>$750.00</td>
                                <td>Visa</td>
                                <td>23/10/2022</td>
                                <td className="text-right"><span className="badge bg-odoo">Pending</span></td>
                            </tr>

                            <tr>
                                <td>3</td>
                                <td>Thina Kasongo</td>
                                <td>Email</td>
                                <td>$650.00</td>
                                <td>Visa</td>
                                <td>30/10/2022</td>
                                <td className="text-right"><span className="badge bg-odoo">Pending</span></td>
                            </tr>

                            <tr>
                                <td>2</td>
                                <td>Gracias Kasongo</td>
                                <td>Email</td>
                                <td>$50.00</td>
                                <td>Visa</td>
                                <td>30/10/2022</td>
                                <td className="text-right"><span className="badge bg-odoo">Pending</span></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
  )
}
