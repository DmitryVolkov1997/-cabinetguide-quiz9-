import { FC } from 'react'
import { Link } from 'react-router-dom'
import styles from './EducationProgramItem.module.scss'
import {FaChevronCircleRight} from 'react-icons/fa'
import {
	EducationProgramItemProps
} from '@/components/screens/EducationProgramList/EducationProgramItem/EducationProgramItem.props'

const EducationProgramItem:FC<EducationProgramItemProps> = (props) => {
	const {to, label} = props

	return (
		<li>
			<Link className={styles.link} to={to}>
					<span className='text-xl flex-1 ml-3 whitespace-nowrap'>{label}</span>
					<FaChevronCircleRight size={20}/>
					<span
						className={styles.go}>Перейти</span>
			</Link>
		</li>
	)
}

export default EducationProgramItem
