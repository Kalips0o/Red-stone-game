import { useNotificationStore } from '@/store/notiffication/notification.store'
import cn from 'clsx'
import { motion, AnimatePresence } from 'framer-motion'
import './Notification.scss'
export function Notification() {
	const { message, type } = useNotificationStore()

	return (
		<AnimatePresence>
			{!!message && (
				<motion.div
					className='fixed w-full h-full left-0 top-0 z-50 flex items-center justify-center bg-[#071110]/90'
					initial={{ opacity: 1 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					transition={{ duration: 0.5 }}
				>
					<motion.div
						className={cn(
							'rounded-lg py-2 px-4 w-max font-semibold text-[2rem] shadow-2xl  text-gray-800 turn',
							{
								' win ' : type === 'win',
								' lose ': type === 'lose',
							}
						)}
						initial={{ opacity: 1, scale: 1 }}
						animate={{ opacity: 1, scale: 1 }}
						exit={{ opacity: 0, scale: 1.2 }}
						transition={{ duration: 0.6 }}
					>
						{message}
					</motion.div>
				</motion.div>
			)}
		</AnimatePresence>
	)
}
