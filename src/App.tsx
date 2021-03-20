import React, {useState} from 'react';
import QuestionCard from "./components/QuestionCard";
import './App.css';
import {Difficulty, fetchQuizQuestions, QuestionState} from "./resources/API";

const TOTAL_QUESTION = 15

type AnswerObject = {
    question: string
    answer: string
    correct: boolean
    correctAnswer: string
}

const App = () => {
    const [loading, setLoading] = useState(false)
    const [questions, setQuestions] = useState<QuestionState[]>([])
    const [userAnswers, setUserAnswers] = useState<AnswerObject[]>([])
    const [currentQuestion, setCurrentQuestion] = useState(0)
    const [score, setScore] = useState(0)
    const [gameOver, setGameOver] = useState(true)

    const startTrivia = async () => {
        setLoading(true)
        setGameOver(false)
        const newQuestionSet = await fetchQuizQuestions(TOTAL_QUESTION, Difficulty.HARD)
        setQuestions(newQuestionSet)
        setScore(0)
        setUserAnswers([])
        setCurrentQuestion(0)
        setLoading(false)
    }

    const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {
        if (!gameOver) {
            if (questions[currentQuestion].correct_answer === e.currentTarget.value) {
                setScore(score + 1)
            }
        }
    }

    const nextQuestion = () => {
        if (TOTAL_QUESTION === currentQuestion) {
            setGameOver(true)
        } else {
            setCurrentQuestion(currentQuestion + 1)
        }
    }
    // console.log(questions)
    return (
        <div>
            <h1>React Quiz</h1>
            {gameOver || userAnswers.length === TOTAL_QUESTION ? (
                <button className="start" onClick={startTrivia}>Start</button>) : null}
            {!gameOver ? <p className="score">Score: {score}</p> : null}
            {!loading && !gameOver && (
                <QuestionCard totalQuestions={TOTAL_QUESTION} questionNum={currentQuestion + 1}
                              question={questions[currentQuestion].question}
                              answers={questions[currentQuestion].answers}
                              userAnswer={userAnswers ? userAnswers[currentQuestion] : undefined}
                              callback={checkAnswer}/>)}
            {!gameOver && !loading && currentQuestion !== TOTAL_QUESTION - 1 ?
                (<button className="start" onClick={nextQuestion}>NEXT</button>) : null}
        </div>
    );
}

export default App
