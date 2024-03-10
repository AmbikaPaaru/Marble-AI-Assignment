import information from "./icons/info.svg";
import trade from "./icons/trade.svg";

const data = [
  { id: 1, title: "Average Order Value" },
  { id: 2, title: "Conversion rate" },
  { id: 3, title: "Gross Sales" },
  { id: 4, title: "Net return value" },
  { id: 5, title: "Store search conversion" },
  { id: 6, title: "Return rate" },
];

const DropDownComponent = () => {
  return (
    <div className="w-[212px] h-[167px]">
      {data?.map((info: { id: number; title: string }, index: number) => (
        <div
          key={index}
          className="group relative flex justify-between w-[212px] h-[22px] hover:bg-[rgba(241,241,241,1)] mb-2 px-[15px] py-[5px] cursor-pointer rounded-[3px]"
        >
          <div className="w-[20%]">
            <img src={trade} alt="noimg" />
          </div>
          <div className="w-[70%] text-[10px] font-[400] text-[rgba(48,48,48,1)]" >
            {info?.title}
          </div>
          <div className="w-[10%] invisible group-hover:visible absolute left-[190px]">
            <img src={information} alt="noimg" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default DropDownComponent;
