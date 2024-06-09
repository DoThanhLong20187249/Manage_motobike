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
  addNewCategoryProductStart,
  addNewCategoryProductSuccess,
  addNewCategoryProductFailure,
} from "./categoryProductSlice";

import {
  getAllProductsStart,
  getAllProductsSuccess,
  getAllProductsFailure,
  addNewProductStart,
  addNewProductSuccess,
  addNewProductFailure,
  getSingleProductStart,
  getSingleProductSuccess,
  getSingleProductFailure,
  deleteProductSuccess,
} from "./productSlice";

import {
  getAllCategoryIssueStart,
  getAllCategoryIssueSuccess,
  getAllCategoryIssueFailure,
  getSingleCategoryIssueStart,
  getSingleCategoryIssueSuccess,
  getSingleCategoryIssueFailure,
  deleteCategoryIssueStart,
  deleteCategoryIssueSuccess,
  deleteCategoryIssueFailure,
} from "./categoryIssueSlice";

import {
  getAllReportStart,
  getAllReportSuccess,
  getAllReportFailure,
  getInformationByIDStart,
  getInformationByIDSuccess,
  getInformationByIDFailure,
  deleteCheckIssueStart,
  deleteCheckIssueSuccess,
  deleteCheckIssueFailure,
  getSingReportStart,
  getSingReportSuccess,
  getSingReportFailure,
} from "./checkIssueSlice";

import { toast } from "react-toastify";

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
  navigate,
  toast,
  setIsLoading
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
    toast.success("Tạo nhân viên thành công");
    setIsLoading(false);
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
  navigate,
  toast,
  setIsLoading
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
    toast.success("Cập nhật nhân viên thành công");
    setIsLoading(false);
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
    toast.success("Xóa nhân viên thành công");
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
  navigate,
  toast,
  setIsLoading
) => {
  dispatch(updateSingleCustomerStart());
  try {
    await axios.put(`http://localhost:3000/customer/${id}`, customer, {
      headers: {
        token: `Bearer ${accessToken}`,
      },
    });
    dispatch(updateSingleCustomerSuccess());
    toast.success("Cập nhật khách hàng thành công");
    setIsLoading(false);
    navigate("/customer");
  } catch (error) {
    dispatch(updateSingleCustomerFailure());
  }
};

export const deleteCustomer = async (id, accessToken, dispatch, toast) => {
  dispatch(deleteCustomerStart());
  try {
    await axios.delete(`http://localhost:3000/customer/${id}`, {
      headers: {
        token: `Bearer ${accessToken}`,
      },
    });
    dispatch(deleteCustomerSuccess(id));
    toast.success("Xóa khách hàng thành công");
  } catch (error) {
    dispatch(deleteCustomerFailure());
  }
};

export const addCustomer = async (
  customer,
  accessToken,
  dispatch,
  navigate,
  toast,
  setIsLoading
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
    toast.success("Tạo khách hàng thành công");
    setIsLoading(false);
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
  navigate,
  toast,
  setIsLoading
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
    toast.success("Cập nhật xe máy thành công");
    setIsLoading(false);
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
    toast.success("Xóa xe máy thành công");
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
  navigate,
  toast,
  setIsLoading
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
    toast.success("Cập nhật danh mục sản phẩm thành công");
    setIsLoading(false);
    navigate("/CategoryProduct");
  } catch (error) {
    console.log(error);
  }
};

export const addNewCategoryProduct = async (
  data,
  accessToken,
  dispatch,
  navigate,
  toast,
  setIsLoading
) => {
  dispatch(addNewCategoryProductStart());
  try {
    await axios.post("http://localhost:3000/categoryProduct/add", data, {
      headers: {
        token: `Bearer ${accessToken}`,
      },
    });
    dispatch(addNewCategoryProductSuccess());
    toast.success("Tạo danh mục sản phẩm thành công");
    setIsLoading(false);
    navigate("/CategoryProduct");
  } catch (error) {
    dispatch(addNewCategoryProductFailure());
  }
};

// Product CRUD

