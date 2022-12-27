import React, { useState, useEffect } from 'react';
import Plotly from 'plotly.js-basic-dist';
import createPlotlyComponent from 'react-plotly.js/factory';
import Loading from './Loading';

const Plot = createPlotlyComponent(Plotly);

function LineChart({ plotName }) {
    const [plotData, setPlotData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
            setIsLoading(true);
            const response = await fetch(`http://localhost:8000/plots/${plotName}`);
            const json = await response.json();
            setPlotData([{
                x: json.x,
                y: json.y,
                type: 'scatter',
                mode: 'lines'
            }]);
            setIsLoading(false);
        }
        fetchData();
    }, [plotName]);

    if (isLoading) {
        return <Loading />;
    }

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
