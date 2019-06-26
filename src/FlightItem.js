import React from 'react';
import './flight-item.scss';

export default ({ data }) => {
    return <tr className="flight-item">
        <td className="flight-item__terminal">{data.term}</td>
        <td className="flight-item__localTime">{new Date(data.timeDepShedule ? data.timeDepShedule : data.timeArrShedule).toTimeString().slice(0, 5)}</td>
        <td className="flight-item__destination">{data["airportToID.name_en"] ? data["airportToID.name_en"] : data["airportFromID.city_en"]}</td>
        <td className="flight-item__status">{data.status}</td>
        <td className="flight-item__airline-list">
            {data.codeShareData.map((value) => {
                return (<div class="flight-item__airline-list-airline">
                    <img className="flight-item__airline-list-airline-logo" src={value.airline.en.logoSmallName} alt="logo"></img>
                    {value.airline.en.name}
                </div>)
            })}
        </td>
        <td className="flight-item__flight-field">{data.codeShareData[0].codeShare}</td>
    </tr>
};
