import React from 'react'
import { CssBaseline } from '@mui/material'
import { ThemeProvider } from '@emotion/react'
import customTheme from './constants/customTheme'
import ImageProcessPage from './pages/ImageProcessPage'

import './App.scss'

function App() {
  return (
    <ThemeProvider theme={customTheme}>
      <ImageProcessPage />
      <CssBaseline />
    </ThemeProvider>
  )
}

export default App
