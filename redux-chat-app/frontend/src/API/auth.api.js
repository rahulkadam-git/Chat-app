import api from "./api";

//register request
const registerApi = async (newUser) => {
  return await api.post("/auth/register", newUser);
};

//login request
const loginApi = async (userCredential) => {
  return await api.post(`/auth/login`, userCredential);
};

//Search request
const searchChat = async (search) => {
  return await api.get(`/allusers?search=${search}`)
}

//logout
const logoutApi = () => {
  localStorage.removeItem("user");
  return { msg: "Logout Successfully", user: {} };
};

export { registerApi, loginApi, logoutApi ,searchChat};
