import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getPrescriptions } from '../../api/prescriptions/';
import { thunkhanlder } from '../../common/thunk_handler';
import { refreshSessionThunk } from '../login/loginSlice';

export const prescriptionsState = { current: [] };

const fetchPrescriptions = createAsyncThunk(
  'prescriptions/fetchPrescriptions',
  async (payload, thunkAPI) => {
    const token = thunkAPI.getState().auth.user.refresh;
    const response = await thunkhanlder(
      getPrescriptions,
      payload,
      thunkAPI.dispatch,
      refreshSessionThunk,
      token,
    );
    return response.data;
  },
);

const prescriptionsSlice = createSlice({
  name: 'prescriptions',
  initialState: prescriptionsState,
  extraReducers: {
    [fetchPrescriptions.fulfilled]: (state, action) => {
      state.current = action.payload.map((prescription) => {
        return {
          id: prescription.id,
          delta_hours: prescription.delta_hours,
          start: prescription.start,
          duration_days: prescription.duration_days,
          comment: prescription.comment,
          quantity: prescription.quantity,
          generic_drug: prescription.generic_drug,
          patient: prescription.patient,
          commercial_medicine: prescription.commercial_medicine,
        };
      });
    },
  },
});

export const fetchPrescriptionsThunk = fetchPrescriptions;
export const prescriptionsReducer = prescriptionsSlice.reducer;
