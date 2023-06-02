import * as yup from 'yup'
import { formStudy } from '@/components/screens/ContactForm/options'

const phoneRegExp =
	/^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

export const validationSchema = yup.object().shape({
	firstName: yup
		.string()
		.typeError('Должно быть строкой')
		.required('Обязательное поле'),
	lastName: yup
		.string()
		.typeError('Должно быть строкой')
		.required('Обязательное поле'),
	patronymic: yup.string().typeError('Должно быть строкой'),
	email: yup
		.string()
		.email('Введите верный email')
		.required('Обязательное поле'),
	phone: yup
		.string()
		.matches(phoneRegExp, 'Номер телефона не валидный')
		.required('Обязательное поле'),
	yourQuestion: yup.string().typeError('Должно быть строкой'),
	regions: yup.string().required('Обязательное поле'),
	cities: yup.string().required('Обязательное поле'),
	institutionType: yup.string().required('Обязательное поле'),
	institutions: yup.string().required('Обязательное поле'),
	formStudy: yup.string().required('Обязательное поле'),
	languages: yup.string().required('Обязательное поле'),
	consultantDepartment: yup.string().required('Обязательное поле'),
	yourInstitution:yup.string().typeError('Должно быть строкой'),
})
