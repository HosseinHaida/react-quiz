export default function StartScreen({ count, onStartQuiz }) {
  return (
    <div className="start">
      <h2>Welcome to The React Quiz!</h2>
      <h3>{count} questions to test your React mastery</h3>
      <button className="btn btn-ui" onClick={onStartQuiz}>
        LETS START
      </button>
    </div>
  )
}
