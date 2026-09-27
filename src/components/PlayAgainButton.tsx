type Props = {
  onClick: () => void
}

/** Startet eine zusätzliche Runde am selben Tag. */
export function PlayAgainButton({ onClick }: Props) {
  return (
    <button type="button" className="btn btn--primary play-again-btn" onClick={onClick}>
      Noch ein Spiel spielen
    </button>
  )
}
