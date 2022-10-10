import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { Login } from './pages/Login'
import { Notfound } from './pages/Not-found'
import { Signup } from './pages/Signup'
import * as ROUTES from './constants/Routes'
import { Dashboard } from './pages/Dashboard'
import { UserAuthListener } from './hooks/User-auth-listener'
import UserContext from './context/userContext'
import { Profile } from './pages/Profile'
// import { ProtectRoute } from './helpers/ProtectRoute'

function App() {
  const { user } = UserAuthListener()
  console.log(user)
  return (
    <UserContext.Provider value={{ user }} >
      <Router>
        <Routes>
          <Route path={ROUTES.Login} element={ user ? <Dashboard/> : <Login/>} />
          <Route path={ROUTES.Sign_Up} element={user ? <Dashboard/> : <Signup />} />
          <Route path={ROUTES.Not_Found} element={<Notfound />} />
          <Route path={ROUTES.Profile} element={ user ? <Profile/> : <Login/>} />
          <Route path={ROUTES.DASHBOARD} element={user ? <Dashboard/> : <Login/>} exact/>
        </Routes>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
