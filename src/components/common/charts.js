import React from "react";
import { Chart } from "react-google-charts";

export const data = [
  ["Activitity", "Reports", "Properties", "Clients"],
  ["R",1000, 400, 200],
  ["", 1170, 460, 250],
  ["", 660, 1120, 300],
  ["", 1030, 540, 350],
];
export const data1 = [
    ["Activity", "Total Counts"],
    ["Reports", 5],
    ["Properties",1],
    ["Clients",5],
  ];

export const options = {
  chart: {
    title: "Activities",
    subtitle: "Reports, properties and clients Report",
  },
  colors:["#8153ac", "#ac00e6","#993333"]
};

export function Charts() {
  return (
    <Chart
      chartType="Bar"
      width="95%"
      height="400px"
      data={data}
      options={options}
    />
  );
}


export function PieCharts(){
    return (
        <Chart
          chartType="PieChart"
          data={data1}
          options={options}
          width={"100%"}
          height={"400px"}
        />
      );
}