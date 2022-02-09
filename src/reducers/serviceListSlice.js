import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
  loading: false,
  error: null,
  deleting: [],
};

export const serviceListSlice = createSlice({
  name: 'serviceList',
  initialState,
  reducers: {
    fetchServicesRequest(state) {
      return { ...state, loading: true, error: null };
    },
    fetchServicesFailure(state, action) {
      return { ...state, loading: false, error: action.payload };
    },
    fetchServicesSuccess(state, action) {
      return { ...state, items: action.payload, loading: false, error: null };
    },
    removeServiceRequest(state, action) {
      return { ...state, error: null, deleting: [action.payload] };
    },
    removeServiceFailure(state, action) {
      return { ...state, error: action.payload.error, deleting: [] };
    },
    removeServiceSuccess(state) {
      return { ...state, error: null, deleting: [] };
    },
  },
});

export const {
  fetchServicesRequest,
  fetchServicesFailure,
  fetchServicesSuccess,
  removeServiceRequest,
  removeServiceFailure,
  removeServiceSuccess
} = serviceListSlice.actions;

export default serviceListSlice.reducer;
