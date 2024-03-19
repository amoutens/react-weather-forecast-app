import React, { useEffect, useState } from 'react';

export const Input = ({handleSumbit, clueChange, clues, handleClueClick}) => {
  const firstFiveClues = clues.slice(0, 3);
  const renderedClues = firstFiveClues.map((city, index) => (
    <span key={index} onClick={() => handleClueClick(city)}>{`${city} ${index === 2 ? '' : ', '}`}</span>
  ));

  return (
    <div className='inputBox'>
      <input className='input' type='text' placeholder='Input your city' onKeyDown={(e) => handleSumbit(e)} onChange={(e) => clueChange(e)}/>
      <p>{clues.length !== 0 ? `Maybe you meant:` : ''} {renderedClues}</p>
    </div>
  );
};
