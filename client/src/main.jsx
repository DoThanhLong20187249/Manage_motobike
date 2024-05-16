import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./global.scss";
import { Provider } from "react-redux";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./page/Home.jsx";
import Products from "./page/Products.jsx";
import Users from "./page/Users.jsx";
import LoginForm from "./componets/loginForm/LoginForm.jsx";
import RegisterForm from "./componets/registerForm/RegisterForm.jsx";
import {  store } from "./redux/store.js";
import Profile from "./page/Profile/Profile.jsx";
import AddForm from "./componets/addForm/AddForm.jsx";
import SingleEmployee from "./componets/SinglePage/singleEmployee/SingleEmployee.jsx";
import Customer from "./page/Customer/Customer.jsx";
import SingleCustomer from "./componets/SinglePage/singleCustomer/SingleCustomer.jsx";
import Loading from "./componets/Loading/Loading.jsx";
import CustomerForm from "./componets/addForm/customerForm/CustomerForm.jsx";

// import { PersistGate } from "redux-persist/integration/react";
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/products",
        element: <Products />,
      },
      {
        path: "/employee",
        element: <Users />,
      },
      {
        path: "/employee/:id",
        element: <SingleEmployee/>,
      },
      {
        path:"/profile",
        element: <Profile/>
      },
      {
        path:"/employee/add",
        element: <AddForm/>
      },
      {
        path:"/customer",
        element: <Customer/>
      },
      {
        path:"/customer/:id",
        element: <SingleCustomer/>
      },
      {
        path:"/customer/add",
        element: <CustomerForm/>
      }
    ],
  },
  {
    path: "/login",
    element: <LoginForm />,
  },
  {
    path: "/register",
    element: <RegisterForm />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    {/* <PersistGate loading={null} persistor={persistor}> */}
      <RouterProvider router={router} />
    {/* </PersistGate> */}
  </Provider>
);
