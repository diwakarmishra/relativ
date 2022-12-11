import { useEffect, useState } from 'react'
import AuthPage from './components/auth.js/auth';
import Dashboard from './views/dashboard';
import Session from './components/session/sessionDetail';
import EventCalendar from './components/calendar/calendar';
import AddNewCourse from './components/course/AddNewCourse';
import EditNewCourse from './components/course/EditNewCourse';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import interceptor  from './services/axios'
import ProtectedRoute from './components/protectedRoutes/ProtectedRoutes';

function App() {
  const [user, setUser] = useState(null);
  
  interceptor()
  return (
    <div>
    <Router>
        <Routes>
          <Route path="/dashboard" element={
            <ProtectedRoute
              redirectPath="/"
              isAllowed={
                true
            }>
              <Dashboard />
          </ProtectedRoute>
          } />
          <Route path="/" element={<AuthPage />} />
          <Route path="/session" element={<Session />} />
          <Route path="/calendar" element={<EventCalendar />} />
          <Route path="/addCourse" element={<AddNewCourse />} />
          <Route path="/editCourse/:id" element={<EditNewCourse />} />
        </Routes>
    </Router>
    </div>
  );
}

export default App;
