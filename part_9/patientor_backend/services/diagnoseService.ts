import diagnoseData from '../data/diagnoses';

import { Diagnose } from '../types';

const getEntries = (): Diagnose[] => {
  return diagnoseData;
};

const addDiagnose = () => {
  return null;
};

export default {
  getEntries,
  addDiagnose
};