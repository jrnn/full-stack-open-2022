import { FC } from "react";
import { CoursePart } from "../types";
import Part from "./Part";

interface Props {
  parts: Array<CoursePart>
}

const Content: FC<Props> = ({ parts }) => {
  return (
    <>
      {parts.map(part =>
        <Part key={part.name} part={part} />
      )}
    </>
  );
};

export default Content;
