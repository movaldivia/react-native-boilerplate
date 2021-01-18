export const thunkHandler = async (apicall, arg, thunkApi, refresh, token) => {
  let response;
  try {
    response = arg ? await apicall(arg) : await apicall();
  } catch (ex) {
    if (ex.response && ex.response.status === 401) {
      await thunkApi(refresh(token)).then(async () => {});
      response = arg ? await apicall(arg) : await apicall();
      return response;
    }
    return ex.response;
  }

  return response;
};


