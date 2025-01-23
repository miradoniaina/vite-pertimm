import axios from "@/axios";

export const loginApi = async (user: any) => {
  const response = await axios.post("/api/v1.1/auth/login/", user);
  return response.data;
};
