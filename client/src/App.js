import './App.css';
import Dashboard from './components/Dashboard';
import {BrowserRouter as Router, Route, Redirect, Switch} from 'react-router-dom'
import PrivateRoute from './components/routes/PrivateRoute'
import PublicRoute from './components/routes/PublicRoute'
import SignIn from './components/auth/SignIn'
import SignUp from './components/auth/SignUp'


import { StudentProvider } from './context/StudentContext'
import { AttendanceProvider } from './context/AttendanceContext'
import { LecturerProvider } from './context/LecturerContext'

function App() {
  return (
    <div className="App">
      <LecturerProvider>
        <StudentProvider>
          <AttendanceProvider>
            <Router>
              <Switch>
                <Route exact path="/">
                    <Redirect to="/signin" />
                </Route>
                <PublicRoute exact path="/signin">
                  <SignIn />
                </PublicRoute>
                <PublicRoute path="/signup">
                  <SignUp />
                </PublicRoute>
                <PrivateRoute path="/dashboard">
                  <Dashboard />
                </PrivateRoute>
              </Switch>
            </Router>
          </AttendanceProvider>
        </StudentProvider>
      </LecturerProvider>
    </div>
  );
}

export default App;
