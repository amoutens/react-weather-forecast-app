import React, { useEffect, useState } from 'react';

export const Input = ({handleSumbit, clueChange, clues, handleClueClick}) => {
  const firstThreeClues = clues.slice(0, 3);
  console.log(firstThreeClues)
  const renderedClues = firstThreeClues.map((city, index) => (
    <span key={index} onClick={() => handleClueClick(city)}>{`${city} ${( index === firstThreeClues.length -1) ? '' : ', '}`}</span>
  ));

  return (
    <div className='inputBox'>
      <input className='input' type='text' placeholder='Input your city' onKeyDown={(e) => handleSumbit(e)} onChange={(e) => clueChange(e)}/>
      <p>{clues.length !== 0 ? `Maybe you meant:` : ''} {renderedClues}</p>
    </div>
  );
};
