import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  item: {
    name: "",
    price: "",
    content: "",
  },
  loading: false,
  error: null,
  success: null,
};

export const serviceAddSlice = createSlice({
  name: 'serviceAdd',
  initialState,
  reducers: {
    addServiceRequest(state) {
      return { ...state, loading: true, error: null };
    },
    addServiceFailure(state, action) {
      return { ...state, loading: false, error: action.payload };
    },
    addServiceSuccess() {
      return { ...initialState };
    },
    getServiceRequest(state) {
      return { ...state, loading: true, error: null };
    },
    getServiceFailure(state, action) {
      return { ...state, loading: false, error: action.payload };
    },
    getServiceSuccess(state, action) {
      return {
        ...state,
        item: { name: action.payload.name, price: action.payload.price, content: action.payload.content },
        loading: false,
        error: null,
      };
    },
    changeServiceField(state, action) {
      const { name, value } = action.payload;
      return { ...state, item: { ...state.item, [name]: value } };
    },
    resetServiceFields() {
      return { ...initialState };
    },
  },
});

export const {
  addServiceRequest,
  addServiceFailure,
  addServiceSuccess,
  getServiceRequest,
  getServiceFailure,
  getServiceSuccess,
  changeServiceField,
  resetServiceFields,
} = serviceAddSlice.actions;

export default serviceAddSlice.reducer;