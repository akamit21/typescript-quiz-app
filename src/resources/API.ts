const shuffleArray = (arr: string[]): string[] => [...arr].sort(() => Math.random() - 0.5)

export type Question = {
    category: string
    question: string
    correct_answer: string
    incorrect_answers: string[]
    difficulty: string
    type: string
}

export type QuestionState = Question & { answers: string[] }

export enum Difficulty {
    EASY = "easy",
    MEDIUM = "medium",
    HARD = "hard",
}

export const fetchQuizQuestions = async (amount: number, difficulty: Difficulty) => {
    const endPoint = `https://opentdb.com/api.php?amount=${amount}&difficulty=${difficulty}&type=multiple`
    const data = await (await fetch(endPoint)).json()
    // console.log('API data', data)
    return data.results.map((question: Question) => ({
        ...question,
        answers: shuffleArray([...question.incorrect_answers, question.correct_answer])
    }))
}