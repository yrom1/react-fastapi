import React, { useState, useEffect } from 'react';
import Plotly from 'plotly.js-basic-dist';
import createPlotlyComponent from 'react-plotly.js/factory';

const Plot = createPlotlyComponent(Plotly);

function BarChart({ plotName }) {
    const [data, setData] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const response = await fetch(`http://localhost:8000/plot/${plotName}`);
            const json = await response.json();
            setData(json.data);
        }
        fetchData();
    }, [plotName]);

    return (
        <Plot
            data={data}
            layout={{ title: 'Bar Chart' }}
            config={{ displayModeBar: false }}
            style={{ width: '100%', height: '100%' }}
        />
    );
}

export default BarChart;
