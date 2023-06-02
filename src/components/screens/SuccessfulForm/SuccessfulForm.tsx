import { FC } from 'react'
import styles from './SuccessfulForm.module.scss'
import { FiChevronsLeft } from 'react-icons/fi'
import { IoIosCheckmarkCircleOutline } from 'react-icons/io'
import { SuccessfulFormProps } from '@/components/screens/SuccessfulForm/SuccessfulForm.props'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';

const SuccessfulForm: FC<SuccessfulFormProps> = (props) => {
	const {} = props
	let navigate = useNavigate();

	return (
		<div className={styles.SuccessfulForm}>
			<div className={styles.row}>
				<IoIosCheckmarkCircleOutline className={styles.success__icon} />
				<h1 className={styles.title}>
					Отлично<br />
					Вы успешно вошли в систему!
				</h1>
				<button className={styles.back} onClick={() => navigate(-1)}>
					<FiChevronsLeft className={styles.icon__back} />
					Назад
				</button>
				<Link className={styles.link} to={'/educational-programs'}>
					Перейти в список тестов
				</Link>
			</div>
		</div>
	)
}

export default SuccessfulForm
