import type { TPlayer } from "@/store/game/game.types";
import { AnimatePresence, motion } from "framer-motion";
import cn from 'clsx';
import { useDamageStore } from "@/store/game/actions/damage.store";

interface Props {
    id: string | TPlayer;
    isRight?: boolean;
}

export function DamageList({ id, isRight = true }: Props) {
    const { damages } = useDamageStore();
  
    return (
      <AnimatePresence>
        {(damages[id] || []).map(({ id: damageId, amount }, index) => (
          <motion.div
            key={damageId}
            initial={{ opacity: 1, y: 0, rotate: 0, fontSize: "1.5rem" }}
            animate={{ opacity: 0, y: 50 + index * 40, rotate: 15 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5 }}
            className={cn(
              "absolute top-1 w-full text-center text-red-500 font-bold z-20 text-2xl",
              isRight ? "-right-[57%]" : "-left-[57%]"
            )}
          >
            -{amount}
          </motion.div>
        ))}
      </AnimatePresence>
    );
  }
