import React from 'react'
import { MutatingDots } from 'react-loader-spinner'

export const Skeleton = () => {
  return (
    <div className='skeleton'><MutatingDots
  visible={true}
  height="100"
  width="100"
  color="#efd52b"
  secondaryColor="#cdb72c"
  radius="12.5"
  ariaLabel="mutating-dots-loading"
  wrapperStyle={{}}
  wrapperClass=""
  /></div>
  )
}
