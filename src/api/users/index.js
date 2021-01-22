import http from '../http';

export async function getUser(payload) {
  const response = await http.get(`users/${payload}`);
  return response;
}

export async function editUser(payload) {
  const { id, rut, data, ...rest } = payload;
  let final_payload;
  if (rut) {
    final_payload.rut = Number(rut.split('-')[0].replace(/\./gi, ''));
  }
  if (data) {
    final_payload = data;
  } else {
    final_payload = rest;
  }

  const response = await http.patch(`users/${id}`, final_payload);
  return response;
}

export async function deleteUser(payload) {
  const response = await http.delete(`users/${payload}`);
  return response;
}

export async function changeUserPassword(payload) {
  const user = await http.patch(`users/${payload.id}`, payload.data);
  return user;
}

export async function createUser(payload) {
  const { rut, ...res } = payload;
  const parsed_rut = rut.split('-');
  const user = await http.post('users', {
    rut: Number(parsed_rut[0].replace(/\./gi, '')),
    check_digit: Number(parsed_rut[1]),
    ...res,
  });
  return user;
}

export async function getUsers() {
  const user = await http.get('users');
  return user;
}

export async function searchUser(payload) {
  const response = await http.get(
    `users/byrut/${payload.split('-')[0].replace(/\./gi, '')}`,
  );
  return response;
}
