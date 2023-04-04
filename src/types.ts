import type { Media, Product } from "@prisma/client";
import type { FC, PropsWithChildren } from "react";

export type FCC<T = object> = FC<T & PropsWithChildren>;

export type Car = Omit<Product, "makeId" | "userId"> & {
  make: string;
  media: MediaFile[];
};

export type MediaFile = Pick<Media, "url" | "hash" | "type">;
