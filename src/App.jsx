import { useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from 'react-query'
import LandingPage from './pages/LandingPage'
import OverviewPage from './pages/OverviewPage'
import LoginPage from './pages/LoginPage'
import LoginChecker from './utils/loginChecker'
import Layout from './Layout/Layout'
import PrivateRoute from './utils/PrivateRoute'

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
          <Route element={<LoginChecker />}>
            <Route path='/' element={<LandingPage />} />
            <Route path='/auth' element={<LoginPage />} />
            <Route element={<PrivateRoute />}>
              <Route element={<Layout />}>
                <Route path='/overview' element={<OverviewPage />} />
              </Route>
            </Route>
          </Route>
        </Routes>
      </Router>
    </QueryClientProvider>
  )
}

export default App
