import type { PropsWithChildren } from 'react';

export function Heading({ children }: PropsWithChildren) {
  return (
    <h1 className='text-yellow-400 mt-12 text-glow'>
      {children}
    </h1>
  );
}
