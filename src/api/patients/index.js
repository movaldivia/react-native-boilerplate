import http from '../http';

export async function getPatientInfo(payload) {
  const response = await http.get(`users/${payload}`, {
    params: {
      light: false,
    },
  });
  return response;
}

export async function getPatients() {
  const response = await http.get('patients', {
    params: {
      light: true,
    },
  });
  return response;
}

export async function getCarers(payload) {
  const response = await http.get(`users/${payload}/caregivers`);
  return response;
}

export async function getAllPatients() {
  const response = await http.get('users', {
    params: {
      is_patient: true,
    },
  });
  return response;
}

export async function registerPatient(payload) {
  const { rut, ...rest } = payload;
  const parsed_rut = rut.split('-');
  const response = await http.post('users', {
    rut: Number(parsed_rut[0].replace(/\./gi, '')),
    check_digit: Number(parsed_rut[1]),
    is_patient: true,
    ...rest,
  });
  return response;
}

export async function assignCarer(payload) {
  const { patient_id, caregiver_id } = payload;
  const response = await http.patch(`users/${patient_id}/caregivers`, {
    caregiver_id,
  });
  return response;
}

export async function deleteCarer(payload) {
  const { patient_id, ...caregiver_id } = payload;
  const response = await http.delete(
    `users/${patient_id}/caregivers`,
    caregiver_id,
  );
  return response;
}

export async function patchPatient(payload) {
  const { id, ...body } = payload;
  const response = await http.patch(`patients/${id}`, body);
  return response;
}

export async function getSteps(payload) {
  const response = await http.get(`users/${payload}/steps/last`);
  return response;
}

export async function getGlycemia(payload) {
  const response = await http.get(`users/${payload}/glycemia/last`);
  return response;
}

export async function getStepsByDate(payload) {
  const response = await http.get(payload);
  return response;
}

export async function getGlycemiaByDate(payload) {
  const { from, to, userId, page } = payload;
  let response;
  if (!from) {
    response = await http.get(payload);
    return response;
  } else if (page) {
    response = await http.get(`users/${userId}/glycemia`, {
      params: { from, page, to },
    });
    return response;
  }
  response = await http.get(`users/${userId}/glycemia`, {
    params: { from, to },
  });
  return response;
}

export async function postglycemiaFile(payload) {
  const { user_id, file } = payload;
  const formData = new FormData();
  const config = {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  };
  formData.append('glycemia_file', file);
  const response = await http.post(
    `users/${user_id}/glycemia/files`,
    formData,
    {
      params: {
        type: payload.type,
        timezone: 'America/Santiago',
      },
      config,
    },
  );
  return response;
}

export async function getBodyMeasures(payload) {
  const response = await http.get(`patients/${payload}/body`);
  return response;
}

export async function getBodyMeasuresByDate(payload) {
  const response = await http.get(payload);
  return response;
}

export async function getHemoglobinGoals(payload) {
  const response = await http.get(
    `patients/${payload}/glycated-hemoglobin-goals`,
    {
      params: {
        light: true,
      },
    },
  );
  return response;
}
export async function getHemoglobinGoal(payload) {
  const response = await http.get(`glycated-hemoglobin-goals/${payload}`);
  return response;
}

export async function getStepsGoals(payload) {
  const response = await http.get(`patients/${payload}/steps-goals`);
  return response;
}

export async function postHemoglobinGoal(payload) {
  const response = await http.post(`glycated-hemoglobin-goals`, payload);
  return response;
}

export async function postStepGoal(payload) {
  const response = await http.post(`steps-goals`, payload);
  return response;
}

export async function getFeetImages(payload) {
  const response = await http.get(`patients/${payload}/diabetic-feet`);
  return response;
}

export async function getFeetImage(payload) {
  const response = await http.get(`diabetic-feet/${payload}`, { blob: true });
  return response;
}
export async function getFeetPrediction(payload) {
  const response = await http.get(`diabetic-feet/${payload}/prediction`);
  return response;
}
