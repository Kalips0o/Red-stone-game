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
            initial={{ opacity: 1, y: 0, scale: 2, fontSize: "1.5rem" }}
            animate={{ opacity: 0, y: 100 + index * 40, scale: 0.8 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 2.5 }}
            className={cn(
              "absolute top-1 w-full text-center text-red-500 font-bold ",
              isRight ? "-right-[60%]" : "-left-[57%]"
            )}
            style={{
              zIndex: 9999,
            }}
                  
          >
            -{amount}
          </motion.div>
        ))}
      </AnimatePresence>
    );
  }
