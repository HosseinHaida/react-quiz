export default function Options({ question, onAnswer, answer }) {
  const hasAnswered = answer !== null

  return (
    <>
      {question.options.map((op, i) => (
        <button
          key={op}
          onClick={() => onAnswer(i)}
          disabled={hasAnswered}
          className={`btn btn-option ${i === answer ? "answer" : ""} ${
            hasAnswered
              ? i === question.correctOption
                ? "correct"
                : "wrong"
              : ""
          }`}
        >
          {op}
        </button>
      ))}
    </>
  )
}
