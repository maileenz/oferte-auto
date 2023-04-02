import type { FCC } from "~/types";

export interface ModalProps {
  id: string;
}

export const Modal: FCC<ModalProps> = ({ id, children }) => {
  return (
    <>
      <input type="checkbox" id={id} className="modal-toggle" />
      <div className="modal">
        <div className="modal-box">
          <h3 className="text-lg font-bold">
            Congratulations random Internet user!
          </h3>
          <p className="py-4">
            You've been selected for a chance to get one year of subscription to
            use Wikipedia for free!
          </p>
          <div className="modal-action">
            <label htmlFor={id} className="btn">
              Yay!
            </label>
          </div>
        </div>
      </div>
    </>
  );
};
