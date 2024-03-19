import React from 'react'

export const Input = ({handleSumbit, clueChange, clues}) => {
  return (
    <div className='inputBox'>
        <input className='input' type='text' placeholder='Input your city' onKeyDown={(e) => handleSumbit(e)} onChange={(e) => clueChange(e)}/>
    <p>{clues}</p>
  </div>
    )
}
