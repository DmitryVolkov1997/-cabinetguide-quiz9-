import { FC } from 'react'
import styles from './Drawer.module.scss'
import cn from 'classnames'
import { DrawerProps } from '@/components/layout/Drawer/Drawer.props'
import { NavLink } from 'react-router-dom'
import { IoMdSchool } from 'react-icons/io'

const links = [
	{ to: '/', label: 'Регистрация' },
	{ to: '/educational-programs', label: 'Список тестов' },
	// { to: '/quiz-creator', label: 'Создать тест' },
	// { to: '/dashboard', label: 'Админка' }
]

const Drawer: FC<DrawerProps> = (props) => {
	const { isOpen, onClick } = props

	const renderLinks = () => {
		return links.map((link, idx) => (
			<li key={idx} className={styles.item}>
				<NavLink className={styles.link} to={link.to} onClick={onClick}>
					{link.label}
				</NavLink>
			</li>
		))
	}

	return (
		<div className={cn(styles.drawer, isOpen && styles.open)}>
				<div className={styles.row}>
					<IoMdSchool size={40} />
					<h5
						className={styles.title}>
						https://www.kstu.kz/
					</h5>
				</div>
			<ul className={styles.list}>
				{renderLinks()}
			</ul>
		</div>
	)
}

export default Drawer
