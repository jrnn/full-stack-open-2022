interface CalculateExercisesArguments {
  target: number,
  dailyHours: Array<number>
}

type Rating = 1 | 2 | 3;

enum RatingDescription {
  GOOD = "Hooray! You're on fire, you unstoppable beast, you destroyer of worlds!",
  OK = "Umm... Not too bad, but you can do better. We both know you can.",
  BAD = "Obscene! You odious slob! Pull yourself together!"
}

interface Result {
  periodLength: number
  trainingDays: number
  success: boolean
  rating: Rating
  ratingDescription: RatingDescription
  target: number
  average: number
}

const getSum = (ns: Array<number>): number => {
  return ns.reduce((s, n) => s + n, 0);
};

const getAverage = (ns: Array<number>): number => {
  return getSum(ns) / ns.length;
};

const getRating = (target: number, average: number): [ Rating, RatingDescription ] => {
  if (average >= target) {
    return [ 3, RatingDescription.GOOD ];
  } else if (average >= (target / 2)) {
    return [ 2, RatingDescription.OK ];
  }
  return [ 1, RatingDescription.BAD ];
};

const calculateExercises = ({ target, dailyHours }: CalculateExercisesArguments): Result => {
  const average = getAverage(dailyHours);
  const [ rating, ratingDescription ] = getRating(target, average);
  return {
    periodLength: dailyHours.length,
    trainingDays: dailyHours.filter(h => h > 0).length,
    success: rating === 3,
    rating,
    ratingDescription,
    target,
    average
  };
};

const toNonNegativeNumber = (s: string): number => {
  const n = Number(s);
  if (isNaN(n) || n < 0) {
    throw new Error(`Invalid argument '${s}'. Only non-negative numbers, please.`);
  }
  return n;
};

const parseArgs = (args: Array<string>): CalculateExercisesArguments => {
  if (args.length < 4) {
    throw new Error("Wrong number of arguments. Give target hours per day as the first argument,"
      + " followed by any number of daily exercise hours (at least one).");
  }
  const [ target, ...dailyHours ] = args.slice(2);
  return {
    target: toNonNegativeNumber(target),
    dailyHours: dailyHours.map(toNonNegativeNumber)
  };
};

const main = (args: Array<string>) => {
  try {
    console.log(calculateExercises(parseArgs(args)));
  } catch (error) {
    if (error instanceof Error) {
      console.error(`${error.name} -- ${error.message}`);
    } else {
      console.error("Oops! Something went wrong =", error);
    }
    process.exit(1);
  }
};

main(process.argv);

export {};
