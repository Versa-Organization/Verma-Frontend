import {
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  Route,
  RouterProvider,
} from "react-router-dom";
import { HomePage, LoginPage, ProfilePage, NotFound } from "./pages";
import RootLayout from "./layouts/RootLayout";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { themeSettings } from "./theme";
import UserList from "./pages/UserList/UserList";
import ChannelDetailsIndex from "./pages/channel/channelDetails/ChannelDetailsIndex";
import ChannelContentIndex from "./pages/channel/channelContent/ChannelContentIndex";
import { initializeSocket } from "./utils/Socket";
import CommunicationIndex from "./pages/communication/CommunicationIndex";

const App = () => {
  const mode = useSelector((state) => state.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  const isAuth = Boolean(useSelector((state) => state.token));
  const user = useSelector((state) => state.token);
  initializeSocket();

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<RootLayout />}>
        <Route index element={<LoginPage />} />
        <Route
          path="/home"
          element={isAuth ? <HomePage /> : <Navigate to="/" />}
        />
        <Route
          path="/profile/:userId"
          element={isAuth ? <ProfilePage /> : <Navigate to="/" />}
        />
        <Route
          path="/message"
          element={isAuth ? <CommunicationIndex /> : <Navigate to="/" />}
        />
        <Route
          path="/userlist"
          element={isAuth ? <UserList /> : <Navigate to="/" />}
        />
        <Route
          path="/channel-details/:id"
          element={isAuth ? <ChannelDetailsIndex /> : <Navigate to="/" />}
        />
        <Route
          path="/channel"
          element={isAuth ? <ChannelContentIndex /> : <Navigate to="/" />}
        />

        <Route path="*" element={<NotFound />} />
      </Route>
    )
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <RouterProvider router={router} />
    </ThemeProvider>
  );
};

export default App;
