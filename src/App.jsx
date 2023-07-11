import { useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from 'react-query'
import LandingPage from './pages/LandingPage'
import OverviewPage from './pages/OverviewPage'
import LoginPage from './pages/LoginPage'

function App() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        refetchOnMount: 'always',
      },
    },
  })

  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route path='/' element={<LandingPage />} />
          <Route path='/overview' element={<OverviewPage />} />
          <Route path='/auth' element={<LoginPage />} />
        </Routes>
      </Router>
    </QueryClientProvider>
  )
}

export default App
