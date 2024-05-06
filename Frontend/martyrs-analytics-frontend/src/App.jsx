import { Landing } from './pages/Landing/LandingPage'
import { Analytics } from './pages/Analytics/AnalyticsPage'
import { AdminPanel } from './pages/Admin/AdminPanelPage'
import { Login } from './pages/Login/LoginPage'
import { Register } from './pages/Register/RegisterPage'
import { Profile } from './pages/Profile/ProfilePage'
import { 
  createBrowserRouter,
  RouterProvider
} from "react-router-dom";

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
    element: <AdminPanel></AdminPanel>
  },
  {
    path: "/login",
    element: <Login></Login>
  },
  {
    path: "/register",
    element: <Register></Register>
  },
  {
    path: "/profile",
    element: <Profile></Profile>
  }
])

function App() {
  return (
    <RouterProvider router={router}></RouterProvider>
  )
}

export default App
