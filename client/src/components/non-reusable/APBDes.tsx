import { Link } from "react-router";
import Button from "../reusable/Button.tsx";

interface APBDesProps {
  year: number;
}

const APBDes = ({ year }: APBDesProps) => {
  return (
    <Link to={`/data/${year}`}>
      <Button>{year}</Button>
    </Link>
  );
};

export default APBDes;
