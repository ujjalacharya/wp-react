import axios from "axios";
import jwt from "jsonwebtoken";
import setAuthToken from "./setAuthToken";

import { JWT_SECRET } from "./config";

export const login = user => axios.post("/wp-json/jwt-auth/v1/token", user);

export const authenticate = (data, next) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("jwt", JSON.stringify(data.data));
    setAuthToken(isAuthenticated().token);
    next();
  }
};

export const isAuthenticated = () => {
  if (typeof window == "undefined") {
    return false;
  }

  let jsontoken = localStorage.getItem("jwt");

  let data;

  if (jsontoken) {
    let { token } = JSON.parse(jsontoken);
    jwt.verify(token, JWT_SECRET, async (err, decoded) => {
      if (err) {
        data = false;
        signout();
      } else {
        let parsedtoken = JSON.parse(jsontoken);
        data = { ...parsedtoken, user: { ...decoded } };
      }
    });
    return data;
  } else {
    return false;
  }
};

export const signout = () => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("jwt");
    return true;
  }
};

// Wordpress API requests

export const getAllPosts = () => axios.get("/wp-json/wp/v2/posts");

export const publishPost = body => axios.post("/wp-json/wp/v2/posts", body);
