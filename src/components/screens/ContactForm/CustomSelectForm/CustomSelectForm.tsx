import { FC } from 'react'
import Select from 'react-select'

interface Props {
	onChange: any
	options: any
	value: any
	className: string
	placeholder: string
	styles?:any
}

const CustomSelectForm: FC<Props> = (props) => {
	const { onChange, options, value, placeholder, className, styles } = props

	const defaultValue = (options: { value: string | number, label: string | number }[], value: string | number = 1) => {
		return options ? options.find((option: any) => option.value === value) : 1
	}

	return (
		<div className={className}>
			<Select styles={styles}  className={className} value={defaultValue(options, value)} onChange={value => onChange(value)}
							options={options} placeholder={placeholder} />
		</div>
	)
}

export default CustomSelectForm
