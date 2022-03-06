import { LeaveDayType } from "models/leave.api";

interface ICardLeaveDayType {
  type: LeaveDayType;
  title: string;
  date: number | undefined;
  active: boolean;
}

const CardLeaveDayType = (props: ICardLeaveDayType): JSX.Element => {
  const stylesNormal =
    "bg-white hover:bg-indigo-600 cursor-pointer hover:text-white";
  const stylesActive = "text-white bg-indigo-600 cursor-default";

  const style = props.active ? stylesActive : stylesNormal;

  return (
    <div
      className={
        style +
        " p-8 font-semibold rounded-lg shadow-lg shadow-black-200 border border-solid border-indigo-600"
      }
    >
      <div className="text-2xl">{props.title}</div>
      <div className="text-4xl text-right mt-4">{props.date}</div>
    </div>
  );
};

export default CardLeaveDayType;
