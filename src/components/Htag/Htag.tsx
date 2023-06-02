import { FC } from 'react'
import styles from './Htag.module.scss'
import cn from 'classnames'
import { HtagProps } from '@/components/Htag/Htag.props'

const Htag: FC<HtagProps> = (props): JSX.Element => {
	const { children, className, tag } = props

	switch (tag) {
		case 'h1':
			return <h1 className={cn(styles.h1, className)}>{children}</h1>
		case 'h2':
			return <h2 className={cn(styles.h2, className)}>{children}</h2>
		case 'h3':
			return <h3 className={cn(styles.h3, className)}>{children}</h3>
		default:
			return <></>
	}
}

export default Htag
