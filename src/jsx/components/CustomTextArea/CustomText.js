


function CustomTextArea({title, ...otherProps}) {
	return (
		<>
			<label style={{fontWeight: 'bold', color: '#7f7f7f'}}>{title}</label>
			<div>
				<textarea  className="form-control" {...otherProps}>
				</textarea>
			</div>
		</>
	)
}


export default CustomTextArea;