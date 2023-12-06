export default function FinishScreen({
  points,
  maxPoints,
  highscore,
  onRestart,
}) {
  const percentage = (points / maxPoints) * 100

  return (
    <>
      <p className="result">
        You scored <strong>{points}</strong> out of {maxPoints} (
        {Math.ceil(percentage)}%)
      </p>
      <p className="highscore">(Highscore: {highscore} points)</p>

      <button className="btn btn-ui" onClick={onRestart}>
        RESTART QUIZ
      </button>
    </>
  )
}
