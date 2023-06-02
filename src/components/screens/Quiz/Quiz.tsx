import { FC, useEffect, useState } from 'react'
import styles from './Quiz.module.scss'
import { QuizProps } from '@/components/screens/Quiz/Quiz.props'
import Htag from '@/components/Htag/Htag'
import ActiveQuiz from '@/components/ActiveQuiz/ActiveQuiz'
import { IQuiz } from '@/shared/interfaces/quiz.interface'
import { AnswerState } from '@/shared/interfaces/answerState.interface'
import FinishedQuiz from '@/components/FinishedQuiz/FinishedQuiz'
import Modal from '@/components/ui/Modal/Modal'
import Button from '@/components/ui/Button/Button'
import axios from 'axios'
import { QUIZ_BASE_URL } from '@/configs/constants'
import { useParams } from 'react-router-dom'
import Spinner from '@/components/ui/Spinner/Spinner'

const Quiz: FC<QuizProps> = (): JSX.Element => {
	const [quiz, setQuiz] = useState<IQuiz[]>([])
	const [activeQuestion, setActiveQuestion] = useState<number>(0)
	const [rightAnswerIdx, setRightAnswerIdx] = useState<number>(0)
	const [answerState, setAnswerState] = useState<AnswerState>(null)
	const [isFinished, setIsFinished] = useState<boolean>(false)
	const [results, setResults] = useState<{ [key: number]: string }>({})
	const [isOpen, setIsOpen] = useState(false)

	const [loading, setLoading] = useState<boolean>(true)
	const {category, subcategory, id } = useParams()

	const closeModal = (): void => {
		setIsOpen(false)
	}

	const openModal = (): void => {
		setIsOpen(true)
	}

	const onClickFinished = (): void => {
		setIsFinished(true)
		closeModal()
	}

	const onClickAnswer = (answerId: number): void => {
		if (answerState) {
			const key: number = +Object.keys(answerState)[0]
			if (answerState[key] === 'success') return
		}

		const question = quiz[activeQuestion]

		if (question.rightAnswerId === answerId) {
			if (!results[question.id]) {
				setResults((prevState) => ({
					...prevState,
					[question.id]: 'success'
				}))
			}

			setAnswerState({ [answerId]: 'success' })

			const timeout = window.setTimeout(() => {
				if (isQuizFinished()) {
					setIsFinished(true)
				} else {
					setActiveQuestion(prevState => prevState + 1)
					setAnswerState(null)
				}
				window.clearTimeout(timeout)
			}, 1200)
			setRightAnswerIdx(0)
		} else if (answerId !== question.rightAnswerId) {
			setResults((prevState) => ({
				...prevState,
				[question.id]: 'error'
			}))
			setAnswerState({ [answerId]: 'error' })
			const timeout = window.setTimeout(() => {
				if (isQuizFinished()) {
					setIsFinished(true)
				} else {
					setActiveQuestion(activeQuestion + 1)
					setAnswerState(null)
				}
				window.clearTimeout(timeout)
			}, 1000)
			setRightAnswerIdx(0)
		}
	}

	const isQuizFinished = (): boolean => {
		return quiz.length === activeQuestion + 1
	}

	const retryHandler = (): void => {
		setActiveQuestion(0)
		setRightAnswerIdx(0)
		setAnswerState(null)
		setIsFinished(false)
		setResults({})
	}

	const getQuizes = async () => {
		setLoading(true)
		const { data } = await axios.get(`${QUIZ_BASE_URL}quizes/${category}/${subcategory}/${id}.json`)
		setQuiz(data)
		setLoading(false)
	}

	useEffect(() => {
		getQuizes().then(e => e !== undefined && console.log(e))
	}, [category, subcategory])

	return (
		<div className={styles.quiz}>
			<Htag className={styles.title} tag={'h1'}>Ответьте на все вопросы</Htag>
			<div className={styles.row}>
				{
					loading ? <Spinner /> : !isFinished ?
						<ActiveQuiz answers={quiz[activeQuestion].answers} question={quiz[activeQuestion].question}
												quizLength={quiz.length}
												answerNumber={activeQuestion + 1}
												state={answerState}
												onClickAnswer={onClickAnswer} setRightAnswerIdx={setRightAnswerIdx}
												rightAnswerIdx={rightAnswerIdx} openModal={openModal} /> :
						<FinishedQuiz results={results} quiz={quiz} onRetry={retryHandler} />
				}
			</div>
			<Modal title={'Внимание!'} isOpen={isOpen} closeModal={closeModal}>
				<div className={styles.modalBody}>
					<p className={styles.modalText}>Количество неотвеченных заданий: {quiz.length - activeQuestion}</p>
					<p className={styles.modalText}>
						После завершения вы не сможете отвечать на вопросы. Если вы уверены, что хотите завершить тестирование, то
						нажмите на кнопку ЗАВЕРШИТЬ.
					</p>
					<div className={styles.modalButtons}>
						<Button appearance={'green'} rounded={'rounded'} onClick={closeModal}>Продолжить тестирование</Button>
						<Button appearance={'dark'} rounded={'rounded'} onClick={onClickFinished}>Завершить</Button>
					</div>
				</div>
			</Modal>
		</div>
	)
}

export default Quiz

