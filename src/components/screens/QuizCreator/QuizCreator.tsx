import React, { ChangeEvent, FC, FormEvent, MouseEvent, useState } from 'react'
import styles from './QuizCreator.module.scss'
import cn from 'classnames'
import { IoMdCopy } from 'react-icons/io'
import { QuizCreatorProps } from '@/components/screens/QuizCreator/QuizCreator.props'
import Htag from '@/components/Htag/Htag'
import { Formik } from 'formik'
import * as yup from 'yup'
import Input from '@/components/screens/QuizCreator/Input/Input'
import Button from '@/components/ui/Button/Button'
import { IQuiz } from '@/shared/interfaces/quiz.interface'
import axios from 'axios'
import { QUIZ_BASE_URL } from '@/configs/constants'
import CustomSelect from '@/components/screens/QuizCreator/CustomSelect/CustomSelect'
import { institutionType, options, subcategoryType } from '@/components/screens/QuizCreator/options'
import { getDownloadURL, ref, uploadBytesResumable } from '@firebase/storage'
import { storage } from '@/firebase'
import { useClipboard } from 'use-clipboard-copy'
import Auth from '@/components/Auth/Auth'

const inputs = [
	{ type: 'text', name: 'title' },
	{ type: 'text', name: 'question' },
	{ type: 'text', name: 'answerOne' },
	{ type: 'text', name: 'answerTwo' },
	{ type: 'text', name: 'answerThree' },
	{ type: 'text', name: 'answerFour' },
	{ type: 'text', name: 'answerFive' }
]

const renderLabel = (name: string) => {
	switch (name) {
		case 'title':
			return 'Название предмета'
		case 'question':
			return 'Вопрос'
		case 'answerOne':
			return 'Вариант A'
		case 'answerTwo':
			return 'Вариант B'
		case 'answerThree':
			return 'Вариант C'
		case 'answerFour':
			return 'Вариант D'
		case 'answerFive':
			return 'Вариант E'
		default :
			return <></>
	}
}

const getPasswordFromLocalStorage = () => {
	if (localStorage.getItem('email') && localStorage.getItem('password')) {
		return localStorage.getItem('password') as string
	}

	return ''
}

const getEmailFromLocalStorage = () => {
	if (localStorage.getItem('email') && localStorage.getItem('password')) {
		return localStorage.getItem('email') as string
	}

	return ''
}

