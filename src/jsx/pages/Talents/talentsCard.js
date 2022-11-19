import { connect } from "react-redux";
import CustomNav from "../../layouts/nav/CustomNav";
import Talents from "./talents";
import { AlignRight } from "phosphor-react";
import CustomButton from "../../components/CustomButton/custom-button";


function TalentsCard(props) {
  const { userId: { fullName, email, phone, profilePicture}, id} = props;
  return (
    <div className="p-4 px-0">
      <div
        className="m-4 p-4 d-flex flex-column align-items-center"
        style={{
          width: "20rem",
          background: "white",
          borderRadius: "1rem",
        }}
      >
        <div
          className="d-flex justify-content-center align-items-center m-3"
          style={{
            width: "8rem",
            height: "8rem",
            borderRadius: "50%",
            border: "1px solid #eee",
            overflow: 'hidden'
          }}
        >
          <img
            src={profilePicture}
            alt={fullName}
            style={{
              border: "1px solid #eee",
              objectFit: "cover",
              width: '100%'
            }}
          />
        </div>
        <div style={{ textAlign: "center" }}>
          <h4>{fullName}</h4>
          <p className="m-0">{id}</p>
          <p className="m-0">{email}</p>
        </div>
        <div  className='w-100  d-flex justify-content-between px-5 pb-4'>
          <CustomButton className='px-3'>Contact</CustomButton>
          <CustomButton className='px-4'>View</CustomButton>
          
        </div>
      </div>
    </div>
  );
}
export default TalentsCard;
