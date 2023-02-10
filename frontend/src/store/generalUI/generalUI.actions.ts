import { generalUIActions } from "./generalUI.slice";

const invalidAction = (msg: string) => {
  return (dispatch: any) => {
    dispatch(generalUIActions.invalidAction(msg));

    setTimeout(() => {
      dispatch(generalUIActions.resetShowAlert());
    }, 3000);
  };
};

export { invalidAction };
