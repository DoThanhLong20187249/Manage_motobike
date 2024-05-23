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
  deleteEmployeeStart,
  deleteEmployeeSuccess,
  deleteEmployeeFailure,
} from "./employeeSlice";

import {
  getCustomersStart,
  getCustomersSuccess,
  getCustomersFailure,
  getSingleCustomerStart,
  getSingleCustomerSuccess,
  getSingleCustomerFailure,
  updateSingleCustomerStart,
  updateSingleCustomerSuccess,
  updateSingleCustomerFailure,
  deleteCustomerStart,
  deleteCustomerSuccess,
  deleteCustomerFailure,
  addCustomerStart,
  addCustomerSuccess,
  addCustomerFailure,
} from "./customerSlice";

import {
  getMotocyclesStart,
  getMotocyclesSuccess,
  getMotocyclesFailure,
  getSingleMotocycleStart,
  getSingleMotocycleSuccess,
  getSingleMotocycleFailure,
  updateMotocycleStart,
  updateMotocycleSuccess,
  updateMotocycleFailure,
  deleteMotocycleStart,
  deleteMotocycleSuccess,
  deleteMotocycleFailure,
} from "./motocycleSlice";

import {
  getCategoryProductsStart,
  getCategoryProductsSuccess,
  getCategoryProductsFailure,
  getSingleCategoryProductStart,
  getSingleCategoryProductSuccess,
  getSingleCategoryProductFailure,
} from "./categoryProductSlice";
//login
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
//register
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

// API employee
export const getAllEmployee = async (shopId, accessToken, dispatch) => {
  dispatch(getEmployeesStart());
  try {
    const res = await axios.get(
      `http://127.0.0.1:3000/employee?shop_id=${shopId}`,
      {
        headers: {
          token: `Bearer ${accessToken}`,
        },
      }
    );
    dispatch(getEmployeesSuccess(res.data));
  } catch (error) {
    dispatch(getEmployeesFailure());
  }
};

export const addEmployee = async (
  employee,
  accessToken,
  dispatch,
  navigate
) => {
  dispatch(addEmployeeStart());
  try {
    const res = await axios.post(
      "http://localhost:3000/employee/add",
      employee,
      {
        headers: {
          token: `Bearer ${accessToken}`,
        },
      }
    );
    dispatch(addEmployeeSuccess(res.data));
    navigate("/employee");
  } catch (error) {
    dispatch(addEmployeeFailure(error.response.message));
  }
};

export const getEmployeeById = async (id, accessToken, dispatch) => {
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
};

export const updateEmployee = async (
  id,
  employee,
  accessToken,
  dispatch,
  navigate
) => {
  dispatch(updateSingleEmployeeStart());
  try {
    const res = await axios.put(
      `http://localhost:3000/employee/${id}`,
      employee,
      {
        headers: {
          token: `Bearer ${accessToken}`,
        },
      }
    );
    dispatch(updateSingleEmployeeSuccess(res.data));
    navigate("/employee");
  } catch (error) {
    dispatch(updateSingleEmployeeFailure(error.response.message));
  }
};

export const deleteEmployee = async (id, accessToken, dispatch) => {
  dispatch(deleteEmployeeStart());
  try {
    await axios.delete(`http://localhost:3000/employee/${id}`, {
      headers: {
        token: `Bearer ${accessToken}`,
      },
    });
    dispatch(deleteEmployeeSuccess(id));
  } catch (error) {
    dispatch(deleteEmployeeFailure());
  }
};

// API customer
export const getAllCustomers = async (shopId, accessToken, dispatch) => {
  dispatch(getCustomersStart());
  try {
    const res = await axios.get(
      `http://localhost:3000/customer?shop_id=${shopId}`,
      {
        headers: {
          token: `Bearer ${accessToken}`,
        },
      }
    );
    dispatch(getCustomersSuccess(res.data));
  } catch (error) {
    dispatch(getCustomersFailure());
  }
};

export const getCustomerById = async (id, accessToken, dispatch) => {
  dispatch(getSingleCustomerStart());
  try {
    const res = await axios.get(`http://localhost:3000/customer/${id}`, {
      headers: {
        token: `Bearer ${accessToken}`,
      },
    });
    dispatch(getSingleCustomerSuccess(res.data));
  } catch (error) {
    console.log(error);
    dispatch(getSingleCustomerFailure());
  }
};

