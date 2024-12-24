'use client';

import { AuthProvider } from "@/context/auth-context";
import { PropsWithChildren } from "react";
import {
  TooltipProvider,
} from "@/components/ui/tooltip"
export default function Providers({ children }: PropsWithChildren) {
  return (
    <AuthProvider>
      <TooltipProvider>
        {children}
      </TooltipProvider>
    </AuthProvider>
  );
}