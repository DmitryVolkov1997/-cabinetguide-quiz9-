import { DetailedHTMLProps, HTMLAttributes, ReactNode } from 'react'

export interface ModalProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
	children: ReactNode
	title: string
	isOpen: boolean
	closeModal: () => void
}