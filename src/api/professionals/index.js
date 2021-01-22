import http from '../http';

export async function getProfessionals() {
  const response = await http.get('users', {
    params: {
      is_professional: true,
      light: true,
    },
  });
  return response;
}

export async function getProfessional(payload) {
  const response = await http.get(`users/${payload}/professionals`);
  return response;
}

export async function createProfessional(payload) {
  const { rut, ...rest } = payload;
  const parsed_rut = rut.split('-');
  const response = await http.post(`users`, {
    rut: Number(parsed_rut[0].replace(/\./gi, '')),
    check_digit: Number(parsed_rut[1]),
    is_professional: true,
    ...rest,
  });
  return response;
}

export async function getProfessionalPatients(payload) {
  const response = await http.get(`users/${payload}/patients`, {
    params: {
      light: true,
    },
  });
  return response;
}

export async function editProfessional(payload) {
  const response = await http.patch(
    `professionals/${payload.id}`,
    payload.data,
  );
  return response;
}

export async function assignPatient(payload) {
  const { patient_id, professional_id } = payload;
  const response = await http.patch(`users/${professional_id}/patients`, {
    patient_id,
  });
  return response;
}

export async function unassignPatient(payload) {
  const response = await http.patch('removeProfessional', payload);
  return response;
}
