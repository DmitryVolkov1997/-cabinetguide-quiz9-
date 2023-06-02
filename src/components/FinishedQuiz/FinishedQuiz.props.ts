import { IQuiz } from '@/shared/interfaces/quiz.interface'

export interface FinishedQuizProps {
	results: { [key: number]: string }
	quiz: IQuiz[]
	onRetry: () => void
}