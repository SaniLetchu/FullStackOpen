import patientData from '../data/patients';
import { v1 as uuid } from 'uuid';
import { NonSensitivePatientEntry, NewPatientEntry, Patient } from '../types';

const getNonSensitiveEntries = (): NonSensitivePatientEntry[] => {
  return patientData.map(({id, name, dateOfBirth, gender, occupation}) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation
  }));
};

const addPatient = (entry: NewPatientEntry): Patient => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
  const id = uuid();
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const newPatient = {...entry, id};
  patientData.push(newPatient);
  return newPatient;
};

export default {
  getNonSensitiveEntries,
  addPatient
};