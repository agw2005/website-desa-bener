import Primitive from "../components/reusable/Primitive.tsx";
import { useState } from "react";
import { type DateRange, DayPicker } from "@daypicker/react";
import "@daypicker/react/style.css";
import RoundedSection from "../components/reusable/RoundedSection.tsx";
import { dateToText } from "../helpers/dateToText.ts";
import Button from "../components/reusable/Button.tsx";
import Schedule from "../components/reusable/Schedule.tsx";

const DEFAULT_DATE = {
  from: new Date(),
  to: new Date(),
} as DateRange;

const Kalender = () => {
  const [dateRange, setDateRange] = useState<DateRange>(DEFAULT_DATE);

  return (
    <Primitive>
      <div className="flex justify-center p-16 gap-16">
        <RoundedSection title="KALENDER" contentClassName="flex-col gap-4">
          <DayPicker
            animate
            mode="range"
            selected={dateRange}
            onSelect={setDateRange}
            footer={dateRange
              ? (dateRange.from.toDateString() !==
                  dateRange.to.toDateString()
                ? (
                  <p>
                    <b>{dateToText(dateRange.from)}</b> --{" "}
                    <b>{dateToText(dateRange.to)}</b>
                  </p>
                )
                : (
                  <p>
                    <b>{dateToText(dateRange.from)}</b>
                  </p>
                ))
              : "Pilih hari"}
          />
          <Button
            variant="black"
            onClick={() => setDateRange(DEFAULT_DATE)}
          >
            Reset
          </Button>
        </RoundedSection>
        <RoundedSection
          title="KEGIATAN"
          titleClassName="flex-1"
          contentClassName="flex-col gap-4"
        >
          <Schedule title="Schedule" date={new Date()}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus,
            hic laborum? Recusandae ea mollitia quae in nostrum repellendus
            libero impedit id, nulla nemo molestiae animi ipsum necessitatibus,
            dolorum dicta tempora?
          </Schedule>
          <Schedule title="Schedule" date={new Date()}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus,
            hic laborum? Recusandae ea mollitia quae in nostrum repellendus
            libero impedit id, nulla nemo molestiae animi ipsum necessitatibus,
            dolorum dicta tempora?
          </Schedule>
          <Schedule title="Schedule" date={new Date()}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus,
            hic laborum? Recusandae ea mollitia quae in nostrum repellendus
            libero impedit id, nulla nemo molestiae animi ipsum necessitatibus,
            dolorum dicta tempora?
          </Schedule>
          <Schedule title="Schedule" date={new Date()}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus,
            hic laborum? Recusandae ea mollitia quae in nostrum repellendus
            libero impedit id, nulla nemo molestiae animi ipsum necessitatibus,
            dolorum dicta tempora?
          </Schedule>
          <Schedule title="Schedule" date={new Date()}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus,
            hic laborum? Recusandae ea mollitia quae in nostrum repellendus
            libero impedit id, nulla nemo molestiae animi ipsum necessitatibus,
            dolorum dicta tempora?
          </Schedule>
          <Schedule title="Schedule" date={new Date()}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus,
            hic laborum? Recusandae ea mollitia quae in nostrum repellendus
            libero impedit id, nulla nemo molestiae animi ipsum necessitatibus,
            dolorum dicta tempora?
          </Schedule>
        </RoundedSection>
      </div>
    </Primitive>
  );
};

export default Kalender;
