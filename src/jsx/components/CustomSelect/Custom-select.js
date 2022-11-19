


function CustomSelect({title, data, placeholder, ...otherProps}) {
	return (
		<>
			<label style={{fontWeight: 'bold', color: '#7f7f7f'}}>{title}</label>
			<select className="form-control"  {...otherProps}>
				<option value="">{placeholder}</option>

				{
					data.length > 0 && 
					(
						title.toLowerCase() === 'Job Location *'.toLowerCase() ||
						title.toLowerCase() === 'State *'.toLowerCase() ||
						title.toLowerCase() === 'State of origin'.toLowerCase() ||
						title.toLowerCase() === 'State of residence'.toLowerCase() ||
						title.toLowerCase() === 'LGA of origin'.toLowerCase() ||
						title.toLowerCase() === 'LGA of residence'.toLowerCase() ||
						title.toLowerCase() === 'Country *'.toLowerCase() ||
						title.toLowerCase() === 'Country'.toLowerCase() ||
						title.toLowerCase() === 'LGA *'.toLowerCase() ||
						// placeholder.toLowerCase() === 'Location'.toLowerCase() ||
						title.toLowerCase() === 'Location'.toLowerCase() ||
						title.toLowerCase() === 'Location *'.toLowerCase() ||
						title.toLowerCase() === 'Education *'.toLowerCase() ||
						title.toLowerCase() === 'Coordinator'.toLowerCase() ||
						title.toLowerCase() === 'Sub-Coordinators'.toLowerCase() ||
						title.toLowerCase() === 'Score Type *'.toLowerCase() ||
						title.toLowerCase() === 'Location Type *'.toLowerCase() 
					) &&
					data.map((item, index) => (
						<option value={(title.toLowerCase() === 'Coordinator'.toLowerCase() || title.toLowerCase() === 'Sub-Coordinators'.toLowerCase()) ? item.id : item.name} key={index.toString()}>{item && item.name.toUpperCase()}</option>
					))
				}
				{
					data.length > 0 && 
					(
						title.toLowerCase() === 'Category'.toLowerCase() || 
						title.toLowerCase() === 'Date *'.toLowerCase() ||
						title.toLowerCase() === ''.toLowerCase() ||
						title.toLowerCase() === 'Employment type'.toLowerCase() ||
						title.toLowerCase() === 'Start date *'.toLowerCase() ||
						title.toLowerCase() === 'End date (or expected)'.toLowerCase() ||
						title.toLowerCase() === 'Select Industry'.toLowerCase() ||
						title.toLowerCase() === 'Gender'.toLowerCase() ||
						title.toLowerCase() === 'Marital Status'.toLowerCase() ||
						title.toLowerCase() === 'Industry'.toLowerCase() ||
						title.toLowerCase() === 'Industry *'.toLowerCase() ||
						title.toLowerCase() === 'Which type of employment are you available for?'.toLowerCase() ||
						title.toLowerCase() === 'Which working schedule are you available for?'.toLowerCase() ||
						title.toLowerCase() === 'What is your year of experience in this industry?'.toLowerCase() 
					) && 
					data.map((item, index) => (
						<option value={item.toLowerCase()} key={index.toString()}>{item}</option>
						))
					}
			
			</select>
		</>
	)
}


export default CustomSelect;