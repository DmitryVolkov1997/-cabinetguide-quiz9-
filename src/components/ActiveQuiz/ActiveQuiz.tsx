import { FC } from 'react'
import styles from './ActiveQuiz.module.scss'
import { ActiveQuizProps } from '@/components/ActiveQuiz/ActiveQuiz.props'
import P from '@/components/P/P'
import AnswersList from '@/components/ActiveQuiz/AnswersList/AnswersList'
import { FaArrowRight } from 'react-icons/fa'
import { BiExit, BiPowerOff } from 'react-icons/bi'
import {FaPowerOff} from 'react-icons/fa'
import Button from '@/components/ui/Button/Button'

const ActiveQuiz: FC<ActiveQuizProps> = (props): JSX.Element => {
	const {
		answers = [],
		question,
		quizLength,
		answerNumber,
		state,
		onClickAnswer,
		setRightAnswerIdx,
		rightAnswerIdx,
		openModal
	} = props

	const handleClick = () => {
		onClickAnswer(rightAnswerIdx)
	}

	return (
		<div className={styles.ActiveQuiz}>
			<P className={styles.NumberQuestion}>Вопрос {answerNumber}/{quizLength}</P>
			<P className={styles.Question}>
				<span className={styles.QuestionImg} dangerouslySetInnerHTML={{ __html: question }}>
				</span>
			</P>

			<AnswersList answers={answers} onClickAnswer={onClickAnswer} state={state}
									 setRightAnswerIdx={setRightAnswerIdx} />

			<div className={styles.footer}>
				<Button className={styles.exit} appearance={'red'} rounded={'rounded'} onClick={openModal}>
					Завершить
					<BiPowerOff size={33}/>
				</Button>

				<div className={styles.buttons}>
					<button
						className={styles.next} onClick={handleClick}>
						<FaArrowRight />
					</button>
				</div>
			</div>
		</div>
	)
}

export default ActiveQuiz
