import { FC } from "react";
import { CoursePart } from "../types";

interface Props {
  part: CoursePart
}

const assertNever = (_: never): never => {
  throw new Error("In an ideal world, this error will never be thrown. "
    + "So, if you see this error, it means you're living in a nightmare world.");
};

const getDetailsByType = (part: CoursePart) => {
  switch (part.type) {
    case "normal":
      return <><br/>{part.description}</>;
    case "groupProject":
      return <><br/>Number of group exercises: {part.groupProjectCount}</>;
    case "submission":
      return (
        <>
          <br/>{part.description}
          <br/>Submissions to <a href={part.exerciseSubmissionLink}>{part.exerciseSubmissionLink}</a>
        </>
      );
    case "special":
      return (
        <>
          <br/>{part.description}
          <br/>Skill requirements:&nbsp;{part.requirements.join(", ")}
        </>
      );
    default:
      return assertNever(part);
  }
};

const Part: FC<Props> = ({ part }) => {
  return (
    <p>
      <b>{part.name} ({part.exerciseCount})</b>
      {getDetailsByType(part)}
    </p>
  );
};

export default Part;
