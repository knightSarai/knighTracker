import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { HomePage, LoginPage, RegisterPage, NotFoundPage } from '@pages/';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/auth/login" element={<LoginPage />} />
        <Route path="/auth/register" element={<RegisterPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
}

export default App;
