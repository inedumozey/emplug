import { useState, useEffect } from 'react';
import axios from 'axios';

function GetApplicantionId(props) {
	const [value, setValue] = useState();
	
	async function fetchApplicationId() {
		const user = await axios.post(`${process.env.NODE_ENV === 'development' ? process.env.REACT_APP_EMPLOYER_CENTER_LOCAL_API : process.env.REACT_APP_EMPLOYER_CENTER_API}/shortlist/applicant-id`, {
			jobId: props.jobId,
			userId: props.id
		},
		{
				headers: {
					'authorization': `Bearer ${props.token}`,
					'Content-Type': 'application/json'
				}
			});
			setValue(user.data.data);
			// console.log(user.data.data)
			// props.setOrgDetails(user.data.data);
	}

	useEffect(() => {
		if (value) return;
		fetchApplicationId();
	}, [value]);
	return <strong>{value}</strong>
}

export default GetApplicantionId;