export const getAllProduct = async (shopId, accessToken, dispatch) => {
  dispatch(getAllProductsStart());
  try {
    const res = await axios.get(
      `http://localhost:3000/products?shop_id=${shopId}`,
      {
        headers: {
          token: `Bearer ${accessToken}`,
        },
      }
    );
    dispatch(getAllProductsSuccess(res.data));
  } catch (error) {
    console.log(error);
    dispatch(getAllProductsFailure());
  }
};

export const addNewProduct = async (
  data,
  accessToken,
  dispatch,
  navigate,
  toast,
  setIsLoading
) => {
  dispatch(addNewProductStart());
  try {
    await axios.post("http://localhost:3000/products/add", data, {
      headers: {
        token: `Bearer ${accessToken}`,
      },
    });
    dispatch(addNewProductSuccess());
    navigate("/products");
    toast.success("Tạo sản phẩm thành công");
    setIsLoading(false);
  } catch (error) {
    dispatch(addNewProductFailure());
  }
};

export const getProductById = async (id, accessToken, dispatch) => {
  dispatch(getSingleProductStart());
  try {
    const res = await axios.get(`http://localhost:3000/products/${id}`, {
      headers: {
        token: `Bearer ${accessToken}`,
      },
    });
    dispatch(getSingleProductSuccess(res.data));
  } catch (error) {
    dispatch(getSingleProductFailure());
  }
};

export const updateProductById = async (
  id,
  data,
  accessToken,
  navigate,
  toast,
  setIsLoading
) => {
  try {
    console.log(id);
    await axios.put(`http://localhost:3000/products/${id}`, data, {
      headers: {
        token: `Bearer ${accessToken}`,
      },
    });
    toast.success("Cập nhật sản phẩm thành công");
    setIsLoading(false);
    navigate("/products");
  } catch (error) {
    console.log(error);
  }
};

export const deleteProductById = async (id, accessToken, dispatch, toast) => {
  try {
    await axios.delete(`http://localhost:3000/products/${id}`, {
      headers: {
        token: `Bearer ${accessToken}`,
      },
    });
    toast.success("Xóa sản phẩm thành công");
    dispatch(deleteProductSuccess(id));
  } catch (error) {
    console.log(error);
  }
};

// API categoryIssue

export const getAllCategoryIssue = async (shopId, accessToken, dispatch) => {
  dispatch(getAllCategoryIssueStart());
  try {
    const res = await axios.get(
      `http://localhost:3000/categoryIssue?shop_id=${shopId}`,
      {
        headers: {
          token: `Bearer ${accessToken}`,
        },
      }
    );
    dispatch(getAllCategoryIssueSuccess(res.data));
  } catch (error) {
    dispatch(getAllCategoryIssueFailure());
  }
};

export const addNewCategoryIssue = async (
  data,
  accessToken,
  navigate,
  toast,
  setIsLoading
) => {
  try {
    await axios.post("http://localhost:3000/categoryIssue/add", data, {
      headers: {
        token: `Bearer ${accessToken}`,
      },
    });
    toast.success("Tạo danh mục sự cố thành công");
    setIsLoading(false);
    navigate("/categoryIssue");
  } catch (error) {
    console.log(error);
  }
};

export const getCategoryIssueById = async (id, accessToken, dispatch) => {
  dispatch(getSingleCategoryIssueStart());
  try {
    const res = await axios.get(`http://localhost:3000/categoryIssue/${id}`, {
      headers: {
        token: `Bearer ${accessToken}`,
      },
    });
    dispatch(getSingleCategoryIssueSuccess(res.data));
  } catch (error) {
    dispatch(getSingleCategoryIssueFailure());
  }
};

export const updateCategoryIssue = async (
  id,
  data,
  accessToken,
  navigate,
  toast,
  setIsLoading
) => {
  try {
    await axios.put(`http://localhost:3000/categoryIssue/${id}`, data, {
      headers: {
        token: `Bearer ${accessToken}`,
      },
    });
    toast.success("Cập nhật danh mục sự cố thành công");
    setIsLoading(false);
    navigate("/categoryIssue");
  } catch (error) {
    console.log(error);
  }
};

