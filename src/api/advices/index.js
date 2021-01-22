import http from '../http';
export async function getCategories() {
  const response = await http.get(`advices/categories`);
  return response;
}

export async function getAdvices() {
  const response = await http.get(`advices`);
  return response;
}

export async function postAdvice(payload) {
  const response = await http.post(`advices`, payload);
  return response;
}

export async function editAdvice(payload) {
  const { id, ...body } = payload;
  const response = await http.patch(`advices/${id}`, body);
  return response;
}

export async function deleteAdvice(payload) {
  const response = await http.delete(`advices/${payload}`);
  return response;
}

export async function postCategory(payload) {
  const response = await http.post(`advices/categories`, payload);
  return response;
}

export async function patchCategory(payload) {
  const { id, ...res } = payload;
  const response = await http.patch(`advices/categories/${id}`, res);
  return response;
}

export async function deleteCategory(payload) {
  const response = await http.delete(`advices/categories/${payload}`);
  return response;
}
