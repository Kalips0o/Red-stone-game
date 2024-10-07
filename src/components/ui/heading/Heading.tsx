import type { PropsWithChildren } from 'react';

export function Heading({ children }: PropsWithChildren) {
  return (
    <h1 className='text-7xl text-yellow-400 mt-20 text-glow'>
      {children}
    </h1>
  );
}
