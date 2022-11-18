import Counter from 'pages/Counter'
import Main from 'pages/Main'
import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

const App = () => {
  return <BrowserRouter>
  <Routes>
    <Route path={'/'} element={<Main/>}/>
    <Route path={'/counter/:seq'} element={<Counter/>}/>
  </Routes>
  </BrowserRouter>
}

export default App