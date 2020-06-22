import React, { useState, useRef, useEffect } from 'react';
import './Search.scss';
import { useDispatch, useSelector } from 'react-redux';
import { loadCityWeatherData } from '../../store';
import { getErrorMessage } from '../../store';
import Icon from '@material-ui/core/Icon';

export const Search = () => {
  const [inputValue, setInputValue] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [isError, setError] = useState<boolean>(false);
  const [isEdit, setEdit] = useState<boolean>(false);
  const loadError = useSelector(getErrorMessage);
  const dispatch = useDispatch();
  const ref: any = useRef(null);

  const addCityWeather = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setError(false);
    const newCity = inputValue.trim();

    if (newCity.length < 2) {
      setErrorMessage('At least 2 characters ');
      setError(true);

      return;
    }

    dispatch(loadCityWeatherData(newCity));

    if (loadError.errorMessage.length) {
      setError(true);
      setErrorMessage(loadError.errorMessage);
    }

    setInputValue('');
  }

  const handleInputValue = (target: string) => {
    if(isEdit) {
      setError(false);
      setErrorMessage('');
    }
    setInputValue(target);
  }

  const handleClickOutside = (e: MouseEvent) => {
    if (ref.current.contains(e.target)) {
      
      return;
    }

    setError(false);
    setErrorMessage('');
    setEdit(false);
  };

  useEffect(() => {
    if (isEdit) {
      ref.current.focus();
    }
  }, [isEdit]);

  useEffect(() => {
    document.addEventListener('click', handleClickOutside, true);

    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    };
  });

  return (
    <div className="search">
      <form className="search__form" onSubmit={addCityWeather}>
        <input
          value={inputValue}
          placeholder='INPUT A CITY'
          onChange={({ target }) => handleInputValue(target.value)}
          className={isError? 'search__input error': 'search__input'}
          onClick={() => setEdit(true)}
          ref={ref}
          autoComplete='off'
        />
        <span className="error__message">{errorMessage}</span>
        <button className="search__btn"
          type="submit"
        >
          <Icon className="icon">search</Icon>
        </button>
      </form>
    </div>
  )
}


