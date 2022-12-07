import React, { useState, useEffect } from "react";
import { Line } from "@ant-design/plots";

const MultiLineChart = ({reportData}) => {
  const [data, setData] = useState(reportData);
  useEffect(() => {
    console.log(data)
    setData(reportData);
  }, [data]);

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
    data: data
      .map((item) => {
        if(item.date)
          return { time: item.date, value: item.profit, category: "Doanh thu" };
          // return { time: item.month, value: item.value, category: "Chi phí" };
          // return { time: item.month, value: item.value, category: "Lợi nhuận" };
        else
          return { time: item.month, value: item.profit, category: "Doanh thu" };
      }),
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
