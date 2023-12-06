export default function Progress({ i, count, points, maxPoints, hasAnswered }) {
  return (
    <header className="progress">
      <progress className="" max={count} value={i + Number(hasAnswered)} />

      <p>
        Question <strong>{i + 1}</strong> / {count}
      </p>

      <p>
        <strong>{points} </strong> / {maxPoints}
      </p>
    </header>
  )
}
