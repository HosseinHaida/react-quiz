import { useEffect } from "react"

export default function Timer({ onTick, secondsRemaining }) {
  const mins = Math.floor(secondsRemaining / 60)
  const seconds = secondsRemaining % 60

  useEffect(() => {
    const id = setInterval(() => {
      onTick()
    }, 1000)

    return () => clearInterval(id)
  }, [onTick])

  return (
    <div className="timer">
      {mins < 10 && "0"}
      {mins}:{seconds < 10 && "0"}
      {seconds}
    </div>
  )
}
