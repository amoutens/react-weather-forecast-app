import React from 'react';

export const MiniWeather = ({ dayOfWeek, data, date }) => {
    
    const getDayData = () => {
        if (data && data.list && data.list.length > 0) {
            return data.list.find(el => el.dt_txt === `${date} 15:00:00`);
        }
        return null; 
    };

    const dateObj = data === '' ? '' : getDayData();

    return (
        <div className='miniWrapper'>
            <p>{dayOfWeek === '' ? '' : dayOfWeek}</p>
            {dateObj && dateObj.weather && dateObj.weather.length > 0 && (
                <img className='photoMini' src={`../images/${dateObj.weather[0].icon}.svg`} alt="Weather Icon" />
            )}
            <p className='temp-mini'>{dateObj && dateObj.main && `${Math.round((dateObj.main.temp - 273.15))}°C`}</p>
        </div>
    );
};
