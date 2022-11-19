import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import CustomButton from "../CustomButton/custom-button";
import { Envelope, FileText, MonitorPlay,TrashSimple, Desktop, Users, FirstAidKit, Buildings } from "phosphor-react";
import pageRoutes from '../../../routes';
import './pipelineViewCard.css';

function PipelineViewCard({id, title, index, route, activePipeline, setSelected, setEntered, removePipeline}) {
	const [showModal, setShowModal] = useState(false);
	const [isActive, setIsActive] = useState('');
	function handleDragStart(ev) {
		setSelected(title);
	}
	function handleDragOver(ev) {
		setEntered(title);
	}



	// console.log(isActive)

	return (
		<>
			<div 
				className="shadow" 
				draggable 
				onDragStart={handleDragStart}
				onDragEnter={handleDragOver}
				style={{ 
					cursor: 'move', 
					position: 'relative', 
					borderRadius: '4px', 
					background: '#fafffe', 
					display: 'flex', 
					flexDirection: 'column', 
					justifyContent: 'center', 
					alignItems: 'center', 
					width: '10rem',  
					height: '10rem', 
					margin: '1rem'
				}}>
				<label className="switch" title='Toggle pipeline activation'>
					<input type="checkbox"  onChange={(e) => {
						if(isActive === 'on') {
							activePipeline(isActive, index);
							return setIsActive('')
						}
						if(isActive === '') {
							activePipeline(isActive, index);
							return setIsActive(e.target.value)
						}
					}} />
					<span className={`slider round ${isActive === 'on' ? 'slider-active' : ''}`} ></span>
				</label>
				<p 
					onClick={() => removePipeline(title)}
					style={{ cursor: 'pointer', position: 'absolute', top: '5px', right: '15px', color: 'red'}}>
					<TrashSimple size={10} />
				</p>
				<div style={{textAlign: 'center', paddingTop: '1rem', color: '#7f7f7f'}}>
					{ title.toLowerCase() === 'Application Form'.toLowerCase() && <FileText size={38} />}
					{ title.toLowerCase() === 'Interview'.toLowerCase() && <MonitorPlay  size={38} />}
					{ title.toLowerCase() === 'Official Letter'.toLowerCase() && <Envelope  size={38} />}
					{ title.toLowerCase() === 'CBT'.toLowerCase() && <Desktop  size={38} />}
					{ title.toLowerCase() === 'Terms and conditions'.toLowerCase() && <Users size={38} />}
					{ title.toLowerCase() === 'Medicals'.toLowerCase() && <FirstAidKit size={38} />}
					{ title.toLowerCase() === 'Institutions'.toLowerCase() && <Buildings size={38} />}
					<p style={{fontSize: '0.8rem', color: '#7f7f7f', margin: 0 }}>{title}</p>
				</div>
				<Link to={route} style={{
					width: '100%',
					display: 'flex',
					justifyContent: 'center'
				}}>
					<CustomButton 
						style={{
							width: '80%', 
							height: '', 
							fontSize: '0.7rem', 
							background: `${isActive ? 'red' : '#00b500'}`
						}}>setup</CustomButton>
				</Link>
			</div>
		</>
	)
}


export default PipelineViewCard;