import { Store, Dispatch as ReduxDispatch, Action } from "redux";
import { TState } from "./State";

declare module "react-redux" {
  type Dispatch<A extends Action = Action> = ReduxDispatch<A>;

  function useDispatch<A extends Action = Action>(): Dispatch<A>;

  function useStore(): Store<TState, Action>;

  function useSelector<TSelected>(
    selector: (state: TState) => TSelected,
    equalityFn?: (left: TSelected, right: TSelected) => boolean
  ): TSelected;
}
