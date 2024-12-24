import { cn } from "@/lib/utils";
import { PropsWithChildren } from "react";

interface CardHeaderProps extends PropsWithChildren {
    className?: string;
}

export function CardHeader({ children, className }: CardHeaderProps) {
    return (
        <div className={cn("flex items-start justify-between", className)}>
            {children}
        </div>
    );
}
