import type { FC } from "react";

export const Hero: FC = () => {
  return (
    <div
      className="hero min-h-screen"
      style={{
        backgroundImage: `url("https://daisyui.com/images/stock/photo-1507358522600-9f71e620c44e.jpg")`,
      }}
    >
      <div className="hero-overlay bg-opacity-60"></div>
      <div className="hero-content text-center">
        <div className="max-w-md">
          <div className="card-compact card w-96 bg-white p-4 shadow-lg">
            <button className="btn-block btn">Show results</button>
          </div>
        </div>
      </div>
    </div>
  );
};
