import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from 'react-router-dom';
import './service-add.css'
import { changeServiceField, resetServiceFields } from '../../../reducers/serviceAddSlice';
import { addService, getService } from '../API/fetch';
import spinnerWhite from "../../../img/Spiner-circle-white.svg";

export default function ServiceAdd() {
  let { item, loading, error } = useSelector((state) => state.serviceAdd);
  const dispatch = useDispatch();
  let navigate = useNavigate();
  let params = useParams();
  const { id } = params;

  useEffect(() => {
    if (id !== "add") {
      getService(dispatch, id);
    }
  }, [dispatch, id]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    dispatch(changeServiceField({ name, value }));
  };

  const handleReset = () => {
    dispatch(resetServiceFields());
    navigate("/services");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    await addService(
      dispatch,
      item.name,
      item.price,
      item.content,
      id === "add" ? 0 : Number(id)
    );
    navigate("/services");
  };

  if (error) {
    return (
      <div className="service-add">
        <div className="service-add__error">{error}
          <button className="btn btn__back" type="button" onClick={handleReset}>Вернуться</button>
        </div>
      </div>
    );
  }

  return (
    <form className="service-add" onSubmit={handleSubmit}>
      <div className="service-add__wrapper">
        <label htmlFor="name" className="service-add__label">Название</label>
        <input className="service-add__input" id="name" name="name" onChange={handleChange} value={item.name}
          disabled={loading ? true : false} required />
        <label htmlFor="price">Стоимость</label>
        <input className="service-add__input" id="price" name="price" onChange={handleChange} value={item.price}
          disabled={loading ? true : false} required pattern="(\d)+(\.(\d){2})?" />
        <label htmlFor="content">Описание</label>
        <input className="service-add__input" id="content" name="content" onChange={handleChange} value={item.content}
          disabled={loading ? true : false} />
        <div className="service-add__controls">
          <button className="btn btn__cancel" type="button" onClick={handleReset}>Отмена</button>
          {loading ? (
            <div className="service-add__btn-spinner"><img src={spinnerWhite} alt="spinner" /></div>
          ) : (
            <button className="btn btn__save" type="submit">Сохранить</button>
          )}
        </div>
      </div>
    </form>
  );
}
