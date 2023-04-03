import { type FC, useState } from "react";
import {
  BsImage,
  BsSpeedometer2,
  BsFuelPump,
  BsCalendar2Date,
} from "react-icons/bs";
import { TbEngine } from "react-icons/tb";
import { GiGearStickPattern, GiPriceTag, GiShare } from "react-icons/gi";
import FsLightbox from "fslightbox-react";
import { motion, type Variants } from "framer-motion";
import { FacebookShareButton } from "react-share";
import type { Car } from "~/types";

export interface CarCardProps {
  value: Car;
}

export const CarCard: FC<CarCardProps> = (props) => {
  const {
    value: {
      id,
      make,
      model,
      description,
      year,
      mileage,
      engineSize,
      fuel,
      transmission,
      price,
      media,
    },
  } = props;

  const [toggler, setToggler] = useState(false);

  const formatPrice = new Intl.NumberFormat("en-DE", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(price);

  const formatMileage = new Intl.NumberFormat("en-DE", {}).format(mileage);

  return (
    <>
      <motion.div
        initial={"hide"}
        animate={"show"}
        variants={variants}
        className="card-compact card bg-white shadow"
      >
        <figure
          className="relative cursor-pointer"
          onClick={() => setToggler(!toggler)}
        >
          <img
            src={media[0]?.url}
            alt={`${make} ${model}`}
            className="h-full w-auto"
            draggable={"false"}
          />
          <div className="absolute right-4 top-3 flex items-center gap-2 rounded-lg bg-white px-3 py-2">
            {media.length}
            <BsImage />
          </div>
        </figure>
        <div className="card-body">
          <h3 className="card-title">
            {make} {model} <div className="badge px-1">NEW</div>
          </h3>
          <p className="mb-2">{description}</p>
          <ul className="rounded-box menu-horizontal w-full items-center justify-around bg-base-100">
            <li>
              <div className="flex flex-col items-center gap-2 px-2 py-3 md:flex-row">
                <BsCalendar2Date className="h-[18px] w-[18px]" />
                {year}
              </div>
            </li>
            <li>
              <div className="flex flex-col items-center gap-2 px-2 py-3 md:flex-row">
                <BsSpeedometer2 className="h-5 w-5" />
                {formatMileage}
              </div>
            </li>
            <li>
              <div className="flex flex-col items-center gap-2 px-2 py-3 md:flex-row">
                <TbEngine className="h-6 w-6" />
                {engineSize.toFixed(1)} L
              </div>
            </li>
            <li>
              <div className="flex flex-col items-center gap-2 px-2 py-3 capitalize md:flex-row">
                <BsFuelPump className="h-[18px] w-[18px]" />
                {fuel}
              </div>
            </li>
            <li>
              <div className="flex flex-col items-center gap-2 px-2 py-3 capitalize md:flex-row">
                <GiGearStickPattern className="h-5 w-5" />
                {transmission}
              </div>
            </li>
          </ul>
          <div className="mt-2">
            <div className="badge-ghost badge mb-1 mr-1 bg-base-100">ABS</div>

            <div className="badge-ghost badge mb-1 mr-1 bg-base-100">A/C</div>

            <div className="badge-ghost badge mb-1 mr-1 bg-base-100">
              Incalzire scaune
            </div>
            <div className="badge-ghost badge mb-1 mr-1 bg-base-100">
              Incalzire volan
            </div>
            <div className="badge-ghost badge mb-1 mr-1 bg-base-100">
              Sistem audio 7.1
            </div>
            <div className="badge-ghost badge mb-1 mr-1 bg-base-100">
              Navigation
            </div>
          </div>
          <div className="card-actions items-center justify-between">
            <div className="flex items-center gap-2 text-lg font-semibold text-[#d2678a]">
              {formatPrice}
              <GiPriceTag className="h-5 w-5" />
            </div>
            <FacebookShareButton
              url={`http://localhost:3000/product/${id}`}
              resetButtonStyle={true}
            >
              <div className="px-[4rem !important] btn-ghost btn gap-2">
                Share
                <GiShare className="h-5 w-5" />
              </div>
            </FacebookShareButton>
          </div>
        </div>
      </motion.div>

      <FsLightbox toggler={toggler} sources={media.map((item) => item.url)} />
    </>
  );
};

const variants: Variants = {
  hide: {
    opacity: 0,
    y: 150,
  },
  show: {
    opacity: 1,
    y: 0,
  },
};
