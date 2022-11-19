


function CustomInput({ title, ...otherProps }) {
	return (
		<>
			{title && <label className="mb-1" style={{ color: '#7f7f7f'}}><strong>{title}</strong></label>}
			<input
				className="form-control"
				autoComplete="off"
				{...otherProps}
			/>
		</>
	)
}


export default CustomInput;