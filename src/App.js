import firebaseContext from './context/firebase'
import { app, db } from './lib/firebase'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { Login } from './pages/Login'
import * as ROUTES from './constants/Routes'
// const Login = lazy(() => import('./pages/Login'))
function App() {

  return (
    <firebaseContext.Provider value={{ app, db }} >
      hello world
      {/* <Suspense fallback = {<p>Loading ... </p>}> */}
      <Router>
        <Routes>
          <Route path={ROUTES.Login} element={<Login />} />
        </Routes>
      </Router>
      {/* </Suspense> */}


    </firebaseContext.Provider>
  );
}

export default App;
