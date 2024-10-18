import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { NextUIProvider } from '@nextui-org/react'
import { createBrowserRouter } from 'react-router-dom'
import NotFoundPage from './pages/NotFoundPage.jsx'
import Login from './pages/Login.jsx'
import Register from './pages/Register.jsx'
import Dashboard from './pages/Dashboard.jsx'
import { RouterProvider } from 'react-router-dom'
import { Provider } from 'react-redux'
import { AuthProvider } from './context/AuthContext.jsx'
import store from './redux/store.js'
import ProtectedRoute from './components/ProtectedRoute.jsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <NotFoundPage/>,
    children: [
      {
        path: "/",
        element: <Login/>
      },
      {
        path: "/register",
        element: <Register/>
      },
      {
        path: "/dashboard",
        element: <ProtectedRoute><Dashboard/></ProtectedRoute>
      }
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <NextUIProvider>
      <Provider store={store}>
        <AuthProvider>
          <RouterProvider router={router}/>
        </AuthProvider>
      </Provider>
    </NextUIProvider>
  </StrictMode>,
)
