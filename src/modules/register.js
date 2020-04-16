import axios from "axios";

const register = async (email, password, password_confirmation) => {
  try {
    const response = await axios.post("/api/v1/auth", {
      email: email,
      password: password,
      password_confirmation: password_confirmation
    });
    return { authenticated: true };
  } catch (error) {
    return { authenticated: false, message: error.response.data.errors };
  }
};

export { register }