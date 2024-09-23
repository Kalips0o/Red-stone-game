import type { ICard } from "@/card.types"
import { motion } from "framer-motion"

interface Props{
    card: ICard

}
export function BoardCard ({card}:Props){
 return (
 <motion.button
 className="h-[11.3rem] w-32 shadow mx-1 rounded-lg"
 initial={{ scale: 0.5,  rotate: -15, y:-200, opacity:0 }}
 animate={
      {
         scale: 1,
         rotate: 0, 
         y: 0,
         opacity:1
       }
   }
 transition={{ type:'spring', stiffness: 150, damping: 20 , mass: 1}}
>
 <img alt={card.name} src={card.imageUrl} draggable="false" />
</motion.button>   )
}