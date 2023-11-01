import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoutes from "./ProtectedRoutes";
import ErrorRouting from "@/components/shared/ErrorRouting";
import LoadingSpinner from "@/components/shared/loader/LoadingSpinner";
import Persist from "@/components/shared/Persist";
import RedirectComponent from "@/components/shared/RedirectComponent";
const Router = () => {
  const HomePage = lazy(() => import("@/components/landingSection/HomePage"));
  const Login = lazy(() => import("@/components/loginSection/LoginForm"));
  const Register = lazy(
    () => import("@/components/registerSection/RegisterForm")
  );
  const MainContainer = lazy(
    () => import("@/components/mainSection/MainContainer")
  );

  const ChatBox = lazy(
    () => import("@/components/mainSection/chatBox/ChatBoxContainer")
  );

  return (
    <Suspense fallback={<LoadingSpinner />}>
      <BrowserRouter>
        <Routes>
          <Route path="*" element={<ErrorRouting />} />
          <Route
            path="/"
            element={
              <RedirectComponent>
                <HomePage />
              </RedirectComponent>
            }
          />
          <Route
            path="/login"
            element={
              <RedirectComponent>
                <Login />
              </RedirectComponent>
            }
          />
          <Route path="/register" element={<Register />} />
          <Route element={<Persist />}>
            <Route element={<ProtectedRoutes />}>
              <Route path="/chat" element={<MainContainer />}>
                <Route path="/chat/:channelId" element={<ChatBox />} />
              </Route>
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </Suspense>
  );
};

export default Router;