export const updateCustomer = async (
  id,
  customer,
  accessToken,
  dispatch,
  navigate
) => {
  dispatch(updateSingleCustomerStart());
  try {
    await axios.put(`http://localhost:3000/customer/${id}`, customer, {
      headers: {
        token: `Bearer ${accessToken}`,
      },
    });
    dispatch(updateSingleCustomerSuccess());
    navigate("/customer");
  } catch (error) {
    dispatch(updateSingleCustomerFailure());
  }
};

export const deleteCustomer = async (id, accessToken, dispatch) => {
  dispatch(deleteCustomerStart());
  try {
    await axios.delete(`http://localhost:3000/customer/${id}`, {
      headers: {
        token: `Bearer ${accessToken}`,
      },
    });
    dispatch(deleteCustomerSuccess(id));
  } catch (error) {
    dispatch(deleteCustomerFailure());
  }
};

export const addCustomer = async (
  customer,
  accessToken,
  dispatch,
  navigate
) => {
  dispatch(addCustomerStart());
  try {
    const res = await axios.post(
      "http://localhost:3000/customer/add",
      customer,
      {
        headers: {
          token: `Bearer ${accessToken}`,
        },
      }
    );
    dispatch(addCustomerSuccess(res.data));
    navigate("/customer");
  } catch (error) {
    dispatch(addCustomerFailure());
  }
};

// API motocycle

export const getAllMotocycles = async (shopId, accessToken, dispatch) => {
  dispatch(getMotocyclesStart());
  try {
    const res = await axios.get(
      `http://localhost:3000/motocycle?shop_id=${shopId}`,
      {
        headers: {
          token: `Bearer ${accessToken}`,
        },
      }
    );
    dispatch(getMotocyclesSuccess(res.data));
  } catch (error) {
    dispatch(getMotocyclesFailure());
  }
};

export const getMotocycleById = async (id, accessToken, dispatch) => {
  dispatch(getSingleMotocycleStart());
  try {
    const res = await axios.get(`http://localhost:3000/motocycle/${id}`, {
      headers: {
        token: `Bearer ${accessToken}`,
      },
    });
    dispatch(getSingleMotocycleSuccess(res.data));
  } catch (error) {
    dispatch(getSingleMotocycleFailure());
  }
};

export const updateMotocycle = async (
  id,
  motocycle,
  accessToken,
  dispatch,
  navigate
) => {
  dispatch(updateMotocycleStart());
  try {
    const res = await axios.put(
      `http://localhost:3000/motocycle/${id}`,
      motocycle,
      {
        headers: {
          token: `Bearer ${accessToken}`,
        },
      }
    );
    dispatch(updateMotocycleSuccess(res.data));
    navigate("/motocycle");
  } catch (error) {
    console.log(error);
    dispatch(updateMotocycleFailure());
  }
};

export const deleteMotocycle = async (id, accessToken, dispatch) => {
  dispatch(deleteMotocycleStart());
  try {
    await axios.delete(`http://localhost:3000/motocycle/${id}`, {
      headers: {
        token: `Bearer ${accessToken}`,
      },
    });
    dispatch(deleteMotocycleSuccess(id));
  } catch (error) {
    dispatch(deleteMotocycleFailure());
  }
};

// API categoryProduct

export const getAllCategoryProduct = async (shopId, accessToken, dispatch) => {
  dispatch(getCategoryProductsStart());
  try {
    const res = await axios.get(
      `http://localhost:3000/categoryProduct?shop_id=${shopId}`,
      {
        headers: {
          token: `Bearer ${accessToken}`,
        },
      }
    );
    dispatch(getCategoryProductsSuccess(res.data));
  } catch (error) {
    dispatch(getCategoryProductsFailure());
  }
};

export const getCategoryProductById = async (id, accessToken, dispatch) => {
  dispatch(getSingleCategoryProductStart());
  try {
    const res = await axios.get(`http://localhost:3000/categoryProduct/${id}`, {
      headers: {
        token: `Bearer ${accessToken}`,
      },
    });
    dispatch(getSingleCategoryProductSuccess(res.data));
  } catch (error) {
    console.log(error);
    dispatch(getSingleCategoryProductFailure());
  }
};

export const updateCategoryProduct = async (
  id,
  accessToken,
  categoryProduct,
  navigate
) => {
  try {
    await axios.put(
      `http://localhost:3000/categoryProduct/${id}`,
      categoryProduct,
      {
        headers: {
          token: `Bearer ${accessToken}`,
        },
      }
    );
    navigate("/CategoryProduct");
  } catch (error) {
    console.log(error);
  }
};
