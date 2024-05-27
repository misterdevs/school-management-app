import axios from "axios";

const api = axios.create({
  baseURL: "https://school-management-be.onrender.com",
});

export const getSchools = async () => {
  const response = await api.get("/schools");
  return response.data;
};

export const createSchool = async (school) => {
  const response = await api.post("/school", school);
  return response.data;
};
export const deleteSchool = async (schoolId) => {
  const response = await api.delete("/school", schoolId);
  return response.data;
};
