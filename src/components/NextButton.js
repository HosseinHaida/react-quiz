import { useQuiz } from "../contexts/QuizContext"

export default function NextButton() {
  const { answer, index, numQuestions, dispatch } = useQuiz()

  if (answer === null) return null

  if (index < numQuestions - 1)
    return (
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "nextQuestion" })}
      >
        NEXT
      </button>
    )
  console.log(index, numQuestions)
  if (index === numQuestions - 1)
    return (
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "finish" })}
      >
        FINISH
      </button>
    )
}
