import axios from "axios";
import {
  loginStart,
  loginSuccess,
  loginFailure,
  registerStart,
  registerSuccess,
  registerFailure,
} from "./authSlice";

import {
  getAccountsStart,
  getAccountsSuccess,
  getAccountsFailure,
} from "./accountSlice";

export const LoginUser = async (user, dispatch, navigate) => {
  dispatch(loginStart());
  try {
    const res = await axios.post("http://localhost:3000/auth/login", user);
    console.log(res.data);
    dispatch(loginSuccess(res.data));
    if (res.data.role === "admin") {
      navigate("/");
    } else if (res.data.role === "customer") {
      navigate("/hahah");
    }
  } catch (error) {
    dispatch(loginFailure());
  }
};

export const RegisterUser = async (user, dispatch, navigate) => {
  dispatch(registerStart());
  try {
    await axios.post("http://localhost:3000/auth/register", user);
    dispatch(registerSuccess());
    navigate("/login");
  } catch (error) {
    dispatch(registerFailure());
  }
};

export const getAllUsers = async (accessToken, dispatch) => {
  dispatch(getAccountsStart());
  try {
    const res = await axios.get("http://localhost:3000/account", {
      headers: {
        token: `Bearer ${accessToken}`,
      },
    });
    dispatch(getAccountsSuccess(res.data));
  } catch (error) {
    dispatch(getAccountsFailure());
  }
};
