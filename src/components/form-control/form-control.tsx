import { type FCC } from "~/types";

export const FormControl: FCC<{ label: string }> = (props) => {
  const { label, children } = props;

  return (
    <div className="form-control w-full">
      <label className="label">
        <span className="label-text">{label}</span>
      </label>
      {children}
    </div>
  );
};
