import { useEffect } from 'react';

import { useDispatch } from 'react-redux';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HomePage, LoginPage, RegisterPage, NotFoundPage } from '@pages/';
import ProtectedRoutes from '@components/ProtectedRoute';
import { getUser } from '@state/';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);

  return (
    <Router>
      <Routes>
        <Route element={<ProtectedRoutes />}>
          <Route path="/" element={<HomePage />} />
        </Route>
        <Route path="/auth/login" element={<LoginPage />} />
        <Route path="/auth/register" element={<RegisterPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
}

export default App;
