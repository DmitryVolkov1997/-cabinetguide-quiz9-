import { DetailedHTMLProps, HTMLAttributes } from 'react'

export interface ContactFormInputProps extends DetailedHTMLProps<HTMLAttributes<HTMLInputElement>, HTMLInputElement> {
	type: string
	name: string
	value: string
	placeholder:any
}