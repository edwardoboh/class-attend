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
import LogProvider from './context/LogContext'
import { AssessmentProvider } from './context/Assessment'
import ErrorProvider from './context/ErrorContext'

function App() {
  return (
    <div className="App">
      <ErrorProvider>
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
                  <AssessmentProvider>
                    <LogProvider>
                      <Dashboard />
                    </LogProvider>
                  </AssessmentProvider>
                </PrivateRoute>
              </Switch>
            </Router>
          </AttendanceProvider>
        </StudentProvider>
      </LecturerProvider>
      </ErrorProvider>
    </div>
  );
}

export default App;
