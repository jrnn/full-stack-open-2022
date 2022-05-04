import { calculateExercises, toCalculateExercisesArgs } from "./src/exerciseCalculator";

const parseArgs = (args: Array<string>) => {
  if (args.length < 4) {
    throw new Error("Wrong number of arguments. Give target hours per day as the first argument,"
      + " followed by any number of daily exercise hours (at least one).");
  }
  const [ target, ...dailyHours ] = args.slice(2);
  return toCalculateExercisesArgs(target, dailyHours);
};

const main = (args: Array<string>) => {
  try {
    console.log(calculateExercises(parseArgs(args)));
  } catch (error) {
    if (error instanceof Error) {
      console.error(`${error.name}: ${error.message}`);
    } else {
      console.error("Oops! Something went wrong =", error);
    }
    process.exit(1);
  }
};

main(process.argv);
