import { addOrRemoveClassToBody } from "./addOrRemoveClassToBody";

export const OverLayforBlurringScreen = ({
  stateToLinkWithOverlay,
  setStateToLinkWithOverlay,
}) => {
  return (
    <div
      onClick={() => {
        setStateToLinkWithOverlay(false);
        addOrRemoveClassToBody();
      }}
      className={`fixed bg-white top-0 left-0 right-0 bottom-0 opacity-70 z-[100] ${
        !stateToLinkWithOverlay && "hidden"
      }`}
    ></div>
  );
};
