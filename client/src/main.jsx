import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'

import App from './App.jsx'
import Home from './pages/Home'
import ProfileReminders from './pages/ProfileReminders.jsx'
//import SingleReminder from './pages/SingleReminder'
import Error from './pages/Error'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: '/reminders',
        element: <ProfileReminders />,
      },
     // {
     //   path: '/reminders/:reminderId',
     //   element: <SingleReminder />,
     // },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
)