const QuizCreator: FC<QuizCreatorProps> = (props): JSX.Element => {
	const {} = props

	const [quiz, setQuiz] = useState<IQuiz[]>([])

	const [educationProgram, setEducationProgram] = useState<string>('')
	const [educationSubcategory, setEducationSubcategory] = useState<string>('')

	const [progress, setProgress] = useState(0)
	const [imgUrl, setImgUrl] = useState('')

	const clipboard = useClipboard()

	const [email, setEmail] = useState<string>(getEmailFromLocalStorage)
	const [password, setPassword] = useState<string>(getPasswordFromLocalStorage)
	const [show, setShow] = useState(false)
	const [checked, setChecked] = useState<boolean>(false)
	const [showError, setShowError] = useState<boolean>(false)
	const handleEmail = (value: string) => {
		setEmail(value)
	}

	const handlePassword = (value: string) => {
		setPassword(value)
	}

	const handleChecked = (e: ChangeEvent<HTMLInputElement>) => {
		setChecked(!checked)
	}

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()

		if (email === 'abt@mail.ru' && password === 'abt') {
			setShow(true)
			setShowError(false)

			if (checked) {
				localStorage.setItem('password', password)
				localStorage.setItem('email', email)
			}
		} else {
			setShowError(true)
		}
	}

	const formHandler = (e: any) => {
		e.preventDefault()

		const file = e.target[0].files[0]
		uploadFiles(file)
	}

	const uploadFiles = (file: any) => {
		if (!file) return
		const storageRef = ref(storage, `/files/${file.name}`)
		const uploadTask = uploadBytesResumable(storageRef, file)

		uploadTask.on(
			'state_changed',
			(snapshot) => {
				const prog =
					Math.round(snapshot.bytesTransferred / snapshot.totalBytes) * 100
				setProgress(prog)
			},
			(err) => console.log(err),
			() => {
				getDownloadURL(uploadTask.snapshot.ref).then((url) => setImgUrl(`<img src='${url}' alt='изображение' />`))
			}
		)
	}

	const validationSchema = yup.object().shape({
		title: yup
			.string()
			.typeError('Должно быть строкой'),
		question: yup
			.string()
			.typeError('Должно быть строкой')
			.required('Обязательное поле'),
		answerOne: yup
			.string()
			.typeError('Должно быть строкой')
			.required('Обязательное поле'),
		answerTwo: yup
			.string()
			.typeError('Должно быть строкой')
			.required('Обязательное поле'),
		answerThree: yup
			.string()
			.typeError('Должно быть строкой')
			.required('Обязательное поле'),
		answerFour: yup
			.string()
			.typeError('Должно быть строкой')
			.required('Обязательное поле'),
		answerFive: yup
			.string()
			.typeError('Должно быть строкой')
			.required('Обязательное поле')
	})

	const renderInputs = (values: any, handleChange: any, handleBlur: any, touched: any, errors: any) => {
		return inputs.map((input, idx) => {
			return (
				<div key={idx} className={cn('w-full mb-3 relative', touched[input.name] && errors[input.name] && 'mb-6')}>
					<p className={'w-full'}>
						<label
							className={styles.label}
							htmlFor={input.name}
						>
							{renderLabel(input.name)}
						</label>
						<Input className={styles.input} type={input.type} name={input.name} value={values[input.name]}
									 onChange={handleChange}
									 onBlur={handleBlur} />
					</p>
					{touched[input.name] && errors[input.name] && (
						<span className={styles.error}>{errors[input.name]}</span>
					)}
				</div>
			)
		})
	}

	const renderEducationProgram = () => {
		if (educationProgram === 'Бакалавриат' && educationSubcategory === 'Предметы ЕНТ(полное обучение)') {
			return 'bakalavriat/ent'
		}
		if (educationProgram === 'Бакалавриат' && educationSubcategory === 'Тесты на определение готовности к обучению') {
			return 'bakalavriat/gotovnost'
		}

		if (educationProgram === 'Бакалавриат' && educationSubcategory === 'Другое') {
			return 'bakalavriat/other'
		}
		//End Бакалавриат

		if (educationProgram === 'Магистратура' && educationSubcategory === 'Тесты на определение готовности к обучению') {
			return 'magistratura/gotovnost'
		}

		if (educationProgram === 'Магистратура' && educationSubcategory === 'Другое') {
			return 'magistratura/other'
		}
		//End Магистратура

		if (educationProgram === 'Докторантура' && educationSubcategory === 'Тесты на определение готовности к обучению') {
			return 'doktorantura/gotovnost'
		}

		if (educationProgram === 'Докторантура' && educationSubcategory === 'Другое') {
			return 'doktorantura/other'
		}
		//End Докторантура

		return 'deleted'
	}

	const onClickCreateQuiz = async (e: MouseEvent<HTMLButtonElement>) => {
		e.preventDefault()

		try {
			await axios.post(`${QUIZ_BASE_URL}/quizes/${renderEducationProgram()}.json`, quiz)
			setQuiz([])
		} catch (e) {
			console.warn(e)
		}
	}

	return (
		<>
			{
				show ? <div className={styles.QuizCreator}>
					<div className={styles.row}>
						<div className={styles.body}>
							<Htag className={styles.title} tag={'h1'}>Создать тест</Htag>
							<Htag className={'block w-full text-right font-semibold text-cyan-600'} tag={'h3'}>Вопрос
								- {quiz.length + 1}</Htag>
							<Formik initialValues={{
								title: '',
								institutionType: 'Бакалавриат',
								subcategoryType: 'Предметы ЕНТ(полное обучение)',
								question: '',
								answerOne: '',
								answerTwo: '',
								answerThree: '',
								answerFour: '',
								answerFive: '',
								rightAnswerId: 1
							}} validateOnBlur onSubmit={(values, { resetForm }) => {
								const quizConcat: IQuiz[] = [...quiz]
								const idx = quizConcat.length + 1

								const questionItem = {
									question: values.question,
									id: idx,
									rightAnswerId: +values.rightAnswerId,
									title: values.title,
									institutionType: values.institutionType,
									subcategoryType: values.subcategoryType,
									answers: [
										{ text: values.answerOne, id: 1 },
										{ text: values.answerTwo, id: 2 },
										{ text: values.answerThree, id: 3 },
										{ text: values.answerFour, id: 4 },
										{ text: values.answerFive, id: 5 }
									]
								}

								quizConcat.push(questionItem)

								if (idx === 1) {
									setEducationProgram(values.institutionType)
									setEducationSubcategory(values.subcategoryType)
								}

								setQuiz(quizConcat)
								resetForm()
							}} validationSchema={validationSchema}>
								{({
										values,
										errors,
										touched,
										handleChange,
										handleBlur,
										handleSubmit,
										setFieldValue
									}) => (
									<form className={styles.form} onSubmit={handleSubmit}>
										<label
											className={styles.label}
										>
											Образовательная программа
										</label>
										<CustomSelect className={'mb-4'}
																	onChange={(value: { value: number, label: number }) => setFieldValue('institutionType', value.value)}
																	options={institutionType}
																	value={values.institutionType} />
										<label
											className={styles.label}
										>
											Подкатегории
										</label>
										<CustomSelect className={'mb-4'}
																	onChange={(value: { value: number, label: number }) => setFieldValue('subcategoryType', value.value)}
																	options={subcategoryType}
																	value={values.subcategoryType} />
										{renderInputs(values, handleChange, handleBlur, touched, errors)}
										<CustomSelect className={styles.select}
																	onChange={(value: { value: number, label: number }) => setFieldValue('rightAnswerId', value.value)}
																	options={options}
																	value={values.rightAnswerId} />
										<Button className={cn('mt-5')} appearance={'green'} rounded={'rounded'}
														disabled={!(!!values.question.length && !!values.answerOne.length && !!values.answerTwo.length && !!values.answerThree.length && !!values.answerFour && !!values.answerFive.length)}
														type={'submit'}>Добавить
											вопрос</Button>
										<Button className={cn('mt-5')} appearance={'dark'} onClick={onClickCreateQuiz} rounded={'rounded'}
														disabled={!quiz.length}>Создать
											тест
											вопрос</Button>
									</form>
								)}
							</Formik>
						</div>
						<div>

						</div>
						<form className={styles.uploadForm} onSubmit={formHandler}>
							<label htmlFor='dropzone-file'
										 className='flex flex-col justify-center items-center w-full h-64 bg-gray-50 rounded-lg border-2 border-gray-300 border-dashed cursor-pointer hover:bg-gray-100'>
								<div className='flex flex-col justify-center items-center pt-5 pb-6'>
									<svg aria-hidden='true' className='mb-3 w-10 h-10 text-gray-400' fill='none' stroke='currentColor'
											 viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'>
										<path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2'
													d='M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12'></path>
									</svg>
									<p className='mb-2 text-md text-gray-500'><span
										className='font-semibold'>Нажмите чтобы загрузить</span> или перетащите</p>
									<p className='text-md font-semibold text-gray-500'>PNG или GIF</p>
								</div>

								<input id='dropzone-file' type='file' className='hidden' />
								<button
									type='submit'
									className='flex items-center justify-center w-full px-4 py-2 text-white transition-colors duration-300 transform bg-blue-600 rounded-md focus:outline-none sm:w-auto sm:mx-1 hover:bg-blue-500 focus:bg-blue-500 focus:ring focus:ring-blue-300 focus:ring-opacity-40 relative z-40'
								>
									<svg
										xmlns='http://www.w3.org/2000/svg'
										className='w-5 h-5 mx-1'
										fill='none'
										viewBox='0 0 24 24'
										stroke='currentColor'
									>
										<path
											strokeLinecap='round'
											strokeLinejoin='round'
											strokeWidth='2'
											d='M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12'
										/>
									</svg>
									<span className='mx-1'>Upload {progress} %</span>
								</button>
							</label>
							<div>
								<input ref={clipboard.target} value={imgUrl} readOnly />
								<IoMdCopy onClick={clipboard.copy} size={30} />
							</div>
						</form>
					</div>
				</div> : <Auth onChangeEmail={handleEmail} email={email} onChangePassword={handlePassword} password={password}
											 handleSubmit={handleSubmit} handleChecked={handleChecked} checked={checked} error={showError}/>
			}
		</>
	)
}

export default QuizCreator
