import { useEffect, useReducer } from "react"

import Header from "./Header"
import Loader from "./Loader"
import Error from "./Error"
import Main from "./Main"
import StartScreen from "./StartScreen"
import Question from "./Question"
import NextButton from "./NextButton"
import Progress from "./Progress"
import FinishScreen from "./FinishScreen"
import Timer from "./Timer"
import Footer from "./Footer"

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

export default function App() {
  const [
    { questions, index, answer, points, status, highscore, secondsRemaining },
    dispatch,
  ] = useReducer(reducer, initialState)

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
    <div className="app">
      <Header />

      <Main>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && (
          <StartScreen
            onStartQuiz={() => dispatch({ type: "start" })}
            count={questions.length}
          />
        )}
        {status === "active" && (
          <>
            <Progress
              i={index}
              count={questions.length}
              points={points}
              maxPoints={maxPoints}
              hasAnswered={answer !== null}
            />
            <Question
              question={questions.at(index)}
              onAnswer={(v) => dispatch({ type: "newAnswer", payload: v })}
              answer={answer}
            />
            <Footer>
              <Timer
                onTick={() => dispatch({ type: "tick" })}
                secondsRemaining={secondsRemaining}
              />
              <NextButton
                answer={answer}
                count={questions.length}
                index={index}
                onNextQuestion={() => dispatch({ type: "nextQuestion" })}
                onFinish={() => dispatch({ type: "finish" })}
              />
            </Footer>
          </>
        )}
        {status === "finished" && (
          <FinishScreen
            points={points}
            maxPoints={maxPoints}
            highscore={highscore}
            onRestart={() => dispatch({ type: "restart" })}
          />
        )}
      </Main>
    </div>
  )
}
