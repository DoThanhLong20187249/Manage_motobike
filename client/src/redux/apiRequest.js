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
  getEmployeesStart,
  getEmployeesSuccess,
  getEmployeesFailure,
  addEmployeeStart,
  addEmployeeSuccess,
  addEmployeeFailure,
  getSingleEmployeeStart,
  getSingleEmployeeSuccess,
  getSingleEmployeeFailure,
  updateSingleEmployeeStart,
  updateSingleEmployeeSuccess,
  updateSingleEmployeeFailure,
} from "./employeeSlice";

export const LoginUser = async (user, dispatch, navigate) => {
  dispatch(loginStart());
  try {
    const res = await axios.post("http://localhost:3000/auth/login", user);
    console.log(res.data);
    dispatch(loginSuccess(res.data));
    navigate("/");
  } catch (error) {
    console.log(error);
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

export const getAllEmployee = async (shopId,accessToken, dispatch) => {
  dispatch(getEmployeesStart());
  try {
    const res = await axios.get(`http://127.0.0.1:3000/employee?shop_id=${shopId}`,{
      headers: {
        token: `Bearer ${accessToken}`,
      },
    });
    dispatch(getEmployeesSuccess(res.data));
  } catch (error) {
    dispatch(getEmployeesFailure());
  }
};

export const addEmployee = async (employee, accessToken, dispatch, navigate) => {
  dispatch(addEmployeeStart());
  try {
    const res = await axios.post("http://localhost:3000/employee/add", employee, {
      headers: {
        token: `Bearer ${accessToken}`,
      },
    });
    dispatch(addEmployeeSuccess(res.data));
    navigate("/employee");
  } catch (error) {
    dispatch(addEmployeeFailure(error.response.message));
  }
}

export const getEmployeeById = async (id, accessToken, dispatch,) => {
  dispatch(getSingleEmployeeStart());
  try {
    const res = await axios.get(`http://localhost:3000/employee/${id}`, {
      headers: {
        token: `Bearer ${accessToken}`,
      },
    });
    dispatch(getSingleEmployeeSuccess(res.data));
  } catch (error) {
    dispatch(getSingleEmployeeFailure(error.response.message));
  }

}

export const updateEmployee = async (id, employee, accessToken, dispatch, navigate) => {
  dispatch(updateSingleEmployeeStart());
  try {
    const res = await axios.put(`http://localhost:3000/employee/${id}`, employee, {
      headers: {
        token: `Bearer ${accessToken}`,
      },
    });
    dispatch(updateSingleEmployeeSuccess(res.data));
    navigate("/employee");
  } catch (error) {
    dispatch(updateSingleEmployeeFailure(error.response.message));
  }
}

