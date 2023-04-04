import { motion } from "framer-motion";
import Link from "next/link";
import type { FC } from "react";
import { GiCarWheel } from "react-icons/gi";
import { TiPhone } from "react-icons/ti";
import { env } from "~/env.mjs";

export const Navbar: FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      className="navbar sticky top-0 z-10 bg-white shadow"
    >
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn-ghost btn-circle btn">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h7"
              />
            </svg>
          </label>
          <ul
            tabIndex={0}
            className="dropdown-content menu rounded-box menu-compact mt-3 w-52 bg-white p-2 shadow"
          >
            <li>
              <a>Homepage</a>
            </li>
            <li>
              <a>About us</a>
            </li>
            <li>
              <a>Contact</a>
            </li>
          </ul>
        </div>
      </div>
      <div className="navbar-center">
        <Link
          href="/"
          className="flex items-center text-xl font-semibold normal-case"
        >
          <GiCarWheel className="h-6 w-6" />
          ferteAuto.ro
        </Link>
      </div>
      <div className="navbar-end">
        <a
          href={`tel://${env.NEXT_PUBLIC_PHONE_NUMBER}`}
          className="btn-outline btn-info btn-circle btn"
        >
          <TiPhone className="h-6 w-6" />
        </a>
      </div>
    </motion.div>
  );
};
