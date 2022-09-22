import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { Login } from './pages/Login'
import { Notfound } from './pages/Not-found'
import {Signup} from './pages/Signup'
import * as ROUTES from './constants/Routes'
import { Dashboard } from './pages/Dashboard' 
import {UserAuthListener} from './hooks/User-auth-listener'
import UserContext from './context/userContext'
function App() {
  const {user} = UserAuthListener()
  return (
    <UserContext.Provider value={{ user }} >
      <Router>
        <Routes>
          <Route path={ROUTES.Login} element={<Login />} />
          <Route path={ROUTES.Sign_Up} element={<Signup />} />
          <Route path={ROUTES.Not_Found} element={<Notfound />} />
          <Route path={ROUTES.DASHBOARD} element={<Dashboard />} />
        </Routes>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
