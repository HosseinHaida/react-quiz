import { useQuiz } from "../contexts/QuizContext"
import Options from "./Options"

export default function Question() {
  const { questions, index, answer, dispatch } = useQuiz()

  return (
    <div>
      <h4>{questions.at(index).question}</h4>
      <div className="options">
        <Options
          question={questions.at(index)}
          onAnswer={(v) => dispatch({ type: "newAnswer", payload: v })}
          answer={answer}
        />
      </div>
    </div>
  )
}
