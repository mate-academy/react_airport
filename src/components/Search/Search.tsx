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
  const loadError = useSelector(getErrorMessage);
  const dispatch = useDispatch();
  const ref: any = useRef(null);


  const addCityWeather = (e: React.FormEvent) => {
    e.preventDefault();
    const newCity = inputValue.trim();

    if (newCity.length < 2) {
      setErrorMessage('At least 2 characters ');
      setError(true);

      return;
    }
    dispatch(loadCityWeatherData(newCity));

    setInputValue('');
  }

  useEffect(() => {
    if(loadError.errorMessage.length > 0) {
      setError(true);
      setErrorMessage(loadError.errorMessage);
    }
  },[loadError.errorMessage.length])


  const handleInputValue = (target: string) => {
    setInputValue(target);
  }

  const handleFocus = () => {
    setError(false);
    setErrorMessage('');
  };

  const handleClickOutside = (e: MouseEvent) => {
    if (ref.current.contains(e.target)) {

      return;
    }

    setError(false);
    setErrorMessage('');
  };

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
          ref={ref}
          autoComplete='off'

          onFocus={handleFocus}
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

