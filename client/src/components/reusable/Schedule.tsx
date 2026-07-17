import type { ReactNode } from "react";
import { dateToText } from "../../helpers/dateToText.ts";

interface ScheduleProps {
  title: string;
  date: Date;
  children: ReactNode;
}

const Schedule = ({ title, date, children }: ScheduleProps) => {
  return (
    <div className="bg-amber-600 py-2 px-4 flex flex-col w-full rounded-2xl">
      <h2 className="font-bold text-2xl text-white">{title}</h2>
      <h3 className="text-sm text-white">{dateToText(date)}</h3>
      <p className="text-white">{children}</p>
    </div>
  );
};

export default Schedule;
