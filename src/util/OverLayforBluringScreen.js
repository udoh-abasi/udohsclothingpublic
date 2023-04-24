import { addOrRemoveClassToBody } from "./addOrRemoveClassToBody";

export const OverLayforBlurringScreen = ({
  stateToLinkWithOverlay,
  setStateToLinkWithOverlay,
}) => {
  return (
    <div
      id="overLay"
      onClick={() => {
        setStateToLinkWithOverlay(false);
        addOrRemoveClassToBody();
      }}
      className={`bg-white top-0 left-0 right-0 bottom-0 ${
        !stateToLinkWithOverlay ? "hidden" : ""
      }`}
    ></div>
  );
};
