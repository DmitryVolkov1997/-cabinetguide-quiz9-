import { DetailedHTMLProps, Dispatch, HTMLAttributes, SetStateAction } from 'react'
import { IQuizAnswer } from '@/shared/interfaces/quiz.interface'
import { AnswerState } from '@/shared/interfaces/answerState.interface'

export interface AnswerItemProps extends DetailedHTMLProps<HTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
	answer: IQuizAnswer
	state: string | null
	answerText:string
	onClickAnswer: (answerId: number) => void
	setRightAnswerIdx:Dispatch<SetStateAction<number>>
}