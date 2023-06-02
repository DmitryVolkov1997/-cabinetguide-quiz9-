import { FC } from 'react'
import styles from './AnswerItem.module.scss'
import { AnswerItemProps } from '@/components/ActiveQuiz/AnswersList/AnswerItem/AnswerItem.props'

import { RadioGroup } from '@headlessui/react'
import cn from 'classnames'


const AnswerItem: FC<AnswerItemProps> = (props) => {
	const { answer, state, onClickAnswer, setRightAnswerIdx, answerText } = props

	const getLetter = (id: number) => {
		return id === 1 ? 'A' : id === 2 ? 'B' : id === 3 ? 'C' : id === 4 ? 'D' : 'E'
	}

	return (
		<RadioGroup.Option
			value={answerText}
			className={({ active, checked }) =>
				`${
					active
						? 'ring-2 ring-white ring-opacity-60 ring-offset-4 ring-offset-sky-300'
						: ''
				}
                  ${cn(
					checked ? 'bg-sky-900 bg-opacity-75 text-white border-none' : 'bg-white', state === 'success' ? 'bg-green-600' : state === 'error' ? 'bg-red-600' : null
				)}
                    relative flex cursor-pointer rounded-lg px-5 py-4 focus:outline-none border border-separate`
			}
		>
			{({ active, checked }) => (
				<>
					<div className='flex w-full items-center justify-between'>
						<div className='flex items-center w-full'>
							<div className='text-xl w-full'>
								<RadioGroup.Label
									as='p'
									className={cn('font-medium', checked ? 'text-white' : 'text-gray-900', styles.answer)}
									onClick={() => setRightAnswerIdx(answer.id)}
								>
									<span
										className={cn(styles.letter, checked && styles.checked, state === 'error' && 'bg-red-300/30', state === 'success' && 'bg-green-300/50')}>{getLetter(answer.id)}</span>
									{/*{answer.text}*/}
									<span dangerouslySetInnerHTML={{ __html: answer.text }} />
								</RadioGroup.Label>
								<RadioGroup.Description
									as='span'
									className={`inline ${
										checked ? 'text-sky-100' : 'text-gray-500'
									}`}
								>
								</RadioGroup.Description>
							</div>
						</div>
						{checked && (
							<div className='shrink-0 text-white'>
								<CheckIcon className='h-6 w-6' />
							</div>
						)}
					</div>
				</>
			)}
		</RadioGroup.Option>
	)
}

function CheckIcon(props: any) {
	return (
		<svg viewBox='0 0 24 24' fill='none' {...props}>
			<circle cx={12} cy={12} r={12} fill='#86efac' opacity='0.5' />
			<path
				d='M7 13l3 3 7-7'
				stroke='#fff'
				strokeWidth={1.5}
				strokeLinecap='round'
				strokeLinejoin='round'
			/>
		</svg>
	)
}

export default AnswerItem
