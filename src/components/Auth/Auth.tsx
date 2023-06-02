import { FC } from 'react'
import styles from './Auth.module.scss'
import Background from '@/assets/images/bg-auth.svg'
import { AuthProps } from '@/components/Auth/Auth.props'

const Auth: FC<AuthProps> = (props) => {
	const { onChangeEmail, email, onChangePassword, password, handleSubmit, handleChecked, checked, error } = props

	return (
		<section className={styles.auth}>
			<div className={styles.auth__container}>
				<div className={styles.auth__row}>
					<div className={styles.auth__left}>
						<img className={styles.auth__bg} src={Background} alt='background' />
					</div>
					<div className={styles.auth__right}>
						<form onSubmit={handleSubmit}>
							{error && <div className='mb-1 text-red-600 text-xl font-semibold'>Не верный email или пароль</div>}
							<div className='mb-6'>
								<input
									type='email'
									className={styles.auth__input}
									placeholder='Email'
									onChange={(e) => onChangeEmail(e.target.value)}
									value={email}
								/>
							</div>

							<div className='mb-6'>
								<input
									type='password'
									className={styles.auth__input}
									placeholder='Пароль'
									onChange={(e) => onChangePassword(e.target.value)}
									value={password}
								/>
							</div>

							<div className={styles.auth__bottom}>
								<div className='form-group form-check'>
									<input
										type='checkbox'
										className={styles.auth__checkbox}
										id='exampleCheck2'
										onChange={handleChecked}
										checked={checked}
										name={'input-remember'}
									/>
									<label className={styles.auth__label} htmlFor='exampleCheck2'
									>Запомнить меня</label
									>
								</div>
								<a
									href='#'
									className='text-blue-600 hover:text-blue-700 focus:text-blue-700 active:text-blue-800 duration-200 transition ease-in-out'
								>Забыли пароль?</a
								>
							</div>

							<button
								type='submit'
								className='inline-block px-7 py-3 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out w-full'
								data-mdb-ripple='true'
								data-mdb-ripple-color='light'

							>
								Войти
							</button>

							<div
								className={styles.auth__border}
							>
								<p className={styles.auth__link}>https://abt.kstu.kz/</p>
							</div>
						</form>
					</div>
				</div>
			</div>
		</section>
	)
}

export default Auth
