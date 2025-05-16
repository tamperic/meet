import { useState, useEffect } from "react";
import { PieChart, ResponsiveContainer, Pie, Legend, Cell } from "recharts";


const EventGenresChart = ({ events }) => {
    const [data, setData] = useState([]);
    const genres = ['React', 'JavaScript', 'Node', 'jQuery', 'Angular'];
    const colors = ['#83a6ed', '#a4de6c', '#82ca9d', '#8884d8', '#8dd1e1'];

    useEffect(() => {
        setData(getData());
    }, [`${events}`]);

    const getData = () => {
        // Loop over the genres array.
        const data = genres.map((genre) => {
            const filteredEvents = events.filter((event) => event.summary.includes(genre)); // Get a list of events that include the current genre in their '.summary'.
            return {
                name: genre,
                value: filteredEvents.length
            }
        });
        return data;
    }

    const renderCustomizedLabel = ({ cx, cy, midAngle, outerRadius, percent, index }) => {
        const RADIAN = Math.PI / 180;
        const radius = outerRadius;
        const x = cx + radius * Math.cos(-midAngle * RADIAN) * 1.07;
        const y = cy + radius * Math.sin(-midAngle * RADIAN) * 1.07;
        return percent ? (
          <text
            x={x}
            y={y}
            fill="#8884d8"
            textAnchor={x > cx ? 'start' : 'end'}
            dominantBaseline="central"
          >
            {`${genres[index]} ${(percent * 100).toFixed(0)}%`}
          </text>
        ) : null;
    };

    return (
        <ResponsiveContainer width="99%" height={400}>
            <PieChart>
                <Pie
                    data={data}
                    dataKey="value"
                    fill="#8884d8"
                    labelLine={false}
                    label={renderCustomizedLabel}
                    outerRadius={150}
                >
                    {data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={colors[index]}/>
                    ))}
                </Pie>    
                <Legend verticalAlign="bottom" align="center" />
            </PieChart>
        </ResponsiveContainer>
    )
}

export default EventGenresChart;