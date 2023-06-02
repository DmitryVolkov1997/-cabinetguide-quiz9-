import { FC, useEffect, useState } from 'react'
import styles from './QuizList.module.scss'
import {FaChevronCircleRight} from 'react-icons/fa'
import { QuizListProps } from '@/components/screens/QuizList/QuizList.props'
import axios from 'axios'
import { QUIZ_BASE_URL } from '@/configs/constants'
import Htag from '@/components/Htag/Htag'
import { NavLink, useParams } from 'react-router-dom'
import Spinner from '@/components/ui/Spinner/Spinner'

const QuizList: FC<QuizListProps> = () => {
	const [quiz, setQuiz] = useState([])
	const [loading, setLoading] = useState<boolean>(true)
	const { id, category, subcategory } = useParams()

	const renderQuizes = () => {
		return quiz.map((quiz: { id: string, title:string }, idx) => (
			<li className={styles.item} key={idx}>
				<NavLink className={styles.link} to={`/educational-programs/${id}/educational-subcategory/${category}/${subcategory}/${quiz.id}`}>
					<span className={styles.title}>{quiz.title}</span>
					<div className={styles.row}>
						<FaChevronCircleRight className={styles.arrow} size={20} />
						<span
							className={styles.go}>Перейти</span>
					</div>
				</NavLink>
			</li>
		))
	}

	const getQuizes = async () => {
		setLoading(true)
		const { data } = await axios.get(`${QUIZ_BASE_URL}/quizes/${category}/${subcategory}.json`)
		const quiz: any = []

		if (data) {
			Object.keys(data).map((key: string) => {
				return (
					quiz.push({
						id: key,
						title: data[key][0].title ? data[key][0].title : 'Тест'
					})
				)
			})
			setQuiz(quiz)
		}

		setLoading(false)
	}

	useEffect(() => {
		getQuizes().then(e => e !== undefined && console.log(e))
	}, [])



	return (
		<div className={styles.QuizList}>
			<div className={styles.container}>
				<div className={'p-4 w-full bg-white rounded-lg border shadow-md sm:p-6'}>
					<Htag className={'mb-3 text-3xl text-center font-bold text-gray-900 md:text-4xl'} tag={'h3'}>Список тестов</Htag>
					<ul className={styles.list}>
						{
							!loading ? <ul>{renderQuizes()}</ul> : <Spinner />
						}
					</ul>
				</div>
			</div>
		</div>
	)
}

export default QuizList
