// features/auth/sagas/auth.saga.ts
import { call, put, takeEvery, takeLatest } from "redux-saga/effects";
import {
  loginRequest,
  loginSuccess,
  loginFailure,
  logout,
  registerRequest,
  registerSuccess,
  registerFailure,
  checkAuthStatus,
  authStatusSuccess,
  authStatusFailure,
} from "../model/slice";
import { mockAuthService } from "../../../shared/api/mock/auth-service";
import { PayloadAction } from "@reduxjs/toolkit";
import { User } from "../model/types";
import { SagaGenerator } from "../../../shared/lib/redux/saga-types";

// Handle login
function* handleLogin(
  action: PayloadAction<{ email: string; password: string }>
): SagaGenerator<User> {
  try {
    const user = yield call(mockAuthService.login, action.payload);

    yield put(loginSuccess(user));
  } catch (error: any) {
    // Dispatch failure action with error message
    yield put(loginFailure(error.message || "Login failed"));
  }
}

// Handle logout
function* handleLogout(): SagaGenerator {
  try {
    yield call(mockAuthService.logout);
  } catch (error) {
    console.error("Logout error:", error);
  }
}

// Handle registration
function* handleRegister(
  action: PayloadAction<{ email: string; password: string; name: string }>
): SagaGenerator<User> {
  try {
    const user = yield call(mockAuthService.register, action.payload);
    yield put(registerSuccess(user));
  } catch (error: any) {
    yield put(registerFailure(error.message || "Registration failed"));
  }
}

// Handle auth status check
function* handleCheckAuthStatus(): SagaGenerator<User | null> {
  try {
    const user = yield call(mockAuthService.getCurrentUser);

    if (user) {
      yield put(authStatusSuccess(user));
    } else {
      yield put(authStatusFailure());
    }
  } catch (error) {
    yield put(authStatusFailure());
  }
}

// Watcher Saga
export function* authSagas(): SagaGenerator {
  yield takeEvery(loginRequest.type, handleLogin);
  yield takeLatest(logout.type, handleLogout);
  yield takeLatest(registerRequest.type, handleRegister);
  yield takeLatest(checkAuthStatus.type, handleCheckAuthStatus);
}
