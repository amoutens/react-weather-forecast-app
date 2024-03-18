import React from 'react'
export const Wrapper = ({name, temp, weather, dayOfWeek, photo}) => {
  return (
    <div className='wrapper'>
        <img className='photoMain' src={photo === '' ? '../images/03d.svg': `../images/${photo}.svg`} alt="ddd" />
        <div className='info'>
            <p>Today is {dayOfWeek}</p>
            <p className='city'>{name}</p>
            <p className='temp'>{temp === '' ? '' : ` Temperature: ${Math.round((temp.temp-273.15))}°C`} </p>
            <p>{weather === '' ? '' : `Weather: ${weather}`} </p>
        </div>
        
    </div>
  )
}
