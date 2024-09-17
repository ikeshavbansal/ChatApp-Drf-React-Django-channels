import logo from './logo.svg';
import './App.css';
import {
  createBrowserRouter,
  RouterProvider,
  Route,
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

const router = createBrowserRouter([
  {path:'/',element:<Home/>},
  {path:"/server/:serverId/:channelId?", element:<Server/>},
  {path:"/explore/:categoryName", element:<Explore />},
  {path:'/login',element:<Login/>},
])

function App() {
  return (
    <>
    <AuthServiceProvider>
    <ThemeProvider theme={createMuiTheme}>
    <Provider store={store}>
    <RouterProvider router={router}/>
    </Provider>
    </ThemeProvider>
    </AuthServiceProvider>

    </>

  );
}

export default App;
