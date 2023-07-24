import { useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from 'react-query'
import LandingPage from './pages/LandingPage'
import OverviewPage from './pages/OverviewPage'
import LoginPage from './pages/LoginPage'
import LoginChecker from './utils/LoginChecker'
import Layout from './Layout/Layout'
import PrivateRoute from './utils/PrivateRoute'
import CreatePlan from './pages/CreatePlan'
import PersistLogin from './utils/PersistLogin'
import ViewPlan from './pages/ViewPlan'
import UpdatePlan from './pages/UpdatePlan'

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
          <Route element={<PersistLogin />}>
            <Route element={<LoginChecker />}>
              <Route path='/' element={<LandingPage />} />
              <Route path='/auth' element={<LoginPage />} />
            </Route>
            <Route element={<PrivateRoute />}>
              <Route element={<Layout />}>
                <Route path='/overview' element={<OverviewPage />} />
                <Route path='/plan' element={<CreatePlan />} />
                <Route path='/view/:id' element={<ViewPlan />} />
                <Route path='/update/:id' element={<UpdatePlan />} />
              </Route>
            </Route>
          </Route>
        </Routes>
      </Router>
    </QueryClientProvider>
  )
}

export default App
