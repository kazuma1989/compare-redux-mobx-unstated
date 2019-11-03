import { Store, Dispatch as ReduxDispatch, Action } from "redux";
import { State } from "./State";

declare module "react-redux" {
  type Dispatch<A extends Action = Action> = ReduxDispatch<A>;

  function useDispatch<A extends Action = Action>(): Dispatch<A>;

  function useStore(): Store<State, Action>;

  function useSelector<TSelected>(
    selector: (state: State) => TSelected,
    equalityFn?: (left: TSelected, right: TSelected) => boolean
  ): TSelected;
}
