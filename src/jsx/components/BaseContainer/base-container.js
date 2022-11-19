import { Trash,  } from 'phosphor-react';

function BaseContainer(props) {
	return (
		<>

		<div 
			className="card" 
			draggable 
			style={{ 
				postion: 'relative', 
				borderRadius: '4px', 
				marginBottom: '1rem', 
				padding: '3rem', 
				cursor: 'move', 
				border: '1px dotted #7f7f7f'
			}}
			onDragEnd={e => props.setSelected(props.title)}
			onDragOver={e => props.setEntered(props.title)}
		>
				
			<Trash
				size={18} 
				style={{
					color: 'red', 
					position: 'absolute', 
					right: '3rem', 
					top: '1rem', 
					cursor: 'pointer'
				}} 
				onClick={(e) => props.removeFromDisplayEl(props.title)}
			/>
			{props.children}
		</div>

		</>
	);
}

export default BaseContainer;