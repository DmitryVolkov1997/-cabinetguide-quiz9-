import { FC } from 'react'
import styles from './MenuToggle.module.scss'
import cn from 'classnames'
import { MenuToggleProps } from '@/components/layout/MenuToggle/MenuToggle.props'
import { FaTimes, FaBars } from 'react-icons/fa'

const MenuToggle: FC<MenuToggleProps> = (props) => {
	const { isOpen, className, ...rest } = props

	return (
		<button className={cn(styles.MenuToggle, className, isOpen && styles.open)} {...rest}>
			{isOpen ? <FaTimes className={styles.times} /> : <FaBars className={styles.bars} />}
		</button>
	)
}

export default MenuToggle
