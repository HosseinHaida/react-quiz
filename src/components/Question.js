import Options from "./Options"

export default function Question({ question, onAnswer, answer }) {
  return (
    <div>
      <h4>{question.question}</h4>
      <div className="options">
        <Options question={question} onAnswer={onAnswer} answer={answer} />
      </div>
    </div>
  )
}
