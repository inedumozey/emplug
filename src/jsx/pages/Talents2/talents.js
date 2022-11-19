import { useEffect, useState } from "react";
import { AlignRight } from "phosphor-react";
import { connect } from "react-redux";
import CustomButton from "../../components/CustomButton/custom-button";
import CustomSelect from "../../components/CustomSelect/Custom-select";
import CustomNav from "../../layouts/nav/CustomNav";
import TalentsCard from "./talentsCard";
import axios from "axios";
import CustomInput from "../../components/CustomInput/custom-input";

function Talents(props) {
  const [users, setUsers] = useState([])
  const { auth: { auth: { token } } } = props;


  // http://localhost:9001/api/v1/admin/fetch_all_user

  async function httpGetAllUsers() {
    try {
      const response = await axios(
        `https://employer-center-api.herokuapp.com/api/v1/admin/fetch_all_user
        `,
        {
          headers: {
            authorization: `Bearer ${token}`,
            'Content-type': 'application/json',
          },
        }
      )
      console.log("users------------>>>>>>>>>>>>>>>>", response.data.data);
      setUsers(response?.data?.data);
    
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    httpGetAllUsers()
  }, [])


  return (
    <div>
      <CustomNav />
      <div
        className="mt-5 justify-content-between"
        style={{ padding: "0 10rem" }}
      >
        <div className=" d-flex flex-wrap  w-100 justify-content-between">
          <div className="" style={{width: '40%'}}>
            <h1>Discover Talents</h1>
            <h5>Disover tailored talent matches to help you hire faster</h5>
          </div>
          <div className=" d-flex px-4 mx-5 align-items-center" style={{width: '60%'}}>
            {/* <CustomSelect data={[]} placeholder="Education" style={{ marginBottom: '1rem'}} />
            <CustomSelect data={[]} placeholder="Industry" style={{ marginBottom: '1rem'}} />
            <CustomSelect data={[]} placeholder="Location" style={{ marginBottom: '1rem'}} /> */}
            <CustomInput placeholder="search..." />
            <CustomButton
              style={{
                backgroundColor: "white",
                border: "1px solid #00b500",
                color: "#00b500",
              }}
            >
              search
            </CustomButton>
          </div>

        </div>
        <div className='d-flex justify-content-center align-items-center flex-wrap'>
          {
            users?.filter(item => item?.active).map(item => (
              <TalentsCard {...item} key={item._id}/>
            ))
          }
        </div>
      </div>
    </div>
  );
}


const mapStateToProps = state => ({
  auth: state.auth
})


export default connect(mapStateToProps)(Talents);
