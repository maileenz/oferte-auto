import type { Media, Product } from "@prisma/client";
import type { FC, PropsWithChildren } from "react";

export type FCC<T = object> = FC<T & PropsWithChildren>;

export type Car = Omit<Product, "makeId"> & {
  make: string;
  media: Pick<Media, "url" | "hash" | "type">[];
};
