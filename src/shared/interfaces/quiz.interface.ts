export interface IQuizAnswer {
	id: number
	text: string
}

export interface IQuiz {
	id: number
	question: string
	rightAnswerId: number
	answers: IQuizAnswer[]
}


