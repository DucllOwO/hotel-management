import React, { useState, useEffect } from "react";
import { Line } from "@ant-design/plots";

const MultiLineChart = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    asyncFetch();
  }, []);

  const asyncFetch = () => {
    fetch(
      "https://gw.alipayobjects.com/os/bmw-prod/55424a73-7cb8-4f79-b60d-3ab627ac5698.json"
    )
      .then((response) => response.json())
      .then((json) => setData(json))
      .catch((error) => {
        console.log("fetch data failed", error);
      });
  };

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
      .filter((item, index) => {
        if (item.category === "Gas flarinl")
          return { year: item.year, value: item.value, category: "Doanh thu" };
        if (item.category === "Liquid fuel")
          return { year: item.year, value: item.value, category: "Chi phí" };
        if (item.category === "Solid fuel")
          return { year: item.year, value: item.value, category: "Lợi nhuận" };
      })
      .map((item) => {
        if (item.category === "Gas flarinl")
          return { year: item.year, value: item.value, category: "Doanh thu" };
        if (item.category === "Liquid fuel")
          return { year: item.year, value: item.value, category: "Chi phí" };
        if (item.category === "Solid fuel")
          return { year: item.year, value: item.value, category: "Lợi nhuận" };
      }),
    xField: "year",
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
