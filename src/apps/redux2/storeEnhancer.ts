import { useEffect } from "react";
import {
  Reducer,
  AnyAction,
  StoreEnhancer,
  StoreEnhancerStoreCreator,
  compose
} from "redux";
import { useStore } from "react-redux";
import { TState } from "./State";

export function useAppendReducer(reducer: TReducer) {
  const store: TStoreExt = useStore() as any;

  useEffect(() => store.appendReducer(reducer), [store]);
}

type TReducer = (state: TState, action: AnyAction) => TState;
export type TStoreExt = {
  appendReducer(additional: TReducer): () => void;
};

const appendableReducerStoreEnhancer: StoreEnhancer<TStoreExt> = (
  _createStore: StoreEnhancerStoreCreator<TStoreExt>
) => (reducer, preloadedState) => {
  const reducers: Reducer<unknown, AnyAction>[] = [reducer];
  const appendReducer: TStoreExt["appendReducer"] = additional => {
    reducers.push(additional);

    return function removeReducer(): void {
      const index = reducers.lastIndexOf(additional);
      if (index < 0) return;

      reducers.splice(index, 1);
    };
  };

  const store = _createStore<any, any>(
    (state, action) => reducers.reduce((s, r) => r(s, action), state),
    preloadedState
  );
  store.appendReducer = appendReducer;

  return store;
};

const reduxDevtoolsExtensionEnhancer: StoreEnhancerStoreCreator | undefined =
  (window as any).__REDUX_DEVTOOLS_EXTENSION__ &&
  (window as any).__REDUX_DEVTOOLS_EXTENSION__();

export const storeEnhancer = reduxDevtoolsExtensionEnhancer
  ? compose(
      appendableReducerStoreEnhancer,
      reduxDevtoolsExtensionEnhancer
    )
  : appendableReducerStoreEnhancer;
