import React, { ReactNode } from "react";

type TProps = {
  content?: ReactNode;
  content1?: ReactNode;
  bg:boolean;
  textColor:string

};
const DateRangeDisplay = ({ content,content1,bg,textColor }: TProps) => {
  return (
    <>
      <div className={`flex w-[181px] h-[22px] mr-[10px] ${bg && 'bg-[#F1F1F1]'} rounded-[2px] items-center text-center text-[10px] font-[500] text-[${textColor}]`}>
        <span className={`w-[15px] h-[2px] font-[800] bg-[#489AD2] flex item-center m-2`}></span>
        {content}
      </div>
      <div className={`flex w-[181px] h-[22px] ${bg && 'bg-[#F1F1F1]'} rounded-[2px] items-center text-[10px] font-[500] text-[${textColor}]`}>
        <span className={`w-[15px] h-[2px] font-[800] bg-[rgba(72,154,210,0.2)] flex item-center m-2`}></span>
        {content?content:content1}
      </div>
    </>
  );
};

export default DateRangeDisplay;
