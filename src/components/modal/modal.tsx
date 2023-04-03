import { createPortal } from "react-dom";
import type { FCC } from "~/types";

export interface ModalProps {
  id: string;
}

export const Modal: FCC<ModalProps> = (props) => {
  const { id, children } = props;

  const portal: HTMLElement = document.createElement("div");

  return createPortal(
    <>
      <input type="checkbox" id={id} className="modal-toggle" />
      <div className="modal">
        <div className="modal-box">{children}</div>
      </div>
    </>,
    portal
  );
};
