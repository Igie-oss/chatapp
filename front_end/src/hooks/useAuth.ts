import { useAppStore } from "@/features/store";
const useAuth =  () => {
  const { token } = useAppStore();
  let isAuthenticated = false;
  if (token) {
    isAuthenticated = true;
  }
  return { isAuthenticated };
};

export default useAuth;