import { type ReactNode } from 'react';

interface ContractorProps {
  readonly name: string;
  readonly className?: string;
}

export function Contractor({ name, className = '' }: ContractorProps): ReactNode {
  return (
    <span
      className={`
        inline-flex items-center gap-1.5 px-2.5 py-1 
        rounded-ui-control text-xs font-medium border
        bg-ui-accent-solid/10 text-ui-accent-solid border-ui-accent-solid/20
        
        ${className}
      `.trim()}
    >
      <span className="font-semibold">{name}</span>
    </span>
  );
}
