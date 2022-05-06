import Content from "./components/Content";
import Header from "./components/Header";
import Total from "./components/Total";
import { CoursePart } from "./types";

const courseParts: Array<CoursePart> = [
  {
    name: "Fundamentals",
    exerciseCount: 10
  },
  {
    name: "Using props to pass data",
    exerciseCount: 7
  },
  {
    name: "Deeper type usage",
    exerciseCount: 14
  }
];

const App = () => (
  <div>
    <Header header="Half Stack application development" />
    <Content parts={courseParts} />
    <Total parts={courseParts} />
  </div>
);

export default App;
