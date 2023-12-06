export default function NextButton({
  onNextQuestion,
  onFinish,
  answer,
  index,
  count,
}) {
  if (answer === null) return null

  if (index < count - 1)
    return (
      <button className="btn btn-ui" onClick={onNextQuestion}>
        NEXT
      </button>
    )
  console.log(index, count)
  if (index === count - 1)
    return (
      <button className="btn btn-ui" onClick={onFinish}>
        FINISH
      </button>
    )
}
