import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import { Home, UserCog, User, Layers, ChartBar, ArrowDown, ArrowUp } from "lucide-react";

import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import { Bar, Line, Pie } from "react-chartjs-2";
import { Data } from "./Data";


interface Props {
    name: string;
}
Chart.register(CategoryScale);
const Statistique: React.FC = () => {
    const [chartData, setChartData] = useState({
        labels: Data.map((data) => data.year),
        datasets: [
            {
                label: "Users Gained ",
                data: Data.map((data) => data.userGain),
                backgroundColor: [
                    "rgba(75,192,192,1)",
                    "#ecf0f1",
                    "#50AF95",
                    "#f3ba2f",
                    "#2a71d0"
                ],
                borderColor: "black",
                borderWidth: 2
            }
        ]
    });

    return (
        <div className="main--content">
            <h1>YOUTHC BAR CHART REACTJS</h1>
            <h2 style={{ textAlign: "center" }}>Bar Chart</h2>
            <div className="grid grid-cols-2 gap-2">
                <div><Bar
                    data={chartData}
                    options={{
                        plugins: {
                            title: {
                                display: true,
                                text: "Users Gained between 2016-2020"
                            },
                            legend: {
                                display: false
                            }
                        }
                    }}
                /></div>
                <div><Line
                    data={chartData}
                    options={{
                        plugins: {
                            title: {
                                display: true,
                                text: "Users Gained between 2016-2020"
                            },
                            legend: {
                                display: false
                            }
                        }
                    }}
                /></div>

            </div>

        </div>
    );
};

export default Statistique;