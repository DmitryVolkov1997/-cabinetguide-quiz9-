import { FC } from 'react'
import Select from 'react-select'

interface Props {
	onChange: any
	options: any
	value: any
	className: string
}

const CustomSelect: FC<Props> = (props) => {
	const { onChange, options, value, className } = props

	const defaultValue = (options: { value: string | number, label: string | number }[], value: string | number = 1) => {
		return options ? options.find((option: any) => option.value === value) : 1
	}

	return (
		<div className={className}>
			<Select value={defaultValue(options, value)} onChange={value => onChange(value)}
							 options={options} />
		</div>
	)
}

export default CustomSelect
