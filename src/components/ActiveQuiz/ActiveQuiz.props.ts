import { DetailedHTMLProps, Dispatch, HTMLAttributes, SetStateAction } from 'react'
import { IQuizAnswer } from '@/shared/interfaces/quiz.interface'
import { AnswerState } from '@/shared/interfaces/answerState.interface'

export interface ActiveQuizProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
	answers: IQuizAnswer[]
	question: string
	quizLength: number
	answerNumber: number
	state: AnswerState
	rightAnswerIdx: number
	onClickAnswer: (answerId: number) => void
	setRightAnswerIdx: Dispatch<SetStateAction<number>>
	openModal: () => void
}