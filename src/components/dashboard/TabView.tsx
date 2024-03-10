import React, { useState } from "react";
import { Popover } from "antd";
import trend from "./icons/Trend.svg";
import editIcon from "./icons/Edit.svg";
import dropDownArrow from "./icons/dropDownArrow.svg";
import dropDownUpArrow from "./icons/dropDownUpArrow.svg";
import { TTab } from "../../interfaces";
import { ResponsiveAreaChart } from "./ResponsiveAreaChart";
import DateRangeDisplay from "./DateRangeDisplay";
import HoverComponent from "./HoverComponent";
import DropDownComponent from "./DropDownComponent";
import RangePickerComponent from "./RangePickerComponent";

type TTabViewProps = {
  tabs: TTab[];
  options: any;
  fromDate: string;
  toDate: string;
  setFromDate: React.Dispatch<React.SetStateAction<any>>;
  setToDate: React.Dispatch<React.SetStateAction<any>>;
};

export const TabView = ({
  tabs,
  options,
  fromDate,
  toDate,
  setFromDate,
  setToDate,
}: TTabViewProps) => {
  const [activeTab, setActiveTab] = useState(1);
  const [open, setOpen] = useState(false);
  return (
    <>
      <div className="md:w-[793px] md:h-[282px]] mx-auto py-2">
        <RangePickerComponent
          setFromDate={setFromDate}
          setToDate={setToDate}
          fromDate={fromDate}
          toDate={toDate}
        />
      </div>
      <div
        className={`md:w-[793px] md:h-[282px]] mx-auto bg-slate-50 border rounded-lg drop-shadow-md p-2`}
      >
        <div className="md:w-[773px] md:h-[60px] md:flex m-auto sm:block ">
          <div className="w-[740px] md:flex">
            {tabs?.map((tab: TTab, index: number) => (
              <div
                key={index}
                className={`md:w-[183px] rounded-lg hover:bg-[#F1F1F1] ${
                  activeTab === tab?.id ? "bg-[#F1F1F1]" : ""
                } cursor-pointer p-2 mr-[10px] sm:block`}
                onClick={() => {
                  setActiveTab(tab?.id);
                }}
              >
                <div className="flex justify-between text-[12px] font-[500]">
                  <Popover content={<HoverComponent title={tab?.label} />} placement="bottom">
                    <span className="border-b-2 border-dashed border-gray-300">
                      {tab?.label}
                    </span>
                  </Popover>
                  <Popover
                    trigger={"click"}
                    content={<DropDownComponent />}
                    placement="bottom"
                  >
                    <div className="w-[21px] h-[21px] rounded-md hover:bg-[#A9A9A9]">
                      <img
                        src={editIcon}
                        alt="noimg"
                        className="w-[25px] h-[20px] "
                      />
                    </div>
                  </Popover>
                </div>
                <div className=" h-[22px] flex text-[15px] font-[600] items-center ">
                  {tab?.count}{" "}
                  <div className="flex text-[10px] font-[400] px-1">
                    <img src={trend} alt="noimg" width="7px" height={"10px"} />
                    {tab?.percentage}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div
            className="flex cursor-pointer w-[15px] h-[17px] m-auto"
            onClick={() => {
              setOpen(!open);
            }}
          >
            {open ? (
              <img src={dropDownUpArrow} alt="npoimg" />
            ) : (
              <img src={dropDownArrow} alt="npoimg" />
            )}
          </div>
        </div>

        {open && (
          <>
            <div className="h-[150px] ml-[-25px]">
              <ResponsiveAreaChart
                kpi="New customers"
                data={options}
                colors={{
                  stroke: "#489AD2",
                  fill: "transparent",
                }}
              />
            </div>
            <div className="h-[32px] flex justify-end align-center items-center">
              <DateRangeDisplay
                content={
                  <span>
                    {fromDate?fromDate:options[0]?.date} -{" "}
                    {toDate?toDate:options[options?.length-1]?.date}
                  </span>
                }
                content2={
                  <span>
                    {fromDate?fromDate:options[0]?.date} -{" "}
                    {toDate?toDate:options[options?.length-1]?.date}
                  </span>
                }
                bg={true}
                textColor="rgba(112,112,122,1)"
              />
            </div>
          </>
        )}
      </div>
    </>
  );
};
