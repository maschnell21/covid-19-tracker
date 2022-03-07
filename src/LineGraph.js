import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import numeral from "numeral";
const options = {
  legend: {
    display: false,
  },
  elements: {
    point: {
      radius: 0,
    },
  },
  maintainAspectRatio: false,
  tooltips: {
    mode: "index",
    intersect: false,
    callbacks: {
      label: function (tooltipItem, data) {
        return numeral(tooltipItem.value).format("+0,0");
      },
    },
  },
  scales: {
    xAxes: [
      {
        type: "time",
        time: {
          format: "MM/DD/YY",
          tooltipFormat: "ll",
        },
      },
    ],
    yAxes: [
      {
        gridLines: {
          display: false,
        },
        ticks: {
          callback: function (value, index, values) {
            return numeral(value).format("0a");
          },
        },
      },
    ],
  },
};
const buildChartData = (data, casestype) => {
  let chartData = [];
  let lastDataPoint;
  console.log(data,casestype);
  for (let date in data.cases) {
    if (lastDataPoint && data[casestype][date]!==0) {
      let newDatapoint = {
        x: date,
        y: data[casestype][date] - lastDataPoint,
      };
      chartData.push(newDatapoint);
    }
    lastDataPoint = data[casestype][date];
  }
  return chartData;
};

function LineGraph({casestype,...props}) {
  const [data, setData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      await fetch("https://disease.sh/v3/covid-19/historical/all?lastdays=120")
        .then((response) => {
      return  response.json();
        })
        .then((data) => {
          console.log(data);
          let chartData = buildChartData(data, casestype);
          setData(chartData);
          console.log(chartData);
        });
    };
    fetchData();
  }, [casestype]);
  return (
    <div className={props.className}>
           {data?.length > 0 && (  
        <Line
          options={options}
          data={{
            datasets: [
              {
                // backgroundColor: "rgba(204,16,52,0.5)",
                data: data,
                backgroundColor: "rgba(204, 16, 52, 0.5)",
                // backgroundColor: [
                //     'rgba(255, 99, 132, 0.2)'],
                fill: true,
                borderColor: "#CC1034",
              
              },
            ],
          }}
        />
        )}
    </div>
  );
}
export default LineGraph;
