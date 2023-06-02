import { FC } from 'react'
import styles from './P.module.scss'
import cn from 'classnames'
import { PProps } from '@/components/P/P.props'

const P: FC<PProps> = (props): JSX.Element => {
	const { children, className, ...rest } = props

	return (
		<p className={cn(className)} {...rest}>
			{children}
		</p>
	)
}

export default P
