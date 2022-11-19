



function CustomCheckBox({item, option, setOption}) {
	return (
		<div 
			onClick={() => setOption(item.toLowerCase())}
			className={`salary-options ${option.toLowerCase() === item.toLowerCase() && 'salary-options-selected'}`} 
		>
			<p style={{margin: 0}}>{item}</p>
		</div>
	);
}

export default CustomCheckBox;