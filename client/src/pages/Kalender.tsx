import Primitive from "../components/reusable/Primitive.tsx";

const Kalender = () => {
  return (
    <Primitive>
      <div className="flex w-view h-256">
        <iframe
          className="w-full"
          src="https://calendar.google.com/calendar/embed?src=en.indonesian%23holiday%40group.v.calendar.google.com&ctz=Asia/Jakarta"
        >
        </iframe>
      </div>
    </Primitive>
  );
};

export default Kalender;
