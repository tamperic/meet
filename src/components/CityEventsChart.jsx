import { useState, useEffect } from "react";
import { ScatterChart, Scatter, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const CityEventsChart = ({ events, allLocations }) => {
    const [data, setData] = useState([]);

    useEffect(() => {
        setData(getData());
    }, [`${events}`]);

    const getData = () => {
        const data = allLocations.map((location) => {
            const count = events.filter((event) => event.location === location).length; // Filter the events by each location to get the length of the resulting array. Use that length value as the event count for the location.
            const city = location.split((/, | - /))[0]; // To get the city out of each location in 'allLocations', it's needed to remove unnecessary information so that it only has a city name. Return an array ("CITY", "COUNTRY").
            return { city, count };
        })
        return data;
    }

    return (
        <ResponsiveContainer width="99%" height={400}>
            <ScatterChart margin={{ top: 20, bottom: 60, left: 20, right: 20}}>
                <CartesianGrid />
                <XAxis 
                    type="category" dataKey="city" name="City" 
                    angle={60} interval={0} tick={{ dx: 20, dy: 40, fontSize: 14 }}
                />
                <YAxis type="number" dataKey="count" name="Number of events" allowDecimals={false} />
                <Tooltip cursor={{ strokeDasharray: '3 3'}} />
                <Scatter name="A school" data={data} fill="#8884d8" />
            </ScatterChart>
        </ResponsiveContainer>
    )
}

export default CityEventsChart;