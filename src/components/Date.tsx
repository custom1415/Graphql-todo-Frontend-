import { FC } from "react";
import { MdAdd } from "react-icons/md";

type Props = {
  todosCount: number;
  toggleInputHidden: () => void;
};
const DateComponent = ({ todosCount, toggleInputHidden }: Props) => {
  const date = new Date();
  const dayOfTheMonth = date.getDate();
  const weekDay = new Intl.DateTimeFormat("en-US", { month: "short" }).format();
  const year = date.getFullYear();
  return (
    <div className="sticky top-0 left-0 z-50 flex items-center max-h-24 justify-between p-8 shadow bg-blue-500 text-white">
      <div className="flex items-center gap-2 ">
        <h1 className="text-4xl">{dayOfTheMonth}</h1>
        <div>
          <h3 className="text-xs">{weekDay}</h3>
          <h3 className="text-xs">{year}</h3>
        </div>
      </div>
      {/* <h1>{todosCount && todosCount} Todos</h1> */}
      <div
        className="p-3 hover:bg-blue-900 cursor-pointer text-xl text-white bg-blue-800 w-max grid place-items-center rounded-full"
        onClick={toggleInputHidden}
      >
        <MdAdd />
      </div>
    </div>
  );
};

export default DateComponent;
