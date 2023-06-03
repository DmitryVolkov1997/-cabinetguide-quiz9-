import React, { FC, useEffect, useState } from 'react'
import styles from './ContactForm.module.scss'
import Logo from '@/assets/images/logo.png'
import { ContactFormProps } from '@/components/screens/ContactForm/ContactForm.props'
import { Formik } from 'formik'
import { validationSchema } from '@/components/screens/ContactForm/schema'
import cn from 'classnames'
import { inputs } from '@/components/screens/ContactForm/data'
import Button from '@/components/ui/Button/Button'
import CustomSelectForm from '@/components/screens/ContactForm/CustomSelectForm/CustomSelectForm'
import {
	achievements,
	cities,
	consultantDepartment, defaultValue,
	educationProgram,
	formPayment,
	formStudy,
	institutions,
	institutionType,
	languages,
	regions,
	socialStatus
} from '@/components/screens/ContactForm/options'
import Htag from '@/components/Htag/Htag'
import ContactFormInput from '@/components/screens/ContactForm/ContactFormInput/ContactFormInput'
import axios from 'axios'
import { CONTACT_FORM_BASE_URL } from '@/configs/constants'

import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import dayjs, { Dayjs } from 'dayjs'
import { Stack, TextField } from '@mui/material'
import { DesktopDatePicker } from '@mui/x-date-pickers'
import { Link, useNavigate } from 'react-router-dom'
import { ContactsInterface } from '@/shared/interfaces/contacts.interface'
import { log } from 'util'


const stylesSelect = {
	option: (provided: any) => ({
		...provided
	}),
	control: (provided: any) => ({
		...provided,
		minHeight: 41,
		border: '1px solid #e5e7eb',
		backgroundColor: '#fff'
	}),
	placeholder: (provided: any) => ({
		...provided,
		color: '#9ca3af'
	})
}

let options: any = {
	year: 'numeric',
	// month: 'long',
	month: 'numeric',
	day: 'numeric',
	hour: 'numeric',
	minute: 'numeric'
}

