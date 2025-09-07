import axios from "axios";

export const apiCaller = async (method: string, url: string, data?: any, params?: any, headers?: any) => {
  try {
    const response = await axios({
      method,
      url,
      data,
      params,
      headers,
    });
    return response.data;
  } catch (error: any) {
    console.error("API call error:", error.message);
    throw error;
  }
};