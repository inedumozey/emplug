



function FormBuilderCard(props) {

	function updateState() {
		props.addToDisplayEl(props.item);
	}

	return (
		<>
			<div style={{ 
				border: '1px dotted #eee', 
				padding: '1rem', 
				margin: '0.8rem',
				color: '#7f7f7f',
				cursor: 'pointer'
			}} 
				onDragEnd={updateState}
				draggable
			>
				{props.icon}
				<span style={{marginLeft: '0.8rem'}}>
					{props.title}
				</span>
			</div>
		</>
	);
}

export default FormBuilderCard;