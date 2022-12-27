import React, { useState, useEffect } from 'react';
import Plotly from 'plotly.js-basic-dist';
import createPlotlyComponent from 'react-plotly.js/factory';

const Plot = createPlotlyComponent(Plotly);

function LineChart({ plotName }) {
    const [plotData, setPlotData] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const response = await fetch(`http://localhost:8000/plots/${plotName}`);
            const json = await response.json();
            setPlotData([{
                x: json.x,
                y: json.y,
                type: 'scatter',
                mode: 'lines'
            }]);
        }
        fetchData();
    }, [plotName]);

    return (
        <Plot
            data={plotData}
            // layout={{ title: 'Line Chart' }}
            config={{ displayModeBar: false }}
            style={{ width: '100%', height: '100%' }}
        />
    );
}

export default LineChart;
