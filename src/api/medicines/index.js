import http from '../http';

export async function getMedicines() {
  return await http.get('drugs');
}

export async function getMedicine(payload) {
  const path = `drugs/${payload}`;
  return await http.get(path);
}

export async function createMedicine(payload) {
  return await http.post('drugs', payload);
}

export async function deleteMedicines(payload) {
  const path = `drugs/${payload}`;
  return await http.delete(path);
}

export async function associateMedicine(payload) {
  return await http.post('drugs/commercial', payload);
}

export async function getCommercialMedicines(payload) {
  const path = `drugs/${payload}/commercial`;
  return await http.get(path);
}

export async function deleteCommercialMedicines(payload) {
  const path = `drugs/commercial/${payload}`;
  return await http.delete(path);
}
