import {
  fetchServicesRequest,
  fetchServicesSuccess,
  fetchServicesFailure,
  removeServiceRequest,
  removeServiceFailure,
  removeServiceSuccess,
} from '../../../reducers/serviceListSlice.js';
import {
  addServiceRequest,
  addServiceSuccess,
  addServiceFailure,
  getServiceRequest,
  getServiceSuccess,
  getServiceFailure,
} from '../../../reducers/serviceAddSlice.js';
import links from './links';

export const fetchServices = async dispatch => {
  dispatch(fetchServicesRequest());
  try {
    const response = await fetch(links.api);
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    const data = await response.json();
    dispatch(fetchServicesSuccess(data));
  } catch (error) {
    dispatch(fetchServicesFailure('Произошла ошибка'));
  }
}

export const removeService = async (dispatch, id) => {
  dispatch(removeServiceRequest(id));
  try {
    const response = await fetch(`${links.api}/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error(response.statusText);
    }
  } catch (error) {
    dispatch(removeServiceFailure('Произошла ошибка', id));
  }
  dispatch(removeServiceSuccess(id));
  fetchServices(dispatch);
}

export const addService = async (dispatch, name, price, content, id = 0) => {
  dispatch(addServiceRequest());
  try {
    const response = await fetch(links.api, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, name, price: Number(price), content }),
    });
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    dispatch(addServiceSuccess());
  } catch (error) {
    dispatch(addServiceFailure('Произошла ошибка'));
  }
  fetchServices(dispatch);
}

export const getService = async (dispatch, id) => {
  dispatch(getServiceRequest());
  try {
    const response = await fetch(`${links.api}/${id}`);
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    const data = await response.json();
    dispatch(getServiceSuccess(data));
  } catch (error) {
    dispatch(getServiceFailure('Произошла ошибка'));
  }
}
