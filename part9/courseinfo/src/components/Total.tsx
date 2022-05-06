import { FC } from "react";
import { CoursePart } from "../types";

interface Props {
  parts: Array<CoursePart>
}

const Total: FC<Props> = ({ parts }) => (
  <p>
    Number of exercises&nbsp;
    {parts.reduce((sum, { exerciseCount }) => sum + exerciseCount, 0)}
  </p>
);

export default Total;
