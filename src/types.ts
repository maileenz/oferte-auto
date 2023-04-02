import { FC, PropsWithChildren } from "react";

export type FCC<T = {}> = FC<T & PropsWithChildren>;
