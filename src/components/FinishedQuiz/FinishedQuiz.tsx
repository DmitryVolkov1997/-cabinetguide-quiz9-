import { FC } from 'react'
import styles from './FinishedQuiz.module.scss'
import { FinishedQuizProps } from '@/components/FinishedQuiz/FinishedQuiz.props'
import { IoClose, IoChevronDownSharp } from 'react-icons/io5'
import { Disclosure, Transition } from '@headlessui/react'
import { FaAngleUp } from 'react-icons/fa'
import Button from '@/components/ui/Button/Button'
import { Link } from 'react-router-dom'

const FinishedQuiz: FC<FinishedQuizProps> = (props) => {
	const { results, quiz, onRetry } = props

	const successCount = Object.keys(results).reduce((total: number, key: string) => {
		if (results[+key] === 'success') {
			total++
		}
		return total
	}, 0)

	const getLetter = (id: number) => {
		return id === 1 ? 'A)' : id === 2 ? 'B)' : id === 3 ? 'C)' : id === 4 ? 'D)' : 'E)'
	}

	return (
		<div className={styles.FinishedQuiz}>
			<div className='w-full'>
				<div className='mx-auto w-full rounded-2xl p-2'>
					{
						quiz.map((quizItem, idx, arr) => {
							const rightId: number = arr[idx].rightAnswerId - 1

							return (
								<Disclosure key={idx} as='div' className='mt-2 rounded-lg bg-none border border-separate'
														defaultOpen={idx + 1 === 1}>
									{({ open }) => (
										<div className={styles.item}>
											<Disclosure.Button
												className={'flex w-full justify-between py-4 px-5 text-xl font-semibold'}>{idx + 1}.&nbsp;<span dangerouslySetInnerHTML={{ __html: quizItem.question }} />
												<FaAngleUp size={30} className={`${
													open ? 'rotate-180 transform' : ''
												} h-5 w-5 text-purple-500`} />
												{results[quizItem.id] === 'success' ? <IoChevronDownSharp className={styles.success} /> :
													<IoClose className={styles.error} />}
											</Disclosure.Button>
											<Transition
												enter='transition duration-100 ease-out'
												enterFrom='transform scale-95 opacity-0'
												enterTo='transform scale-100 opacity-100'
												leave='transition duration-75 ease-out'
												leaveFrom='transform scale-100 opacity-100'
												leaveTo='transform scale-95 opacity-0'
											>
												<Disclosure.Panel className={'text-xl font-semibold'}>
													<span className={styles.rightAnswer}>Правильный ответ:&nbsp;</span>
													<span dangerouslySetInnerHTML={{ __html: quizItem.answers[rightId].text }} />
													{/*<p>{getLetter(arr[idx].rightAnswerId)}&nbsp;{quizItem.answers[rightId].text}</p>*/}
												</Disclosure.Panel>
											</Transition></div>
									)}
								</Disclosure>
							)
						})
					}
				</div>
			</div>

			<div className={styles.border}>
				<p className={styles.result}>
					Правильно {successCount} из {quiz.length}
				</p>
				<div className={styles.row}>
					<Button appearance={'dark'} rounded={'rounded'}>
						<Link to={'/educational-programs'}>
							Перейти в список тестов
						</Link>
					</Button>
					<Button appearance={'green'} rounded={'rounded'} onClick={onRetry}>Повторить</Button>
				</div>
			</div>
		</div>
	)
}

export default FinishedQuiz
