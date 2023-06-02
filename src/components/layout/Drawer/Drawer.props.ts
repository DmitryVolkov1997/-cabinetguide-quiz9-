import { DetailedHTMLProps, HTMLAttributes } from 'react'

export interface DrawerProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>{
	isOpen: boolean
	onClick: () => void
}