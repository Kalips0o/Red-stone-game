import type { IGameCard } from "@/store/game/game.types"
import { BoardCard } from "./BoardCard"

interface Props {
    deck:IGameCard[]
}
export function GridBoardCards ({deck}:Props){
return   (
<div className=" px-20 flex items-center justify-center gap-2">
{deck
.filter(card => card.isOnBoard)
  .map(card => (
<BoardCard key={card.id} card={card}/>
  ))}
</div>)
}