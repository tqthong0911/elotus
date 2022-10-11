import axios from "axios";
import { API_KEY } from "./constant";

const getMessagesError = (error) => {
  return {
    success: false,
    error:
      error?.response?.data?.status_message ||
      error.messages ||
      "Something went wrong.",
  };
};

export const getVideos = async () => {
  try {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&language=en-US&page=1`
    );
    return { success: true, data };
  } catch (error) {
    return getMessagesError(error);
  }
};

export const getVideoById = async (id) => {
  try {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=en-US`
    );
    return { success: true, data };
  } catch (error) {
    return getMessagesError(error);
  }
};

export const getToken = async () => {
  try {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/authentication/token/new?api_key=${API_KEY}`
    );
    return { success: true, data };
  } catch (error) {
    return getMessagesError(error);
  }
};

export const getSession = async (request_token) => {
  try {
    const { data } = await axios.post(
      `https://api.themoviedb.org/3/authentication/session/new?api_key=${API_KEY}`,
      { request_token }
    );
    return { success: true, data };
  } catch (error) {
    return getMessagesError(error);
  }
};
