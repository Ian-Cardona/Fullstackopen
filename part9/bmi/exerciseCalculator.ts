import { isNotNumber } from './utils';

interface WeeklyHour {
  target: number;
  dailyHours: number[];
}

interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

const parseArguments = (args: string[]): WeeklyHour => {
  if (args.length < 4) throw new Error('Not enough arguments');

  const dailyHourArgs = args.slice(3);
  if (isNotNumber(args[2]) || dailyHourArgs.some(isNotNumber)) {
    throw new Error('Provided values were not numbers!');
  }

  return {
    target: Number(args[2]),
    dailyHours: dailyHourArgs.map(Number),
  };
};

export const calculateExercises = (
  targetAmount: number,
  dailyExerciseHours: number[],
): Result => {
  const average =
    dailyExerciseHours.reduce((a, b) => a + b) / dailyExerciseHours.length;
  const success = average >= targetAmount ? true : false;
  const rating = average >= targetAmount ? 3 : average != 0 ? 2 : 1;
  const ratingDescription =
    average >= targetAmount
      ? 'job well done!'
      : average != 0
      ? 'not too bad but could be better'
      : "we'll try again next time";
  const periodLength = dailyExerciseHours.length;
  const trainingDays = dailyExerciseHours.filter((value) => value != 0).length;

  const result = <Result>{
    periodLength: periodLength,
    trainingDays: trainingDays,
    success: success,
    rating: rating,
    ratingDescription: ratingDescription,
    target: targetAmount,
    average: average,
  };

  return result;
};

if (require.main === module) {
  try {
    const { target, dailyHours } = parseArguments(process.argv);
    console.log(calculateExercises(target, dailyHours));
  } catch (error: unknown) {
    let errorMessage = 'Something wrong!';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
      console.log(errorMessage);
    }
  }
}

// console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2));
// console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 1));
// console.log(calculateExercises([0, 0, 0, 0, 0, 0, 0], 1));
