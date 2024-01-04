// router.js
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { AuthProvider } from "./providers/AuthProvider";
import NewsFeed from "./pages/NewsFeed";
import Profile from "./pages/ProfilePage";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/"
          element={
            <AuthProvider>
              <NewsFeed />
            </AuthProvider>
          }
        />
         <Route
          path="/profile"
          element={
            <AuthProvider>
              <Profile />
            </AuthProvider>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
