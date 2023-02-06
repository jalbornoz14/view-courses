import { serviceApi } from "@/services/axios";

class AuthService {
  async login(credentials) {
    try {
      const { data, status } = await serviceApi.post(
        "/auth/login",
        credentials
      );
      return { data, status };
    } catch (error) {
      return { status: error.response.status, data: error.response.data };
    }
  }
}

export default new AuthService();