const ContactForm: FC<ContactFormProps> = () => {
	const [selectRegion, setSelectRegion] = useState('')
	const [selectCity, setSelectCity] = useState('')
	const [selectInstitutionType, setSelectInstitutionType] = useState('')
	const [selectFormStudy, setSelectFormStudy] = useState('')
	const [educationList, setEducationList] = useState<{ value: string, label: string }[]>([])

	const [regionsData, setRegionsData] = useState<{ value: string, label: string }[]>([])
	const [institutionsData, setInstitutionsData] = useState<{ value: string, label: string }[]>([])

	const [contacts, setContacts] = useState<ContactsInterface[]>([])

	const navigate = useNavigate()
	const [enabled, setEnabled] = useState(true)
	const [formStudyData, setFormStudyData] = useState([])
	const [formPaymentData, setFormPaymentData] = useState([])
	const [consultantsData, setConsultantsData] = useState([])
	const [achievementsData, setAchievementsData] = useState([])
	const [languagesData, setLanguagesData] = useState([])

	const renderLabel = (name: string) => {
		switch (name) {
			case 'firstName':
				return 'Аты (Имя)*'
			case 'lastName':
				return 'Тегі (Фамилия)*'
			case 'patronymic':
				return 'Әкесінің аты (Отчество)*'
			case 'email':
				return 'Email*'
			case 'phone':
				return 'Телефон'
			default:
				return <></>
		}
	}

	const renderInputs = (
		values: any,
		handleChange: any,
		handleBlur: any,
		touched: any,
		errors: any
	) => {
		return inputs.map((input, idx) => {
			return (
				<div
					key={idx}
					className={cn(
						'w-full mb-4 relative',
						touched[input.name] && errors[input.name] && 'mb-8'
					)}
				>
					<p className={'w-full'}>
						<ContactFormInput
							className={styles.input}
							type={input.type}
							name={input.name}
							value={values[input.name]}
							placeholder={renderLabel(input.name)}
							onChange={handleChange}
							onBlur={handleBlur}
						/>
					</p>
					{touched[input.name] && errors[input.name] && (
						<span className={styles.error}>{errors[input.name]}</span>
					)}
				</div>
			)
		})
	}

	// const [value, setValue] = useState<Dayjs | null>(dayjs('2006-08-18'))
	const [value, setValue] = useState<any>(dayjs('2006-08-18'))

	const handleChangeDatePicker = (newValue: Dayjs | null) => {
		setValue(newValue)
	}

	const getCitiesByRegion = async () => {
		if (selectRegion) {
			const { data } = await axios.get(`https://contact-form-2d4a6-default-rtdb.firebaseio.com/get_cities_by_region/${selectRegion}.json`)

			if (data) {
				const arr: { value: string, label: string }[] = []

				Object.keys(data).map(key => {
					if (data[key][1]) {
						arr.push(...data[key])
					} else {
						arr.push({
							...data[key][0]
						})
					}
				})

				setRegionsData(arr)
			}
		}
	}

	useEffect(() => {
		getCitiesByRegion().then(e => e !== undefined && console.log(e))
	}, [selectRegion])

	const getEducationProgram = async () => {
		if (selectFormStudy) {
			const { data } = await axios.get(`https://contact-form-2d4a6-default-rtdb.firebaseio.com/get_education-program_by_form-study/${selectFormStudy}.json`)

			if (data) {
				const arr: { value: string, label: string }[] = []

				Object.keys(data).map((key) => {
					arr.push(
						...data[key]
					)
				})

				setEducationList(arr)
			}
		}
	}

	useEffect(() => {
		getEducationProgram().then(e => e !== undefined && console.log(e))
		// console.log(selectCity)
	}, [selectFormStudy])

	const getSchoolsByCity = async () => {
		if (selectCity && selectInstitutionType) {
			// console.log(`https://contact-form-2d4a6-default-rtdb.firebaseio.com/get_schools_by_city/${selectCity}/${selectInstitutionType}.json`)
			const { data } = await axios.get(`https://contact-form-2d4a6-default-rtdb.firebaseio.com/get_schools_by_city/${selectCity}/${selectInstitutionType}.json`)

			if (data) {
				const arr: { value: string, label: string }[] = []

				Object.keys(data).map((key) => {
					arr.push(
						...data[key]
					)
				})

				setInstitutionsData(arr)
			}
		}
	}

	useEffect(() => {
		getSchoolsByCity().then(e => e !== undefined && console.log(e))
		// console.log(selectCity)
	}, [selectCity, selectInstitutionType])

	const getContacts = async () => {
		const { data } = await axios.get(
			`${CONTACT_FORM_BASE_URL}/contacts.json`
		)

		const contactsData: ContactsInterface[] = []

		if (data) {
			Object.keys(data).map(key => {
				contactsData.push({
					id: key,
					...data[key][0]
				})
			})
			setContacts(contactsData)
		}
	}

	useEffect(() => {
		getContacts().then(e => e !== undefined && console.log(e))
	}, [])

	const getFormStatus = async () => {
		const { data } = await axios.get(`${CONTACT_FORM_BASE_URL}status.json`)

		if (data.status === 'on') {
			setEnabled(true)
		} else if (data.status === 'off') {
			setEnabled(false)
		}
	}

	useEffect(() => {
		getFormStatus().then(e => e !== undefined && console.log(e))
	}, [])

	const postOption = async () => {
		const { data } = await axios.post(`https://contact-form-2d4a6-default-rtdb.firebaseio.com/form_study.json`, formStudy)
	}

	const fetchData = async () => {
		try {
			const req1 = axios.get('https://contact-form-2d4a6-default-rtdb.firebaseio.com/form_study.json')
			const req2 = axios.get('https://contact-form-2d4a6-default-rtdb.firebaseio.com/form_payment.json')
			const req3 = axios.get('https://contact-form-2d4a6-default-rtdb.firebaseio.com/achievements.json')
			const req4 = axios.get('https://contact-form-2d4a6-default-rtdb.firebaseio.com/consultants.json')
			const req5 = axios.get('https://contact-form-2d4a6-default-rtdb.firebaseio.com/languages.json')

			const res = await Promise.all(
				[req1, req2, req3, req4, req5]
			)

			Object.keys(res[0].data).map(key=>{
				setFormStudyData(res[0].data[key])
			})

			Object.keys(res[1].data).map(key=>{
				setFormPaymentData(res[1].data[key])
			})

			Object.keys(res[2].data).map(key=>{
				setAchievementsData(res[2].data[key])
			})

			Object.keys(res[3].data).map(key=>{
				setConsultantsData(res[3].data[key])
			})

			Object.keys(res[4].data).map(key=>{
				setLanguagesData(res[4].data[key])
			})

		} catch (error) {
			console.log(error.message)
		}
	}

	useEffect(() => {
		fetchData().then(e => e !== undefined && console.log(e))
	}, [])

	return (
		<>
			<div className={styles.main}>
				<div className={styles.main__row}>
					<h1 className={styles.main__title}>
						Әлеуетті талапкердің жеке карточкасы/ Личная карточка потенциального
						абитуриента
					</h1>
					<p className={styles.main__text}>
						барлық деректерді жеке куәлік бойынша толтыру қажет / все данные
						заполнять по удостоверению личности*
					</p>
					<img className={styles.main__logo} src={Logo} alt='logo' />
					<button onClick={postOption}>click</button>
				</div>
				<div className={styles.wrapper}>
					<div className={styles.ContactForm}>
						{
							!enabled && (
								<Htag tag='h1' className='text-red-700 mb-4'>
									Регистрация временно приостановлена
								</Htag>
							)
						}
						<div className={styles.body}>
							<Htag className={styles.title} tag={'h1'}>
								Регистрация
							</Htag>
							<Formik
								initialValues={{
									firstName: '',
									lastName: '',
									patronymic: '',
									email: '',
									phone: '',
									socialStatus: '',
									regions: '',
									cities: '',
									institutionType: '',
									institutions: '',
									formStudy: '',
									educationProgram: '',
									achievements: '',
									formPayment: '',
									languages: '',
									consultantDepartment: '',
									yourQuestion: '',
									birthday: '',
									yourInstitution: ''
								}}
								onSubmit={async (values, { resetForm }) => {
									resetForm()
									const duplicateUser = contacts.find(contact => contact.phone.includes(values.phone) || contact.email.includes(values.email))

									if (!duplicateUser) {
										const data = {
											firstName:
												values.firstName.slice(0, 1).toUpperCase() +
												values.firstName.slice(1).toLowerCase(),
											lastName:
												values.lastName.slice(0, 1).toUpperCase() +
												values.lastName.slice(1).toLowerCase(),
											patronymic: values.patronymic.length
												? values.patronymic.slice(0, 1).toUpperCase() +
												values.patronymic.slice(1).toLowerCase()
												: 'не указано',
											email: values.email.toLowerCase(),
											phone: values.phone,
											birthday: value ? value.$d.toLocaleString().slice(0, 10) : 'не указано',
											socialStatus: values.socialStatus
												? values.socialStatus
												: 'не выбрано',
											regions: values.regions ? values.regions : 'не выбрано',
											cities: values.cities ? values.cities : 'не выбрано',
											institutionType: values.institutionType
												? values.institutionType
												: 'не выбрано',
											institutions: values.institutions
												? values.institutions
												: 'не выбрано',
											formStudy: values.formStudy
												? values.formStudy
												: 'не выбрано',
											educationProgram: values.educationProgram
												? values.educationProgram
												: 'не выбрано',
											achievements: values.achievements
												? values.achievements
												: 'не выбрано',
											formPayment: values.formPayment
												? values.formPayment
												: 'не выбрано',
											languages: values.languages
												? values.languages
												: 'не выбрано',
											consultantDepartment: values.consultantDepartment
												? values.consultantDepartment
												: 'не выбрано',
											yourQuestion: values.yourQuestion
												? values.yourQuestion
												: 'нет вопросов',
											yourInstitution: values.yourInstitution
												? values.yourInstitution
												: 'Указано в предыдущем пункте',
											created_at: new Date().toLocaleString('ru', options)
										}
										try {
											await axios.post(`${CONTACT_FORM_BASE_URL}contacts.json`, [
												data
											])
											await navigate('/successful-form')
											await resetForm()
										} catch (e) {
											console.warn(e)
										}

										return
									}
									navigate('/unsuccessful-form')
								}}
								validationSchema={validationSchema}
							>
								{({
										values,
										errors,
										touched,
										handleChange,
										handleBlur,
										isValid,
										handleSubmit,
										setFieldValue,
										dirty
									}) => (
									<form className={styles.form} onSubmit={handleSubmit}>
										{renderInputs(
											values,
											handleChange,
											handleBlur,
											touched,
											errors
										)}
										<LocalizationProvider dateAdapter={AdapterDayjs}>
											<Stack spacing={3} my={2.3}>
												<DesktopDatePicker
													label='Дата рождения'
													inputFormat='DD/MM/YYYY'
													value={value}
													onChange={handleChangeDatePicker}
													renderInput={(params) => (
														<TextField
															sx={{
																'& .MuiOutlinedInput-root': {
																	'& > fieldset': {
																		borderColor: '#e5e7eb'
																	}
																},
																input: {
																	fontFamily: 'Montserrat Alternates'
																},
																label: {
																	fontFamily: 'Montserrat Alternates',
																	backgroundColor: 'white',
																	fontSize: '16px',
																	color: '#374151'
																}
															}}
															{...params}
														/>
													)}
												/>
											</Stack>
										</LocalizationProvider>
										<CustomSelectForm
											styles={stylesSelect}
											className={cn('mb-4')}
											onChange={(value: { value: string; label: string }) =>
												setFieldValue('socialStatus', value.value)
											}
											options={socialStatus}
											value={values.socialStatus}
											placeholder={'Социальный статус'}
										/>
										<div
											className={cn(
												'w-full mb-4 relative',
												touched.regions && errors.regions && 'mb-8'
											)}>
											<CustomSelectForm
												styles={stylesSelect}
												className={'mb-0'}
												onChange={(value: { value: string; label: string }) => {
													setFieldValue('regions', value.label)
													setSelectRegion(value.value)
												}}
												options={regions}
												value={values.regions}
												placeholder={'Аймақ (Регион)'}
											/>
											{touched.regions && errors.regions && (
												<span className={styles.error}>{errors.regions}</span>
											)}
										</div>

										<div className={cn(
											'w-full mb-4 relative',
											touched.cities && errors.cities && 'mb-8'
										)}>
											<CustomSelectForm
												styles={stylesSelect}
												className={'mb-0'}
												onChange={(value: { value: string; label: string }) => {
													setFieldValue('cities', value.label)
													setSelectCity(value.value)
												}}
												options={regionsData ? regionsData : defaultValue}
												value={values.cities}
												placeholder={'Қала/кент/ауыл (Город/поселок/село)'}
											/>
											{touched.cities && errors.cities && (
												<span className={styles.error}>{errors.cities}</span>
											)}
										</div>

										<div className={cn(
											'w-full mb-4 relative',
											touched.institutionType && errors.institutionType && 'mb-8'
										)}>
											<CustomSelectForm
												styles={stylesSelect}
												className={'mb-0'}
												onChange={(value: { value: string; label: string }) => {
													setFieldValue('institutionType', value.label)
													setSelectInstitutionType(value.value)
												}}
												options={institutionType}
												value={values.institutionType}
												placeholder={'Вид учебного заведения'}
											/>
											{touched.institutionType && errors.institutionType && (
												<span className={styles.error}>{errors.institutionType}</span>
											)}
										</div>

										<div className={cn(
											'w-full mb-4 relative',
											touched.institutions && errors.institutions && 'mb-8'
										)}>
											<CustomSelectForm
												styles={stylesSelect}
												className={'mb-0'}
												onChange={(value: { value: string; label: string }) => {
													setFieldValue('institutions', value.value)
													// setSelectInstitutionType(value.value)
													// console.log(value.value)
												}}
												options={institutionsData ? institutionsData : defaultValue}
												value={values.institutions}
												placeholder={'Оқу орны (Учебное заведение)'}
											/>
											{touched.institutions && errors.institutions && (
												<span className={styles.error}>{errors.institutions}</span>
											)}
										</div>

										<div
											className={cn(
												'w-full mb-4 relative',
												touched.yourInstitution && errors.yourInstitution && 'mb-8'
											)}
										>
											<p className={'w-full'}>
												<ContactFormInput
													className={cn(styles.input, 'min-h-[50px] h-full pt-0 pb-4')}
													type={'text'}
													name={'yourInstitution'}
													value={values.yourInstitution}
													placeholder={'Если в списке выше отсутствует ваше учебное заведение укажите его здесь'}
													onChange={handleChange}
													onBlur={handleBlur}
												/>
											</p>
											{touched.yourInstitution && errors.yourInstitution && (
												<span className={styles.error}>{errors['yourInstitution']}</span>
											)}
										</div>

										<div className={cn(
											'w-full mb-4 relative',
											touched.formStudy && errors.formStudy && 'mb-8'
										)}>
											<CustomSelectForm
												styles={stylesSelect}
												className={'mb-0'}
												onChange={(value: { value: string; label: string }) => {
													setFieldValue('formStudy', value.label)
													setSelectFormStudy(value.value)
												}
												}
												options={formStudyData}
												value={values.formStudy}
												placeholder={'Оқу түрі (Форма обучения)'}
											/>
											{touched.formStudy && errors.formStudy && (
												<span className={styles.error}>{errors.formStudy}</span>
											)}
										</div>

										<CustomSelectForm
											styles={stylesSelect}
											className={'mb-4'}
											onChange={(value: { value: string; label: string }) =>
												setFieldValue('educationProgram', value.value)
											}
											options={educationList ? educationList : educationProgram}
											value={values.educationProgram}
											placeholder={
												'Болжамдық білім беру бағдарламасы (Предполагаемая группа образовательных программ)'
											}
										/>
										<CustomSelectForm
											styles={stylesSelect}
											className={'mb-4'}
											onChange={(value: { value: string; label: string }) =>
												setFieldValue('achievements', value.value)
											}
											options={achievementsData}
											value={values.achievements}
											placeholder={'Награды и достижение'}
										/>
										<CustomSelectForm
											styles={stylesSelect}
											className={'mb-4'}
											onChange={(value: { value: string; label: string }) =>
												setFieldValue('formPayment', value.value)
											}
											options={formPaymentData}
											value={values.formPayment}
											placeholder={
												'Предполагаемая форма оплаты за обучение в ВУЗе'
											}
										/>

										<div className={cn(
											'w-full mb-4 relative',
											touched.languages && errors.languages && 'mb-8'
										)}>
											<CustomSelectForm
												styles={stylesSelect}
												className={'mb-0'}
												onChange={(value: { value: string; label: string }) =>
													setFieldValue('languages', value.value)
												}
												options={languagesData}
												value={values.languages}
												placeholder={'Оқу тілі (Язык обучения)'}
											/>
											{touched.languages && errors.languages && (
												<span className={styles.error}>{errors.languages}</span>
											)}
										</div>

										<div className={cn(
											'w-full mb-4 relative',
											touched.consultantDepartment && errors.consultantDepartment && 'mb-8'
										)}>
											<CustomSelectForm
												styles={stylesSelect}
												className={'mb-0'}
												onChange={(value: { value: string; label: string }) =>
													setFieldValue('consultantDepartment', value.value)
												}
												options={consultantsData}
												value={values.consultantDepartment}
												placeholder={
													'Кафедра-консультант - от кого получена информация о ВУЗе)'
												}
											/>
											{touched.consultantDepartment && errors.consultantDepartment && (
												<span className={styles.error}>{errors.consultantDepartment}</span>
											)}
										</div>

										<textarea
											id='message'
											className={styles.textarea}
											name={'yourQuestion'}
											value={values.yourQuestion}
											onChange={handleChange}
											onBlur={handleBlur}
											placeholder='Сіздің сұрақ/жауап (Ваш вопрос/ответ)'
										></textarea>

										{
											enabled ? (
												<Button
													className={'w-full'}
													appearance={isValid && dirty ? 'green' : 'red'}
													rounded={'rounded'}
													type={'submit'}
												>
													Зарегистрироваться
												</Button>) : (
												<Button
													className={'w-full'}
													appearance={isValid && dirty ? 'green' : 'red'}
													rounded={'rounded'}
													type={'submit'}
													disabled={true}
												>
													Зарегистрироваться
												</Button>
											)
										}

									</form>
								)}
							</Formik>
						</div>
					</div>
					<div className={styles.info}>
						{/*<Button appearance={'dark'} rounded={'rounded'} onClick={getEducationProgram}>Add</Button>*/}
						<h3 className={styles.info__title}>Образовательные программы</h3>
						<div className={styles.info__row}>
							<Link
								className={styles.info__link}
								to={'/educational-programs/bakalavriat/educational-subcategory'}
							>
								Бакалавриат
							</Link>
							<Link
								className={styles.info__link}
								to={
									'/educational-programs/magistratura/educational-subcategory'
								}
							>
								Магистратура
							</Link>
							<Link
								className={styles.info__link}
								to={
									'/educational-programs/doktorantura/educational-subcategory'
								}
							>
								Докторантура
							</Link>
						</div>
					</div>
				</div>
				<ul className={styles.form__info}>
					<li className={styles.info__item}>
						После регистрации, в Личном кабинете вам будут доступны тесты
						Образовательных программ, тесты по предметам ЕНТ
					</li>
					<li className={styles.info__item}>
						1. Бакалавриат: тесты по Образовательным программам, тесты по
						предметам ЕНТ
					</li>
					<li className={styles.info__item}>
						2. Магистратура: тесты по иностранному языку, тесты на готовность к
						обучению, тесты по спец.дисциплинам
					</li>
					<li className={styles.info__item}>
						3. Докторантура: тесты на готовность к обучению, тесты по
						спец.дисциплинам
					</li>
				</ul>
			</div>
		</>
	)
}

export default ContactForm
