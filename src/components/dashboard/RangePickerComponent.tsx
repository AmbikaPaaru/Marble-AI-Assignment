import React from "react";
import { DatePicker } from "antd";
import { Dayjs } from "dayjs";
import dayjs from "dayjs";

const { RangePicker } = DatePicker;

type Props = {
  setFromDate: React.Dispatch<React.SetStateAction<string>>;
  setToDate: React.Dispatch<React.SetStateAction<string>>;
  fromDate: string;
  toDate: string;
};
const RangePickerComponent = ({
  setFromDate,
  setToDate,
  fromDate,
  toDate,
}: Props) => {
  const onRangeChange = (
    dates: null | (Dayjs | null)[],
    dateStrings: string[]
  ) => {
    if (dates) {
      const parsedDates = dateStrings?.map((dateString) => dayjs(dateString));
      const formattedDates = parsedDates?.map((date) =>
        date?.format("MMM D, YYYY")
      );
      setFromDate(formattedDates[0]);
      setToDate(formattedDates[1]);
    } else {
      setFromDate("");
      setToDate("");
    }
  };

  return (
    <div className="w-[250px] bg-slate-50 border rounded-lg drop-shadow-md">
      <RangePicker
      defaultValue={[fromDate?dayjs(fromDate):undefined, toDate?dayjs(toDate):undefined]}
        onChange={onRangeChange}
        className="border-none"
        suffixIcon={<></>}
      />
    </div>
  );
};

export default RangePickerComponent;