export const deleteCategoryIssue = async (id, accessToken, dispatch, toast) => {
  deleteCategoryIssueStart();
  try {
    await axios.delete(`http://localhost:3000/categoryIssue/${id}`, {
      headers: {
        token: `Bearer ${accessToken}`,
      },
    });
    toast.success("Xóa danh mục sự cố thành công");
    dispatch(deleteCategoryIssueSuccess(id));
  } catch (error) {
    dispatch(deleteCategoryIssueFailure());
  }
};

// API checkIssue CRUD

export const getAllReports = async (shopId, accessToken, dispatch) => {
  dispatch(getAllReportStart());
  try {
    const res = await axios.get(
      `http://localhost:3000/checkIssue?shop_id=${shopId}`,
      {
        headers: {
          token: `Bearer ${accessToken}`,
        },
      }
    );
    dispatch(getAllReportSuccess(res.data));
  } catch (error) {
    dispatch(getAllReportFailure());
  }
};

export const getInformationByID = async (
  motocycle_id,
  employee_id,
  accessToken,
  dispatch,
  setIsSearch
) => {
  dispatch(getInformationByIDStart());
  try {
    const res = await axios.get(
      `http://localhost:3000/checkIssue/add?motocycle_id=${motocycle_id}&employee_id=${employee_id}`,
      {
        headers: {
          token: `Bearer ${accessToken}`,
        },
      }
    );
    setIsSearch(false);
    dispatch(getInformationByIDSuccess(res.data));
  } catch (error) {
    toast.error("Không tìm thấy thông tin");
    dispatch(getInformationByIDFailure());
  }
};

export const addNewReport = async (
  data,
  accessToken,
  navigate,
  toast,
  setIsLoading
) => {
  try {
    await axios.post("http://localhost:3000/checkIssue/add", data, {
      headers: {
        token: `Bearer ${accessToken}`,
      },
    });
    console.log(data);
    toast.success("Tạo biên bản thành công");
    setIsLoading(false);
    navigate("/checkIssue");
  } catch (error) {
    console.log(error);
  }
};

export const deleteCheckIssueById = async (
  id,
  accessToken,
  dispatch,
  toast
) => {
  dispatch(deleteCheckIssueStart());
  try {
    await axios.delete(`http://localhost:3000/checkIssue/${id}`, {
      headers: {
        token: `Bearer ${accessToken}`,
      },
    });
    toast.success("Xóa biên bản thành công");
    dispatch(deleteCheckIssueSuccess(id));
  } catch (error) {
    dispatch(deleteCheckIssueFailure());
    console.log(error);
  }
};
export const getSingleReportById = async (id, accessToken, dispatch) => {
  dispatch(getSingReportStart());
  try {
    const res = await axios.get(`http://localhost:3000/checkIssue/${id}`, {
      headers: {
        token: `Bearer ${accessToken}`,
      },
    });
    dispatch(getSingReportSuccess(res.data));
  } catch (error) {
    dispatch(getSingReportFailure());
  }
};

export const updateSingleReportById = async (
  id,
  data,
  accessToken,
  navigate,
  toast,
  setIsLoading
) => {
  try {
    await axios.put(`http://localhost:3000/checkIssue/${id}`, data, {
      headers: {
        token: `Bearer ${accessToken}`,
      },
    });
    toast.success("Cập nhật biên bản thành công");
    setIsLoading(false);
    navigate("/checkIssue");
  } catch (error) {
    console.log(error);
  }
};

// CRUD API order 

export const addNewOrder = async( check_issue_id,data, accessToken, navigate, toast, setIsLoading) => {
  try {
    await axios.post(`http://localhost:3000/order/add/${check_issue_id}`, data, {
      headers: {
        token: `Bearer ${accessToken}`,
      },
    });
    toast.success("Tạo đơn hàng thành công");
    setIsLoading(false);
    navigate("/orders");
  } catch (error) {
    console.log(error);
  }
}
