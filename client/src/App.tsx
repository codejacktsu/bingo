import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import HostView from './pages/HostView';
import DisplayView from './pages/DisplayView';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/host" replace />} />
        <Route path="/host" element={<HostView />} />
        <Route path="/display" element={<DisplayView />} />
        <Route path="*" element={<Navigate to="/host" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
