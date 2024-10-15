import logo from './logo.svg';
import './App.css';
import {
  createBrowserRouter,
  RouterProvider,
  BrowserRouter,
  Route,
  Routes,
  Link,
} from "react-router-dom";
import Home from './pages/Home';
import {ThemeProvider} from "@emotion/react"
import createMuiTheme from './theme/theme.tsx';
import {Provider} from 'react-redux'
import store from './store';
import Explore from './pages/Explore';
import Server from './pages/Server.tsx';
import Login from './pages/Login.tsx';
import { AuthServiceProvider } from "./context/AuthContext.js";
import TestLogin from './pages/TestLogin';
import ProtectedRoute from './services/ProtectedRoute';
import Register from './pages/Register.tsx';

const router = createBrowserRouter([
  {path:'/',element:<Home/>},
  {path:"/server/:serverId/:channelId?", element:<ProtectedRoute>
  <Server/>
  </ProtectedRoute>},
  {path:"/explore/:categoryName", element:<Explore />},
  {path:'/login',element:<Login/>},
  {path:'/testlogin',element:
    <ProtectedRoute>
    <TestLogin/>
    </ProtectedRoute>
  },

])

function App() {
  return (
    <BrowserRouter>
    <AuthServiceProvider>
    
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/server/:serverId/:channelId?"
            element={
              <ProtectedRoute>
                <Server />
              </ProtectedRoute>
            }
          />
          <Route path="/explore/:categoryName" element={<Explore />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/testlogin"
            element={
              <ProtectedRoute>
                <TestLogin />
              </ProtectedRoute>
            }
          />
        </Routes>
     
    </AuthServiceProvider>
  </BrowserRouter>

  );
}

export default App;
