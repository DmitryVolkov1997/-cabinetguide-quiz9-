import { DetailedHTMLProps, HTMLAttributes } from 'react'

export interface BackdropProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
	isOpen: boolean
	onClick: () => void
}