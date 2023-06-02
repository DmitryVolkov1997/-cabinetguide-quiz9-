import {
	ChangeEvent,
	DetailedHTMLProps,
	FormEvent,
	HTMLAttributes
} from 'react'

export interface AuthProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
	onChangeEmail: (value: string) => void
	email: string
	onChangePassword: (value: string) => void
	password: string
	handleSubmit: (e: FormEvent<HTMLFormElement>) => void
	handleChecked: (e: ChangeEvent<HTMLInputElement>) => void
	checked: boolean
	error: boolean
}