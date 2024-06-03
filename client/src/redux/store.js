import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import employeeReducer from "./employeeSlice";
import customerReducer from "./customerSlice";
import motocycleReducer from "./motocycleSlice";
import categoryProductReducer from "./categoryProductSlice";
import productReducer from "./productSlice";
import categoryIssueReducer from "./categoryIssueSlice";
// import {
//   persistStore,
//   persistReducer,
//   FLUSH,
//   REHYDRATE,
//   PAUSE,
//   PERSIST,
//   PURGE,
//   REGISTER,
// } from "redux-persist";
// import storage from "redux-persist/lib/storage";

// const persistConfig = {
//   key: "root",
//   version: 1,
//   storage,
// };

// const rootReducer = combineReducers({
//   auth: authReducer,
//   account: accountReducer,
// });
// const persistedReducer = persistReducer(persistConfig, rootReducer);

// export const store = configureStore({
//   reducer: persistedReducer,
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware({
//       serializableCheck: {
//         ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
//       },
//     }),
// });

// export let persistor = persistStore(store);

export const store = configureStore({
  reducer: {
    auth: authReducer,
    employee: employeeReducer,
    customer: customerReducer,
    motocycle: motocycleReducer,
    categoryProduct: categoryProductReducer,
    product: productReducer,
    categoryIssue: categoryIssueReducer,
  },
});
