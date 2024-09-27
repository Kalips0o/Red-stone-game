import type { PropsWithChildren } from "react"
import cn from 'clsx'

interface Props extends PropsWithChildren {
    isPlayer: boolean
}

export function SectionSide({isPlayer, children}:Props   ) {
	return (
        <section className={cn('absolute w-full h-[50vh] left-0',
        {
            'pt-[6rem] pb-7 top-0 flex flex-col justify-end': !isPlayer,
            'pb-[6rem] pt-7 bottom-0': isPlayer
        })}>
            {children}
        </section>
    )
}
		