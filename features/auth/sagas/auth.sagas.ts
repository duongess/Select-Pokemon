// features/auth/sagas/auth.saga.ts
import { call, put, takeEvery } from "redux-saga/effects";
import {
  connectWalletRequest,
  connectWalletSuccess,
  connectWalletFailure,
  disconnectWallet,
} from "../model/slice";
import { PayloadAction } from "@reduxjs/toolkit";
import { User } from "../model/types";
import { Connector } from "wagmi";
import { mockAuthService } from "@/shared/api/mock/auth-service";

// 📦 Login wallet
function* handleConnectWallet(action: PayloadAction<{ address: string; connector: Connector }>) {
  try {
    const { address, connector } = action.payload;
    const user: User = yield call(mockAuthService.login, { address });

    yield put(connectWalletSuccess({ user, connector }));
  } catch (error: any) {
    yield put(connectWalletFailure(error.message || "Failed to connect wallet"));
  }
}

// ❌ Disconnect
function* handleDisconnectWallet() {
  try {
    yield call(mockAuthService.logout);
    // State sẽ được reset trong reducer, không cần dispatch gì nữa
  } catch (error) {
    console.error("Failed to disconnect wallet", error);
  }
}

// 🧠 Export watcher
export function* authSagas() {
  yield takeEvery(connectWalletRequest.type, handleConnectWallet);
  yield takeEvery(disconnectWallet.type, handleDisconnectWallet);
}
