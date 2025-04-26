import { QueryClientProvider } from '@tanstack/react-query';
import { Link, Router } from 'react-baklava-router';

import queryClient from './queryClient';
import routes from './routes';
import './App.css';

export default function App() {
  return (
    <Router routes={routes}>
      {(jsx) => (
        <QueryClientProvider client={queryClient}>
          <div className="layout">
            <nav>
              <Link to="/">Home</Link>
              <Link to="/about">About</Link>
              <Link to="/me">My Profile</Link>
              <Link to="/me/posts">My Posts</Link>
              <Link to="/some/undefined/path">404</Link>
            </nav>
            <main>{jsx}</main>
          </div>
        </QueryClientProvider>
      )}
    </Router>
  );
}
