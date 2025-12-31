import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import HostView from './pages/HostView';
import DisplayView from './pages/DisplayView';
import ErrorBoundary from './components/ErrorBoundary';

function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/host" replace />} />
          <Route path="/host" element={<HostView />} />
          <Route path="/display" element={<DisplayView />} />
          <Route path="*" element={<Navigate to="/host" replace />} />
        </Routes>
      </BrowserRouter>
    </ErrorBoundary>
  );
}

export default App;
