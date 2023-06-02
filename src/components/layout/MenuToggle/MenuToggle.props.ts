import { DetailedHTMLProps, HTMLAttributes } from 'react'

export interface MenuToggleProps extends DetailedHTMLProps<HTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
	isOpen: boolean
	onClick: () => void
}