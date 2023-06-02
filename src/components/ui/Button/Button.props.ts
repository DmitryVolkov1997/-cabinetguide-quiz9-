import { DetailedHTMLProps, HTMLAttributes, ReactNode } from 'react'

export interface ButtonProps extends DetailedHTMLProps<HTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
	children: ReactNode
	appearance: 'dark' | 'green' | 'red'
	rounded: 'full' | 'rounded'
	type?: 'button' | 'submit'
	disabled?: boolean
}