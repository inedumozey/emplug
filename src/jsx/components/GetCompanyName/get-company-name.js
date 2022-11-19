import { useEffect, useState } from 'react';
import axios from 'axios';

function GetCompanyName(props) {
	const [value, setValue] = useState(null);
	
	async function fetchAuthor() {
		const user = await axios.get(`https://employment-centers.herokuapp.com/api/v1/organization/fetch-user-organization?userId=${props.orgId}`, {
				headers: {
					'authorization': `Bearer ${props.token}`,
					'Content-Type': 'application/json'
				}
			});
			setValue(user.data.data);
	}

	useEffect(() => {
		if (value) return;
		fetchAuthor();
	}, [value]);

	console.log(value);
	console.log(props)

	return value;
}

export default GetCompanyName;