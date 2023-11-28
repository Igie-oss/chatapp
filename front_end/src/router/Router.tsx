import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoutes from "./ProtectedRoutes";
import ErrorRouting from "@/components/shared/ErrorRouting";
import LoadingSpinner from "@/components/shared/loader/LoadingSpinner";
import Persist from "@/components/shared/Persist";
import RedirectComponent from "@/components/shared/RedirectComponent";
const Router = () => {
  const LandingScreen = lazy(() => import("@/pages/LandingScreen"));

  const LoginScreen = lazy(() => import("@/pages/LoginScreen"));

  const RegisterScreen = lazy(() => import("@/pages/RegisterScreen"));

  const ChatScreen = lazy(() => import("@/pages/ChatScreen"));

  const ChatBox = lazy(
    () =>
      import(
        "@/components/ChatBoardComponents/chatBoardComponents/ChatBoxContainer"
      )
  );

  return (
    <Suspense fallback={<LoadingSpinner />}>
      <BrowserRouter>
        <Routes>
          <Route path="*" element={<ErrorRouting />} />
          <Route element={<RedirectComponent />}>
            <Route path="/" element={<LandingScreen />} />
            <Route path="/login" element={<LoginScreen />} />
          </Route>
          <Route path="/register" element={<RegisterScreen />} />
          <Route element={<Persist />}>
            <Route element={<ProtectedRoutes />}>
              <Route path="/chat" element={<ChatScreen />}>
                <Route path="/chat/c/:channelId" element={<ChatBox />} />
              </Route>
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </Suspense>
  );
};

export default Router;
