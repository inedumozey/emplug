import CustomNav from '../../layouts/nav/CustomNav';
import ProfilePicture from '../../../images/svg/user.svg'
import CustomButton from '../../components/CustomButton/custom-button';
import CustomInput from '../../components/CustomInput/custom-input';

import { Paperclip } from 'phosphor-react';


function Messages(props) {
	const users = [
		{
			fullName: "Darlene Black",
			messages: ["Display last message..."]
		},
		{
			fullName: "Theresa Steward",
			messages: ["some messages..."]
		},
		{
			fullName: "Brandon Wilson",
			messages: ["Hey"]
		},
		{
			fullName: "Kyle Fisher",
			messages: ["Very soon"]
		},
		{
			fullName: "Audrey Alexander",
			messages: ["At enugu."]
		},
		{
			fullName: "Design Conference",
			messages: ["I understand"]
		},
	]
	return (
		<>
			<CustomNav />

			<div className='d-flex justify-content-center p-5' style={{marginTop: '1rem'}}>
				<div className='col-lg-4 mx-2 p-0' style={{borderRadius: '0.4rem'}}>
				<div className=' ' style={{borderRadius: '0.4rem', background: '#FCFDFD'}}>
					<h4 style={{color: '#7f7f7f'}} className='p-3'>Chats</h4>
					<div className='w-100'>
						{
							users.map((item, i) => (
								<div key={i.toString()} className='w-100 p-3 d-flex' style={{ height: '7rem', borderTop: '1px solid #eee', cursor: 'pointer'}}>
										<div style={{ width: '5rem', height: '5rem'}}>
											<img src={ProfilePicture} alt="..." className='w-100'/>
										</div>
										<div className='p-3'>
											<h4>{item.fullName}</h4>
											<p>{item.messages[item.messages.length - 1]}</p>
										</div>
								</div>
							))
						}
					</div>
				</div>
					<div className='w-100 p-4 px-0 pb-0 d-flex justify-content-center'>
						<div className='p-3 w-100 d-flex justify-content-center' style={{ background: 'white'}}>
							<CustomButton>Start New Chat</CustomButton>
						</div>
					</div>
					</div>
				<div className='col-lg-6 p-3 mx-2 p-0' style={{
					background: 'white', 
					borderRadius: '0.4rem', 
					padding: 0,
					overflow: 'hidden'
					}}
				>
					<div className='w-100' style={{ height: '80%'}}>
						
					</div>
					<div className='w-100 p-0 d-flex' style={{ height: '20%', position: 'relative'}}>
						<div className='w-100 ' style={{position: 'relative'}}>

							<div className='d-flex align-items-center' style={{
								position: 'absolute', 
								bottom: 0, 
								padding: '2rem', 
								width: '100%',
								margin: 0,
							}}>

								<CustomInput 
									placeholder="Write your message"
									style={{
										// position: 'absolute', 
										bottom: 0, 
										padding: '2rem', 
										width: '100%',
										margin: 0,
									}}
								/>
								<Paperclip size={32} style={{color: '#eee', marginLeft: '1rem'}}/>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}


export default Messages;