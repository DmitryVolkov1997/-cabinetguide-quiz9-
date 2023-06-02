import { FC } from 'react'
import styles from './Backdrop.module.scss'
import cn from 'classnames'
import { BackdropProps } from '@/components/ui/Backdrop/Backdrop.props'

const Backdrop: FC<BackdropProps> = (props) => {
	const { isOpen, ...rest } = props

	return (
		<div className={cn(styles.backdrop, isOpen && styles.open)} {...rest}>

		</div>
	)
}

export default Backdrop
