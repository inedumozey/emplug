import { Envelope, FileText, MonitorPlay, Desktop, Users, FirstAidKit, Buildings  } from "phosphor-react";
import './pipeline-card.css';


function PipelineCard({addPipeline, id, title, setPipelineModal, ...otherProps}) {
	function onAddPipeline() {
		addPipeline({
			title,
			id,
			...otherProps
		});
		setPipelineModal(false);
	}
	return (
		<>
			<div onClick={onAddPipeline}  style={{ borderRadius: '4px', cursor: 'pointer', background: '#fafffe', display: 'flex', justifyContent: 'center', alignItems: 'center', width: '10rem', border: '1px solid #7f7f7f', height: '10rem', margin: '1rem'}}>
				<div style={{textAlign: 'center'}}>
					{ title.toLowerCase() === 'Application Form'.toLowerCase() && <FileText size={38} />}
					{ title.toLowerCase() === 'Interview'.toLowerCase() && <MonitorPlay  size={38} />}
					{ title.toLowerCase() === 'Official Letter'.toLowerCase() && <Envelope  size={38} />}
					{ title.toLowerCase() === 'CBT'.toLowerCase() && <Desktop  size={38} />}
					{ title.toLowerCase() === 'Terms and conditions'.toLowerCase() && <Users size={38} />}
					{ title.toLowerCase() === 'Medicals'.toLowerCase() && <FirstAidKit size={38} />}
					{ title.toLowerCase() === 'Institutions'.toLowerCase() && <Buildings size={38} />}
					<p style={{fontSize: '0.6rem', }}>{title}</p>
				</div>
			</div>
		</>
	)
}


export default PipelineCard;