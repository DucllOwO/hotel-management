import React, { useState, useEffect } from "react";
import { Line } from "@ant-design/plots";

const MultiLineChart = ({reportData}) => {
  const [data, setData] = useState(reportData);
  // const [configData, setConfigData] = useState([]);
  useEffect(() => {
    // setConfigData([]);
    setData(reportData);
    config.data = mapData();
    // config.data = configData;
    console.log(config.data)
  }, [reportData]);
  const mapData = () => {
    const mapIncome = data.map((item) => {      
      return {time: item.date ? item.date : item.month, value: item.income, category: "Doanh thu"};       
    });
    const mapOutcome = data.map((item) => {
      return {time: item.date ? item.date : item.month, value: item.outcome, category: "Chi phí"};
    }); 
    const mapProfit = data.map((item) => {
      return {time: item.date ? item.date : item.month, value: item.profit, category: "Lợi nhuận"};
    });
    return [...mapIncome,...mapOutcome,...mapProfit];
  }
  // const mapData = () => {
  //   console.log("called")
  //   const mapedData = data.map((item) => {      
  //     const income = {time: item.date, value: item.income, category: "Doanh thu"};
  //     const outcome = {time: item.date, value: item.outcome, category: "Chi phí"};
  //     const profit = {time: item.date, value: item.profit, category: "Lợi nhuận"};
  //     setConfigData([...configData, income, outcome, profit]);
  //     return;
  //   })
  // }
  // // const asyncFetch = () => {
  // //   fetch(
  // //     "https://gw.alipayobjects.com/os/bmw-prod/55424a73-7cb8-4f79-b60d-3ab627ac5698.json"
  // //   )
  // //     .then((response) => response.json())
  // //     .then((json) => setData(json))
  // //     .catch((error) => {
  // //       console.log("fetch data failed", error);
  // //     });
  // // };

  // console.log(
  //   data
  //     ? data.filter((item, index) => {
  //         if (item.category === "Gas flarinl")
  //           return {
  //             year: item.year,
  //             value: item.value,
  //             category: "Doanh thu",
  //           };
  //         if (item.category === "Liquid fuel")
  //           return { year: item.year, value: item.value, category: "Chi phí" };
  //         if (item.category === "Solid fuel")
  //           return {
  //             year: item.year,
  //             value: item.value,
  //             category: "Lợi nhuận",
  //           };
  //       })
  //     : ""
  // );
  const config = {
    data: mapData(),
    // data
    //   .map((item) => {
    //     if(item.date)  
    //     return [{ time: item.date, value: item.outcome, category: "Doanh thu" },
    //       { time: item.date, value: item.outcome, category: "Chi phí" },
    //       { time: item.date, value: item.profit, category: "Lợi nhuận" },]
    //     // else
        //   return { time: item.month, value: item.profit, category: "Doanh thu" };
      // }),
    xField: "time",
    yField: "value",
    seriesField: "category",
    yAxis: {
      label: {
        formatter: (v) =>
          `${v}`.replace(/\d{1,3}(?=(\d{3})+$)/g, (s) => `${s},`),
      },
    },
    width: "100%",
    height: "100%",
  };
  return (
    <>
      <Line {...config} />
    </>
  );
};

export default MultiLineChart;
