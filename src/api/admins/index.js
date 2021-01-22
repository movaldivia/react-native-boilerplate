import http from '../http';

export async function createAdmin(payload) {
  const { rut, ...rest } = payload;
  const parsed_rut = rut.split('-');
  const response = await http.post('users', {
    rut: Number(parsed_rut[0].replace(/\./gi, '')),
    check_digit: Number(parsed_rut[1]),
    is_admin: true,
    ...rest,
  });
  return response;
}

export async function getSuperAdmins() {
  const response = await http.get(`users`, {
    params: {
      is_superadmin: true,
    },
  });
  return response;
}
