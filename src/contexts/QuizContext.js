import { createContext, useContext, useEffect, useReducer } from "react"

const SECS_PER_QUESTION = 30

const initialState = {
  questions: [],
  index: 0,
  answer: null,
  points: 0,
  highscore: 0,
  secondsRemaining: null,

  status: "loading", // loading, error, ready, activ, finished
}

const reducer = (state, action) => {
  switch (action.type) {
    case "dataReceived":
      return { ...state, status: "ready", questions: action.payload }
    case "dataFailed":
      return { ...state, status: "error" }
    case "start":
      return {
        ...state,
        status: "active",
        secondsRemaining: state.questions.length * SECS_PER_QUESTION,
      }
    case "newAnswer":
      const question = state.questions[state.index]
      return {
        ...state,
        answer: action.payload,
        points:
          action.payload === question.correctOption
            ? state.points + question.points
            : state.points,
      }
    case "nextQuestion":
      return { ...state, index: state.index + 1, answer: null }
    case "finish":
      return {
        ...state,
        status: "finished",
        highscore:
          state.points > state.highscore ? state.points : state.highscore,
      }
    case "restart":
      return {
        ...initialState,
        questions: state.questions,
        status: "ready",
        highscore: state.highscore,
      }
    case "tick":
      return {
        ...state,
        secondsRemaining: state.secondsRemaining - 1,
        status: state.secondsRemaining <= 0 ? "finished" : state.status,
      }
    default:
      throw new Error("Action unknown!")
  }
}

const QuizContext = createContext()

function QuizProvider({ children }) {
  const [
    { questions, index, answer, points, status, highscore, secondsRemaining },
    dispatch,
  ] = useReducer(reducer, initialState)

  const numQuestions = questions.length
  const maxPoints = questions.reduce(
    (accumulator, q) => accumulator + q.points,
    0
  )

  useEffect(() => {
    fetch("http://localhost:8000/questions")
      .then((res) => res.json())
      .then((data) => dispatch({ type: "dataReceived", payload: data }))
      .catch((err) => dispatch({ type: "dataFailed" }))
  }, [])

  return (
    <QuizContext.Provider
      value={{
        questions,
        index,
        answer,
        points,
        status,
        highscore,
        secondsRemaining,
        numQuestions,
        maxPoints,
        dispatch,
      }}
    >
      {children}
    </QuizContext.Provider>
  )
}

function useQuiz() {
  const context = useContext(QuizContext)
  if (context === undefined)
    throw new Error("Quiz context usage now allowd here!")
  return context
}

export { QuizProvider, useQuiz }
