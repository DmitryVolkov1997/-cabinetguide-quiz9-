import { DetailedHTMLProps, HTMLAttributes } from 'react'

export interface EducationProgramItemProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
	id?: string
	to: string
	label: string
}