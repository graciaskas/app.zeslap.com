import React from 'react'
import { Route, Routes } from 'react-router-dom'
import View from './View'
import Main from './Main'

export default function Index() {
  return (
    <Routes>
        <Route path='/' element={<Main />} />
        <Route path='/view' element={<View />} />
    </Routes>
  )
}