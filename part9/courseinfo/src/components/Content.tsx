import { FC } from "react";
import { CoursePart } from "../types";

interface Props {
  parts: Array<CoursePart>
}

const Content: FC<Props> = ({ parts }) => {
  return (
    <ul>
      {parts.map(part =>
        <li key={part.name}>{part.name} {part.exerciseCount}</li>
      )}
    </ul>
  );
};

export default Content;
