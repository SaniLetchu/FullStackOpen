import { NewPatientEntry } from './types';

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const parseString = (data: unknown): string => {
  if (!data || !isString(data)) {
    throw new Error('Incorrect or missing comment');
  }
  return data;
};

enum Gender {
  Male = "male",
  Female = "female",
  Other = "other",
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isGender = (param: any): param is Gender => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  return Object.values(Gender).includes(param);
};

const parseGender = (gender: unknown): Gender => {
  if (!gender || !isGender(gender)) {
      throw new Error('Incorrect or missing gender: ' + gender);
  }
  return gender;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const toNewPatientEntry = (object: any): NewPatientEntry => {
  const newEntry: NewPatientEntry= {
    name: parseString(object.name),
    ssn: parseString(object.ssn),
    gender: parseGender(object.gender),
    dateOfBirth: parseString(object.dateOfBirth),
    occupation: parseString(object.occupation)
  };

  return newEntry;
};

export default toNewPatientEntry;