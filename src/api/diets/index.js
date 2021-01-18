import http from '../http';

export async function getDiets(payload) {
  const meals = await http.get(`patients/${payload}/meals`);
  return meals.data;
}

export async function createDiet(payload) {
  return await http.post('meals', payload);
}

export async function editDiet(payload) {
  const path = `meals/${payload.id}`;
  return await http.patch(path, payload);
}

export async function deleteDiets(payload) {
  const path = `meals/${payload}`;
  return await http.delete(path);
}
