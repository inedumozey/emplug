import axios from 'axios';
import swal from 'sweetalert';


// const API_URL = 'https://employment-centers.herokuapp.com/api/v1';
let API_URL;
if (process.env.NODE_ENV === 'development') {
  API_URL = process.env.REACT_APP_EMPLOYER_CENTER_LOCAL_API;
} else {
  API_URL = process.env.REACT_APP_EMPLOYER_CENTER_API;
}



export function createJobPosting(data, userId, token) {
	return axios.post(`${API_URL}/job/new`, data, {
		headers: {
			'authorization': `Bearer ${token}`,
			'Content-Type': 'application/json'
		}
	});
}

export function updateJob(data, jobId, token) {
	return axios.put(`${API_URL}/job/update/${jobId}`, data, {
		headers: {
			'authorization': `Bearer ${token}`,
			'Content-Type': 'application/json'
		}
	});
}


export function getOrganisationJobPosting(id, token) {
	return axios.get(`${API_URL}/job/user/${id}`, {
		headers: {
			'authorization': `Bearer ${token}`,
			'Content-Type': 'application/json'
		}
	});
}

export function deleteJobPosting(id, token) {
	return axios.delete(`${API_URL}/job/delete/${id}`, {
		headers: {
			'authorization': `Bearer ${token}`,
			'Content-Type': 'application/json'
		}
	});
}

export function getAllJobPosting(token) {
	return axios.get(`${API_URL}/job/all`, {
		headers: {
			'authorization': `Bearer ${token}`,
			'Content-Type': 'application/json'
		}
	});
}

export function httpPostNewForm(data, token) {
	return axios.post(`${API_URL}/form/new`, data, {
		headers: {
			'authorization': `Bearer ${token}`,
			'Content-Type': 'application/json'
		}
	});
}


// export function message(errorResponse) {
//     switch (errorResponse.message) {
//         case "Sorry this account is inactive":
//             swal("Oops", "Sorry this account is inactive", "info");
//             break;

//         case "Invalid password":
//             //return 'Email already exists';
//             swal("Oops", "Invalid password", "error");
//             break;
//         case 'EMAIL_NOT_FOUND':
//             //return 'Email not found';
//            swal("Oops", "Email not found", "error",{ button: "Try Again!",});
//            break;
//         case 'INVALID_PASSWORD':
//             //return 'Invalid Password';
//             swal("Oops", "Invalid Password", "error",{ button: "Try Again!",});
//             break;
//         case 'USER_DISABLED':
//             return 'User Disabled';
//         case 'WEAK_PASSWORD : Password should be at least 6 characters':
//             //return 'Weak Password';
//             swal("Oops", errorResponse.message.split(':')[1], "error",{ button: "Try Again!",});
//             break;

//         default:
//             return '';
//     }
// }