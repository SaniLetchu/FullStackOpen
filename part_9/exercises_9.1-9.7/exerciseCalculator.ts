interface ResultObject {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

export const calculateExercises = (dailyexercisehours: Array<number>, targetDaily: number): ResultObject => {
  const periodLength: number = dailyexercisehours.length;
  const trainingDays: number = dailyexercisehours.filter(num => num > 0).length;
  const target: number = targetDaily;
  const average: number = dailyexercisehours.reduce((sum, a) => sum + a, 0) / periodLength;
  const success: boolean = targetDaily <= average;
  let rating = 1;
  let ratingDescription = "are you even trying...";
  if(success) {
    rating = 3;
    ratingDescription = "amazing";
  }
  else if(average >= target - 1) {
    rating = 2;
    ratingDescription = "not too bad but could be better";
  }
  else if(average >= target - 2) {
    rating = 1;
    ratingDescription = "are you even trying...";
  }
  return {periodLength, trainingDays, success, rating, ratingDescription, target, average};
};

const target = Number(process.argv[2]);
const list: Array<number> = [];
let i = 3;
while(process.argv[i]) {
  list.push(Number(process.argv[i]));
  i++;
}
console.log(calculateExercises(list, target));