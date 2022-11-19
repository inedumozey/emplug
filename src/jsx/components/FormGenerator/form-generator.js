
import { connect } from "react-redux";
import CustomButton from "../CustomButton/custom-button";

import { getOneForm } from "../../../store/actions/PipelineManager/pipeline-manager.actions";
import { useEffect } from "react";
import CustomInput from "../CustomInput/custom-input";
import CustomSelect from "../CustomSelect/Custom-select";


function FormGenerator(props) {

	const { auth, sectionId, getOneForm, pipeline: { FORM } } = props;

	function httpSubmitForm(event) {
		event.preventDefault();
	}

	useEffect(() => {
		getOneForm(sectionId, auth.token);
	}, [sectionId])

	return (
		<form onSubmit={httpSubmitForm} className="" style={{ paddingLeft: '10rem', paddingRight: '10rem'}}>
			{
				FORM &&
				<h2 className="p-4" style={{ textAlign: "center", color: '#7f7f7f'}}>{FORM.title}</h2>
			}
			{
				FORM &&
				FORM.fields.map((item, i) => {
					if(
						item.inputType === 'text' || 
						item.inputType === 'number' || 
						item.inputType === 'file' ||
						item.inputType === 'email' ||
						item.inputType === 'date'
					) {
						return (
							<div className="p-4" key={i.toString()}>
								<CustomInput 
									title={item.title}
									placeholder={item.placeholder}
									type={item.inputType}
								/>
							</div>
						)
				}

				if (item.inputType === 'select') {
					return (
						<div className="p-4" key={i.toString()}>
							<CustomSelect 
								title={item.title}
								placeholder={item.label}
								data={item.selectable.map(option => option.value)}
							/>
						</div>
					)
				}
			})
			}
			<div className="w-100 d-flex justify-content-center">
				<CustomButton type="submit" style={{padding: '1rem 4rem'}}>Submit</CustomButton>
			</div>
		</form>
	)
}

const mapStateToProps = state => ({
	auth: state.auth.auth,
	pipeline: state.pipeline
})

const mapDispatchToProps = dispatch => ({
	getOneForm: (id, token) => dispatch(getOneForm(id, token))
})

export default connect(mapStateToProps, mapDispatchToProps)(FormGenerator);