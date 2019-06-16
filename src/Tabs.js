import React from 'react';
import PropTypes from 'prop-types';
iport

export default function Tabs(props) {
  const {
    departure,
    arrival,
    loadData,
    imgDeparturesColor,
    imgArrivalsColor,
  } = props;
  return (
    <div>
      <button type="button" className={departure} data="departure" onClick={loadData}>
        <span>
          <img src="iconSvg.js" alt="icon" />
        </span>
        Departures
      </button>
      <button className={arrival} data="arrival" type="button" onClick={loadData}>
        <span>
          <svg
            data-v-2cc0fd12=""
            width="30px"
            height="18px"
            viewBox="0 0 40 28"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g data-v-2cc0fd12="" id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
              <g
                data-v-2cc0fd12=""
                id="Path-403"
                transform="translate(-1.000000, -1.000000)"
                fill={imgArrivalsColor}
                fillRule="nonzero"
              >
                <g data-v-2cc0fd12="" id="Group">
                  <path
                    data-v-2cc0fd12=""
                    d="M40.9190312,14.2925525 C40.731055,13.5210761 40.2396434,12.8581323 39.5561585,12.4539552 C38.8726735,12.0497781 38.0549837,11.9385881 37.2883912,12.1455827 L26.8096581,15.0218819 L13.1945082,2 L9.38678826,3.03046545 L17.5564785,17.5510243 L7.75204986,20.2442408 L3.86129243,17.1278331 L1,17.9171897 L4.59162231,24.3200818 L6.11030829,27.0112974 L9.26373268,26.1409043 L19.7414654,23.2656055 L28.3253427,20.9165445 L38.8070772,18.0372439 C40.4055057,17.5625364 41.3397513,15.9060318 40.9190312,14.2925525 Z"
                    id="Path_403"
                    transform="translate(21.009879, 14.505649) rotate(-4.012171) translate(-21.009879, -14.505649) "
                  />
                </g>
              </g>
            </g>
          </svg>
        </span>
        Arrivals
      </button>
    </div>
  );
}

Tabs.propTypes = {
  departure: PropTypes.string,
  arrival: PropTypes.string,
  loadData: PropTypes.func,
  imgDeparturesColor: PropTypes.string,
  imgArrivalsColor: PropTypes.string,
};

Tabs.defaultProps = {
  departure: '',
  arrival: '',
  loadData: () => console.log('loadData is undefined'),
  imgDeparturesColor: '',
  imgArrivalsColor: '',
};
