import { cn } from "@/lib/utils";
import Image from "next/image";

interface CardImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
}

export function CardImage({ className, src, alt, width, height }: CardImageProps) {
  return (
    <Image
      src={src}
      alt={alt}
      width={width ?? 100}
      height={height ?? 100}
      className={cn("rounded-lg shadow-lg", className)}
    />
  );
}