import React from "react"

type QuestionProps = {
    totalQuestions: number
    questionNum: number
    question: string
    answers: string[]
    userAnswer: any
    callback: any
}

const QuestionCard: React.FC<QuestionProps> = ({
                                                   totalQuestions,
                                                   questionNum,
                                                   question,
                                                   answers,
                                                   userAnswer,
                                                   callback
                                               }) => {
    return (
        <div>
            <p>Question: {questionNum} / {totalQuestions}</p>
            <h1>{question}</h1>
            {answers.map((answer, index) => (

                <button key={index} type="button" value={answer} onClick={callback}>{answer}</button>
            ))}
        </div>
    )
}

export default QuestionCard