type Rating = 1 | 2 | 3

interface Result {
  periodLength: number
  trainingDays: number
  success: boolean
  rating: Rating
  ratingDescription: string
  target: number
  average: number
}

const getSum = (ns: Array<number>): number => {
  return ns.reduce((s, n) => s + n, 0)
}

const getAverage = (ns: Array<number>): number => {
  return getSum(ns) / ns.length
}

const getRating = (target: number, average: number): [ Rating, string ] => {
  if (average >= target) {
    return [ 3, "Hooray! You're on fire, you unstoppable beast, you destroyer of worlds!" ]
  } else if (average >= (target / 2)) {
    return [ 2, "Umm... Not too bad, but you can do better. We both know you can." ]
  }
  return [ 1, "Obscene! You odious slob! Pull yourself together!" ]
}

const calculateExercises = (target: number, dailyHours: Array<number>): Result => {
  const average = getAverage(dailyHours)
  const [ rating, ratingDescription ] = getRating(target, average)
  return {
    periodLength: dailyHours.length,
    trainingDays: dailyHours.filter(h => h > 0).length,
    success: rating === 3,
    rating,
    ratingDescription,
    target,
    average
  }
}

console.log(calculateExercises(2, [ 3, 0, 2, 4.5, 0, 3, 1 ]))
