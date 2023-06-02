import { FC } from 'react'
import styles from './UnsuccessfulForm.module.scss'
import { UnsuccessfulFormProps } from '@/components/screens/UnsuccessfulForm/UnsuccessfulForm.props'
import { useNavigate } from 'react-router-dom'
import { FiChevronsLeft } from 'react-icons/fi'
import {BiErrorAlt} from 'react-icons/bi'

const UnsuccessfulForm: FC<UnsuccessfulFormProps> = () => {
	let navigate = useNavigate()

	return (
		<div className={styles.UnsuccessfulForm}>
			<div className={styles.row}>
				<BiErrorAlt className={styles.unsuccessful__icon} />
				<h1 className={styles.title}>
					Указанная учетная запись уже существует!
				</h1>
				<button className={styles.back} onClick={() => navigate(-1)}>
					<FiChevronsLeft className={styles.icon__back} />
					Назад
				</button>
			</div>
		</div>
	)
}

export default UnsuccessfulForm
