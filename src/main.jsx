import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { AuthContextProvider } from './context/authContext.jsx'
import { ThemeProvider } from '@mui/material/styles'
import { createTheme } from '@mui/material/styles'
const customTheme = createTheme({
  palette: {
    primary: {
      main: '#000000', // Set the primary color to black
    },
  },
})
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthContextProvider>
      <ThemeProvider theme={customTheme}>
        <App />
      </ThemeProvider>
    </AuthContextProvider>
  </React.StrictMode>
)
