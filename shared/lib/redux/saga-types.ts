// shared/lib/redux/saga-types.ts
import { Effect } from "redux-saga/effects";

export type SagaGenerator<T = any, R = any> = Generator<Effect, R, T>;
