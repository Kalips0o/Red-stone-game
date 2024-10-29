import { useNotificationStore } from '@/store/notiffication/notification.store'
import cn from 'clsx'
import { motion, AnimatePresence } from 'framer-motion'
import './Notification.scss'
import { useEffect, useState } from 'react'
import { WinConfetti } from '../confetti'

export function Notification() {
	const { message, type } = useNotificationStore()
	const [isVisible, setIsVisible] = useState(false)
	const [currentMessage, setCurrentMessage] = useState('')
	const [currentType, setCurrentType] = useState<'win' | 'lose' | 'info'>('info')

	useEffect(() => {
		if (message) {
			if (type === 'win' || type === 'lose') {
				setCurrentType(type)
				setIsVisible(true)
			} else if (!isVisible) {
				setCurrentMessage(message)
				setCurrentType(type)
				setIsVisible(true)
			}
		} else {
			setIsVisible(false)
		}
	}, [message, type])

	return (
		<AnimatePresence>
			{isVisible && (
				<motion.div
					className='fixed w-full h-full left-0 top-0 z-50 flex items-center justify-center bg-[#071110]/90 '
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					transition={{ duration: 0.5 }}
				>
					<motion.div
						className={cn(
							'rounded-lg py-2 px-4 w-max font-semibold text-[2rem] shadow-2xl text-gray-800 turn block ',
							{
								'win': currentType === 'win',
								'lose': currentType === 'lose',
								'turn': currentType === 'info'
							}
						)}
						initial={{ opacity: 0, scale: 0.8 }}
						animate={{ opacity: 1, scale: 1 }}
						exit={{ opacity: 0, scale: 1.2 }}
						transition={{ duration: 0.6 }}
					>
						{currentType === 'info' && currentMessage}
						{currentType === 'win' && <WinConfetti />}
					</motion.div>
				</motion.div>
			)}
		</AnimatePresence>
	)
}
