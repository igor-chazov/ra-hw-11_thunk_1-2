import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';
import './service-list.css'
import { fetchServices, removeService } from '../API/fetch';
import spinnerRed from "../../../img/Spiner-circle-red.svg";
import spinnerWhite from "../../../img/Spiner-circle-white.svg";

export default function ServiceList() {
  const { items, loading, error, deleting } = useSelector((state) => state.serviceList);
  const dispatch = useDispatch();
  let navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchServices());
  }, [dispatch]);

  const handleRemove = (id) => {
    return () => {
      dispatch(removeService(id));
    };
  };

  if (loading) {
    return (
      <div className="service-list">
        <div className="service-list__wrapper" >
          <div className="service-list__spinner">
            <img src={spinnerRed} alt="spinner" />
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="service-list">
        <div className="service-list__wrapper" >
          <div className="service-list__error">
            {error}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="service-list">
      <button className="btn btn__add" onClick={() => navigate(`/services/add`)} >Добавить</button>
      <ul className="service-list__list">
        {items.map((item) => (
          <li className="service-list__item" key={item.id}>
            <div className="service-list__container">
              {item.name}: {item.price.toLocaleString()} руб.
            </div>
            <div className="service-list__controls">
              <button className="btn btn__edit" onClick={() => navigate(`/services/${item.id}`)}><span className="_hidden" >Редактировать</span></button>{deleting.indexOf(item.id) !== -1 ? (
                <div className="service-list__btn-spinner">
                  <img className="service-list__btn-img" src={spinnerWhite} alt="spinner" />
                </div>
              ) : (
                <button className="btn btn__close" onClick={handleRemove(item.id)}><span className="_hidden" >Закрыть</span></button>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
