
import { cn } from '@/lib/utils';
import { PropsWithChildren, ReactNode } from 'react';

interface CardContainerProps extends PropsWithChildren{
  className?: string;
}

export function CardContainer({ children, className }: CardContainerProps) {
  return (
    <div className={cn('bg-gray-100 rounded-lg relative', className)}>
      {children}
    </div>
  );
}