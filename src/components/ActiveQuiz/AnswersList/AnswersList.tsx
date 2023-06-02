import { FC, useState } from 'react'
import styles from './AnswersList.module.scss'
import { AnswersListProps } from '@/components/ActiveQuiz/AnswersList/AnswersList.props'
import AnswerItem from '@/components/ActiveQuiz/AnswersList/AnswerItem/AnswerItem'

import { RadioGroup } from '@headlessui/react'

const AnswersList: FC<AnswersListProps> = (props): JSX.Element => {
	const { answers = [], state, onClickAnswer, setRightAnswerIdx } = props

	const [selected, setSelected] = useState(answers[0])

	return (
		<div className='w-full'>
			<div className='mx-auto w-full'>
				<RadioGroup value={selected} onChange={setSelected}>
					<RadioGroup.Label className='sr-only'>Server size</RadioGroup.Label>
					<div className='space-y-3.5'>
						{answers.map((answer, idx) => (
							<AnswerItem key={idx} answer={answer} onClickAnswer={onClickAnswer}
													state={state ? state[answer.id] : null} setRightAnswerIdx={setRightAnswerIdx} answerText={answer.text} />
						))}
					</div>
				</RadioGroup>
			</div>
		</div>
	)
}


export default AnswersList
