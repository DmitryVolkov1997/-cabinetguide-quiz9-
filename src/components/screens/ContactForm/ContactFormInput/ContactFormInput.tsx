import { FC } from 'react'
import styles from './ContactFormInput.module.scss'
import cn from 'classnames'
import { ContactFormInputProps } from '@/components/screens/ContactForm/ContactFormInput/ContactFormInput.props'

const ContactFormInput: FC<ContactFormInputProps> = (props) => {
	const { type, className, placeholder, ...rest } = props

	return (
		<input
			className={cn(styles.input, className)}
			type={type}
			placeholder={placeholder}
			{...rest} />
	)
}

export default ContactFormInput
