import { Landing } from './pages/Landing/LandingPage'
import { Analytics } from './pages/Analytics/AnalyticsPage'
import { AdminPanel } from './pages/Admin/AdminPanelPage'
import { Login } from './pages/Login/LoginPage'
import { Register } from './pages/Register/RegisterPage'
import { Profile } from './pages/Profile/ProfilePage'
import {
  createBrowserRouter,
  RouterProvider,
  Navigate
} from "react-router-dom";
import ScrollToHashElement from './components/utils/scrolltohash'

const router = createBrowserRouter([
  {
    path: "/",
    element: <Landing></Landing>
  },
  {
    path: "/stats",
    element: <Analytics></Analytics>
  },
  {
    path: "/admin-panel",
    element: localStorage.getItem("api_token") ? <AdminPanel></AdminPanel> : <Navigate to="/" replace />
  },
  {
    path: "/login",
    element: <Login></Login>,
  },
  {
    path: "/register",
    element: <Register></Register>
  },
  {
    path: "/profile",
    element: localStorage.getItem("api_token") ? <Profile></Profile> : <Navigate to="/" replace />,
  }
])

function App() {
  return (
    <>
      <RouterProvider router={router}>
      </RouterProvider>
    </>

  )
}

export default App
