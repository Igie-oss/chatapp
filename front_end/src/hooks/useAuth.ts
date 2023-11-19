import { useAppStore } from "@/services/states/store";
const useAuth =  () => {
  const { token } = useAppStore();
  let isAuthenticated = false;
  if (token) {
    isAuthenticated = true;
  }
  return { isAuthenticated };
};

export default useAuth;