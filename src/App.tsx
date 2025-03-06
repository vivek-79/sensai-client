import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom"
import Home from "./pages/protected/Home"
import RootLayout from "./pages/layout/RootLayout"
import AuthLayout from "./pages/layout/AuthLayout"
import AuthPage from "./pages/auth/AuthPage"
import OnBoarding from "./pages/protected/OnBoarding"
import Dashboad from "./pages/protected/Dashboad"
import InterViewPrep from "./pages/layout/InterViewOutlet"
import MockInterview from "./pages/protected/MockInterview"
import InterView from "./pages/protected/InterView"
import Resume from "./pages/protected/Resume"



const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<RootLayout />}>
        <Route index element={<Home />} />
        <Route path="/onboarding" element={<OnBoarding />} />
        <Route path="/dashboard" element={<Dashboad />} />
        <Route path="/interview" element={<InterViewPrep />}>
          <Route index element={<InterView />} />
          <Route path="mock" element={<MockInterview />} />
        </Route>
        <Route path="/resume" element={<Resume/>}/>
      </Route>

      //auth routes
      <Route path="/auth" element={<AuthLayout />}>
        <Route index element={<AuthPage />} />
      </Route>
    </>
  )
)

function App() {

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
