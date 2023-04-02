import type { Product } from "@prisma/client";
import type { FC, PropsWithChildren } from "react";

export type FCC<T = object> = FC<T & PropsWithChildren>;

export type Car = Product & { make: string; image: string };
