import React from "react";
import type { BaseProps } from "../types";
import { SolwireProvider } from "./context-provider";
import { useSolwire } from "./use-solwire";
type PayWithSolwireProps = BaseProps;
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, PayWithSolwireProps {
}
declare const PayWithSolwire: React.ForwardRefExoticComponent<ButtonProps & React.RefAttributes<HTMLButtonElement>>;
export { useSolwire, PayWithSolwire, SolwireProvider, type PayWithSolwireProps, };
