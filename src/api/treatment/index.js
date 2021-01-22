import http from '../http';

export async function getAppointment(payload) {
  const response = await http.get(`appointments/${payload}`, {
    params: {
      light: false,
    },
  });
  return response;
}

export async function getPatientTreatments(payload) {
  const response = await http.get(`patients/${payload}/appointments`, {
    params: {
      light: true,
    },
  });
  return response;
}

export async function createTreatment(payload) {
  const { height, weight, ...rest } = payload;
  return await http.post('appointments', {
    ...rest,
    weight: Number(weight),
    height: Number(height),
  });
}
