export const calculateBmi = (height: number, weight: number) => {
  const bmi: number = weight / Math.pow((height / 100), 2);
  if(bmi < 16.0) {
    return "Underweight (Severe thinness)";
  }
  if(16.0 <= bmi && bmi <= 16.9) {
    return "Underweight (Moderate thinness)";
  }
  if(17.0 <= bmi && bmi <= 18.4) {
    return "Underweight (Mild thinness)";
  }
  if(18.5 <= bmi && bmi <= 24.9) {
    return "Normal (healthy weight)";
  }
  if(25.0 <= bmi && bmi <= 29.9) {
    return "Overweight (Pre-obese)";
  }
  if(30.0 <= bmi && bmi <= 34.9) {
    return "Obese (Class I)";
  }
  if(35.0 <= bmi && bmi <= 39.9) {
    return "Obese (Class II)";
  }
  else {
    return "Obese (Class III)";
  }
};

const height = Number(process.argv[2]);
const weight = Number(process.argv[3]);
console.log(calculateBmi(height, weight));