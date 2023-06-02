import { FC } from 'react'
import styles from './EducationSubcategoryList.module.scss'
import { FaChevronCircleRight } from 'react-icons/fa'
import {
	EducationSubcategoryListProps
} from '@/components/screens/EducationSubcategoryList/EducationSubcategoryList.props'
import { Link, useParams } from 'react-router-dom'

const subcategories = [
	{
		id: 1,
		label: 'Предметы ЕНТ(полное обучение)',
		to: 'bakalavriat/ent'
	},
	{
		id: 2,
		label: 'Тесты на определение готовности к обучению',
		to: 'bakalavriat/gotovnost'
	},
	{
		id: 3,
		label: 'Другое',
		to: 'bakalavriat/other'
	},
	{
		id: 4,
		label: 'Тесты на определение готовности к обучению',
		to: 'magistratura/gotovnost'
	},
	{
		id: 5,
		label: 'Другое',
		to: 'magistratura/other'
	},
	{
		id: 6,
		label: 'Тесты на определение готовности к обучению',
		to: 'doktorantura/gotovnost'
	},
	{
		id: 7,
		label: 'Другое',
		to: 'doktorantura/other'
	}
]

const EducationSubcategoryList: FC<EducationSubcategoryListProps> = () => {
	const { id } = useParams()

	return (
		<div className={styles.EducationSubcategoryList}>
			<div className={styles.container}>
				<div className='p-4 w-full bg-white rounded-lg border shadow-md sm:p-6'>
					<ul className={styles.list}>
						{
							subcategories.map(subcategory => {
								if (id && subcategory.to.includes(id)) {
									return (
										<li className={styles.item} key={subcategory.id}>
											<Link className={styles.link} to={subcategory.to}>
												<span className={styles.title}>{subcategory.label}</span>
												<div className={styles.row}>
													<FaChevronCircleRight className={styles.arrow} size={20} />
													<span className={styles.go}>Перейти</span>
												</div>
											</Link>
										</li>
									)
								}
							})
						}
					</ul>
				</div>
			</div>
		</div>
	)
}

export default EducationSubcategoryList
