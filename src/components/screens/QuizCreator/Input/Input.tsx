import { FC } from 'react'
import styles from './Input.module.scss'
import cn from 'classnames'
import { InputProps } from '@/components/screens/QuizCreator/Input/Input.props'

const Input:FC<InputProps> = (props) => {
	const {type, className, ...rest} = props

	return (
		<input
			className={cn(styles.input, className)}
			type={type}
			{...rest}/>
	)
}

export default Input
