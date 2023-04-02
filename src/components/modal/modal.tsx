import type { FCC } from "~/types";

export interface ModalProps {
  id: string;
}

export const Modal: FCC<ModalProps> = (props) => {
  const { id, children } = props;

  return (
    <>
      <input type="checkbox" id={id} className="modal-toggle" />
      <div className="modal">
        <div className="modal-box">{children}</div>
      </div>
    </>
  );
};
