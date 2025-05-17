import { useState, useEffect } from "react";
import { PieChart, ResponsiveContainer, Pie, Legend, Cell } from "recharts";


const EventGenresChart = ({ events }) => {
    const [data, setData] = useState([]);
    const genres = ['React', 'JavaScript', 'Node', 'jQuery', 'Angular'];
    const colors = ['#83a6ed', '#a4de6c', '#caa082', '#8dd1e1', '#c983b9'];

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

    const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
        const RADIAN = Math.PI / 180;
        const radius = innerRadius + (outerRadius - innerRadius) * 0.5; // halfway between inner and outer radius
        const x = cx + radius * Math.cos(-midAngle * RADIAN);
        const y = cy + radius * Math.sin(-midAngle * RADIAN);
      
        return percent > 0 ? (
          <text
            x={x}
            y={y}
            fill="#ffffff"
            textAnchor="middle"
            dominantBaseline="central"
            fontSize={14}
            fontWeight="bold"
          >
            {`${(percent * 100).toFixed(0)}%`}
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
                    innerRadius={60}
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