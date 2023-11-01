import { ReactElement } from "react";
import ReactDOM from "react-dom";
export enum EPortalTarget {
  MAIN_PORTAL = "main_portal",
  LIST_BTN_PORTAL = "list_btn_portal",
}

type TPortalProps = {
  target: EPortalTarget;
  children: ReactElement;
};
const Portal = ({ target, children }: TPortalProps) => {
  const domElem = document.getElementById(target) as Element;

  
  return domElem ? ReactDOM.createPortal(children, domElem) : null;
};

export default Portal;
