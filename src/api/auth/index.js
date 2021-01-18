import http from '../http';

export async function login(payload) {
  const response = await http.post('auth/login', payload)
  console.log(`Que wea ${response}`)
  return response;
}

export async function refresh(payload) {
  const response = await http.post('auth/refresh', payload);
  return response;
}
