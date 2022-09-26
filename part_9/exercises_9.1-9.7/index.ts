import express from 'express';
import { calculateBmi } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';

const app = express();
app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  const height = Number(req.query.height);
  const weight = Number(req.query.weight);
  res.json({weight, height, bmi: calculateBmi(height, weight)});
});

app.post('/exercises', (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { daily_exercises, target } = req.body;
  if(!daily_exercises || !target) {
    res.json({error: "parameters missing"});
  }
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  res.json(calculateExercises(daily_exercises, target));
});

const PORT = 3002;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});