import React from 'react';
import './ObjectSelectorItem.scss';

export default ({ changeObject, flightObjects, state }) => {
  const objects = flightObjects.map((value, index) => {
    return <a href="#" className={"change-object" + (value.key === state.flightObject ? " active" : "")}
      onClick={changeObject.bind(null, value.key)}> {value.name} </a>
  });

  return (
    <div class="object-selector-list">
      {objects}
    </div>);
} 
