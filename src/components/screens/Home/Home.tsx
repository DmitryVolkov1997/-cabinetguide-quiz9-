import { FC } from 'react'
import { Formik } from 'formik'
import * as yup from 'yup'
import styles from './Home.module.scss'
import { HomeProps } from '@/components/screens/Home/Home.props'
import ContactForm from '@/components/screens/ContactForm/ContactForm'

const Home: FC<HomeProps> = (props): JSX.Element => {
	return (
		<>
			<ContactForm />
		</>
	)
}

export default Home
