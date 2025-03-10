import {lazy, Suspense} from 'react'
import { FiLoader } from "react-icons/fi";


import React from 'react'
const Game = lazy( () => import('./game') )



const App = () => {
  return (
    <Suspense fallback={ <div className='loading'>로딩중입니다<FiLoader className='FiLoader'/></div> }>
      <Game />
    </Suspense>
  )
}

export default App