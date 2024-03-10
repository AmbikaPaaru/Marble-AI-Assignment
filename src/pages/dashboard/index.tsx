import React, { useMemo, useState } from "react";
import dayjs from "dayjs";
import { CrudFilter, useList } from "@refinedev/core";
import { IChartDatum, TTab } from "../../interfaces";
import { TabView } from "../../components/dashboard/TabView";

export const Dashboard: React.FC = () => {
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  const filters: CrudFilter[] = [
    {
      field: "start",
      operator: "eq",
      value: fromDate
        ? dayjs(fromDate).startOf("day").add(1, "days")
        : dayjs()?.subtract(6, "days")?.startOf("day"),
    },
    {
      field: "end",
      operator: "eq",
      value: toDate
        ? dayjs(toDate).endOf("day").add(1, "days")
        : dayjs().startOf("day").add(1, "days"),
    },
  ];

  const { data: dailyOrders } = useList<IChartDatum>({
    resource: "dailyOrders",
    filters,
  });

  const { data: newCustomers } = useList<IChartDatum>({
    resource: "newCustomers",
    filters,
  });

  const useMemoizedChartData = (d: any, dailyOrders: any) => {
    return useMemo(() => {
      if (d?.data?.data?.length > 0 && dailyOrders?.data?.data?.length > 0) {
        const formattedData1 = d?.data?.data?.map((item: IChartDatum) => {
          const currentDate = new Date(item?.date);
          currentDate.setDate(currentDate.getDate());

          const nextDateStr = currentDate.toLocaleDateString("en-US", {
            month: "short",
            day: "2-digit",
            year: "numeric",
          });
          return {
            date: nextDateStr,
            value: item?.value,
          };
        });

        const formattedData2 = dailyOrders?.data?.data?.map(
          (item: IChartDatum) => {
            const currentDate = new Date(item?.date);
            currentDate.setDate(currentDate.getDate());

            const nextDateStr = currentDate.toLocaleDateString("en-US", {
              month: "short",
              day: "2-digit",
              year: "numeric",
            });
            return {
              date: nextDateStr,
              value1: item?.value,
            };
          }
        );

        const mergedData = formattedData1?.map((item: any, index: number) => ({
          ...item,
          value1: formattedData2[index]?.value1,
        }));

        return mergedData;
      }
    }, [d, dailyOrders]);
  };

  const memoizedRevenueData = useMemoizedChartData(
    newCustomers && dailyOrders && newCustomers,
    dailyOrders
  );

  const tabs: TTab[] = [
    {
      id: 1,
      label: "Online store sessions",
      count: "255,851",
      percentage: "9%",
    },
    {
      id: 2,
      label: "Net return value",
      count: "-$15,07.44",
      percentage: "14%",
    },
    {
      id: 3,
      label: "Total orders",
      count: "10,511",
      percentage: "2%",
    },
    {
      id: 4,
      label: "Conversion rate",
      count: "3.18%",
      percentage: "7%",
    },
  ];

  return (
    <>
      <TabView
        tabs={tabs}
        options={memoizedRevenueData}
        fromDate={fromDate}
        toDate={toDate}
        setFromDate={setFromDate}
        setToDate={setToDate}
      />
    </>
  );
};
