import { FC } from 'react'
import styles from './Button.module.scss'
import cn from 'classnames'
import { ButtonProps } from '@/components/ui/Button/Button.props'

const Button: FC<ButtonProps> = (props): JSX.Element => {
	const { children, className, type, disabled = false, appearance, rounded, ...rest } = props

	return (
		<button type={type && type} disabled={disabled} className={cn(styles.button, className, {
			[styles.dark]: appearance === 'dark',
			[styles.green]: appearance === 'green',
			[styles.red]: appearance === 'red'
		})} {...rest}>
			{children}
		</button>
	)
}

export default Button
