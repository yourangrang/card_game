import {lazy} from 'react'



import React from 'react'
const Game = lazy( () => import('./game') )



const App = () => {
  return (
    <>
      <Game />
    </>
  )
}

export default App