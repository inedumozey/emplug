import CustomButton from "../../components/CustomButton/custom-button";
import CustomInput from "../../components/CustomInput/custom-input";
import CustomNav from "../../layouts/nav/CustomNav";

function TermsAndCondition(props) {
  return (
    <div>
      <CustomNav />
      <div style={{ marginTop: "0.5rem", padding: "1rem 9rem" }}>
        <CustomButton style={{ width: "15%" }}>Go Back</CustomButton>
        <hr style={{ marginBottom: "4rem" }}></hr>
      </div>

      <div
        className="card p-5 mb-2  flex-wrap"
        style={{ borderRadius: "0.4rem", height: "60rem",marginLeft:'9rem',marginRight:'9rem' }}
      >
        <h4>Terms and Condition</h4>
        <form className="" style={{ marginTop: "2rem" }}>
          <div className="d-flex">
            <div style={{ width: "50%", marginRight: "2rem" }}>
              <CustomInput
                title="Subject"
                style={{ width: "100%" }}
                placeholder="Enter Email Subject"
              />
            </div>
            <div style={{ width: "10%", marginRight: "2rem" }}></div>
          </div>
        </form>
      </div>
    </div>
  );
}
export default TermsAndCondition;
