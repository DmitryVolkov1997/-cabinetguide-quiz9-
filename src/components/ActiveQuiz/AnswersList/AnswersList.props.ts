import { DetailedHTMLProps, Dispatch, HTMLAttributes, SetStateAction } from 'react'
import { IQuizAnswer } from '@/shared/interfaces/quiz.interface'
import { AnswerState } from '@/shared/interfaces/answerState.interface'

export interface AnswersListProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
	answers: IQuizAnswer[]
	state: AnswerState
	onClickAnswer: (answerId: number) => void
	setRightAnswerIdx:Dispatch<SetStateAction<number>>
}