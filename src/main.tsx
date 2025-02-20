import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Index from './Index.tsx'
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Home from './routes/Home.tsx';
import Historic from './routes/Historic.tsx';
import Statistics from './routes/Statistics.tsx';
import About from './routes/About.tsx';

const Routes = createBrowserRouter([
  {
    path: '/',
    element: <Index />,
    children: [
      { path: '', element: <Home /> },
      { path: 'historic', element: <Historic /> },
      { path: 'Statistics', element: <Statistics /> },
      // { path: 'budget', element: <Budget /> },
      // { path: 'education', element: <Education /> },
      { path: 'about', element: <About /> },
    ]
  },
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={Routes} />
  </StrictMode>
)
