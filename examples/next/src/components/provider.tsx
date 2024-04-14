"use client";

import React from "react";
import { SolwireProvider } from "@solwire/solwire-js/react";

interface ProviderProps {
  children: React.ReactNode;
}

export function SolwireProvider({ children }: ProviderProps) {
  return <SolwireProvider>{children}</SolwireProvider>;
}
