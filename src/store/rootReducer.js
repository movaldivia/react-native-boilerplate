import {prescriptionsReducer} from '../features/prescriptions/prescriptionSlice';
import {loginReducer} from '../features/login/loginSlice';

export const reducers = {
  auth: loginReducer,
  prescriptions: prescriptionsReducer,
};
