import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link, useParams } from "react-router-dom";

import { Modal } from "react-bootstrap";

import { getAllUsers } from "../../../services/Organisation";
import CustomButton from "../../components/CustomButton/custom-button";
import AllStatus from "../../components/Jobick/Applications/AllStatus";
import CandidateStatus from "../../components/Jobick/Applications/CandidateStatus";
import CustomNav from "../../layouts/nav/CustomNav";
import CustomInput from "../../components/CustomInput/custom-input";


function CreatePipeline(props) {
    const [analyticSection, setAnalyticSection] = useState('all applicants')
    const [users, setUsers] = useState([])
    const [show, setShow] = useState(false)
    const params = useParams();

    const [title, setTitle] = useState('')
    const [coordinator, setCoordinator] = useState('')
    const [subCoord, setSubCoord] = useState([])

    const { auth: { auth } } = props;


    const analyticsData = [
        {
            title: 'All Applicants',
            applicants: 100
        },
        {
            title: 'Passed Applicants',
            applicants: 50
        },
        {
            title: 'Failed Applicants',
            applicants: 50
        },
    ]

    async function getUsers() {
		
		try {
			const response = await getAllUsers(auth.token);
            console.log(response.data.data)
			setUsers(response.data.data);
		} catch (error) {
			console.log(error)
			console.log(error.response.message);			
		}
	}

    useEffect(() => {
        getUsers()
    }, [users.length])

    useEffect(() => {
        if(!title) {
            setShow(true)
        }
    }, [])


    return (
        <>
            <CustomNav />
            <div className=''  style={{ margin: '2rem', marginTop: '5rem', width: '100%', paddingLeft: '5rem', paddingRight: '5rem' }}>
                <div className="d-flex justify-content-end">
                    <Link>
                        <CustomButton>+ Add {params.section} form</CustomButton>
                    </Link>
                </div>
                <div className="card p-4" style={{ borderRadius: '0.44rem'}}>
                    <div className="d-flex justify-content-evenly mb-4">
                        {
                            analyticsData.map(({title, applicants}, id) => (
                                <div 
                                    className="card text-center" 
                                    key={id.toString()} 
                                    onClick={() => setAnalyticSection(title.toLowerCase())}
                                    style={{ 
                                        borderRadius: '0.44rem', 
                                        width: '20%', 
                                        cursor: 'pointer',
                                        background: `${analyticSection.toLowerCase() === title.toLowerCase() ? '#00b500': 'white'}`
                                    }}>
                                        {console.log(analyticSection)}
                                        {console.log(analyticSection.toLowerCase() === title.toLowerCase())}
                                    <p 
                                        style={{
                                            color: `${analyticSection.toLowerCase() === title.toLowerCase() ? 'white': 'black'}`
                                        }}
                                    >{title}</p>
                                    <h3
                                        style={{
                                            color: `${analyticSection.toLowerCase() === title.toLowerCase() ? 'white': 'black'}`
                                        }}
                                    >{applicants}</h3>
                                </div>
                            ))
                        }
                    </div>

                    {/* <CandidateStatus /> */}
                    <AllStatus users={users}/>
                </div>
            </div>

            <Modal show={show} onHide={() => setShow(false)} style={{paddingTop: '15rem'}}>
                <form className="p-4">
                    <div className="mb-2">
				        <CustomInput title="Title" placeholder="Add Pipeline Title"/>
                    </div>
                    <div className="mb-2">
				        <CustomInput title="Coordinator" placeholder="search for coordinator"/>
                    </div>
                    <div className="mb-2">
				        <CustomInput title="Sub-Coordinators" placeholder="search"/>
                    </div>
                    <CustomButton type="submit">Submit</CustomButton>
                </form>
			</Modal>
        </>
    )
}

const mapStateToProps = state => ({
    auth: state.auth
})

const mapDispatchToProps = dispatch => ({
    // getAllUsers: token => dispatch(getAllUsers(token))
})


export default connect(mapStateToProps, mapDispatchToProps)(CreatePipeline);