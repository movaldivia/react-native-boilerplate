import http from '../http';

export async function createPrescription(payload) {
  return await http.post('prescriptions', payload);
}

export async function getPrescriptions(payload) {
  const path = `patients/${payload}/prescriptions`;
  return await http.get(path);
}

export async function getIntakes(payload) {
  const path = `prescriptions/${payload}/intakes`;
  return await http.get(path);
}

export async function deletePrescription(payload) {
  return await http.delete(`prescriptions/${payload}`);
}
