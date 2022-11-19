import React from 'react'
import { connect } from 'react-redux';
import { Row, Col, Container, Spinner } from 'react-bootstrap'
import DropdownMultiselect from 'react-multiselect-dropdown-bootstrap'

import PhoneInput from 'react-phone-input-2'

const AddOrganisation = ({
  add_organisation_loading,
  optionsArray,
  industry_options,
  country_options,
  addFormData,
  get_single_organisation,
  handleSubAdminsSelect,
  handleStaffSelect,
  handleAddPhoneFormChange,
  handleSetAddCard,
  handleAddFormChange,
  handleAddFormSubmit,
}) => {
  return (
    <>
      <div role='document'>
        <div className=''>
          <form>
            <div className='modal-header'>
              <h4 className='modal-title fs-20'>Add Organisation</h4>
              <button
                type='button'
                className='btn-close'
                onClick={handleSetAddCard}
                data-dismiss='modal'
              >
                <span></span>
              </button>
            </div>
            <div className='modal-body'>
              <i className='flaticon-cancel-12 close' data-dismiss='modal'></i>
              <div className='add-contact-box'>
                <div className='add-contact-content'>
                  <Container>
                    <Row>
                      <Col md='6' className='ms-auto'>
                        <div className='form-group mb-3'>
                          <label className='text-black font-w500'>
                            Organisation Name
                          </label>
                          <div className='contact-name'>
                            <input
                              type='text'
                              className='form-control'
                              name='organizationName'
                              required='required'
                              onChange={handleAddFormChange}
                              placeholder='organization name'
                            />
                            <span className='validation-text'></span>
                          </div>
                        </div>
                      </Col>

                      <Col md='6' className='ms-auto'>
                        <div className='form-group mb-3'>
                          <label className='text-black font-w500'>Email</label>
                          <div className='contact-name'>
                            <input
                              type='email'
                              className='form-control'
                              name='email'
                              required='required'
                              onChange={handleAddFormChange}
                              placeholder='email'
                            />
                            <span className='validation-text'></span>
                          </div>
                        </div>
                      </Col>
                      <Col md='6' className='ms-auto'>
                        <div className='form-group mb-3'>
                          <label className='text-black font-w500'>
                            Phone Number
                          </label>
                          <PhoneInput
                            country={'ng'}
                            value={addFormData.phone}
                            inputStyle={{
                              width: '100%',
                            }}
                            enableSearch={true}
                            inputProps={{
                              name: 'phone',
                              required: true,
                              autoFocus: true,
                            }}
                            onChange={handleAddPhoneFormChange}
                          />
                          <span className='validation-text'></span>
                        </div>
                      </Col>
                      <Col md='6' className='ms-auto'>
                        <div className='form-group mb-3'>
                          <label className='text-black font-w500'>
                            Website
                          </label>
                          <div className='contact-name'>
                            <input
                              type='text'
                              className='form-control'
                              name='website'
                              required='required'
                              onChange={handleAddFormChange}
                              placeholder='website'
                            />
                            <span className='validation-text'></span>
                          </div>
                        </div>
                      </Col>
                      <Col md='6' className='ms-auto'>
                        <div className='form-group mb-3'>
                          <label className='text-black font-w500'>
                            Address
                          </label>
                          <div className='contact-name'>
                            <input
                              type='text'
                              className='form-control'
                              name='address'
                              required='required'
                              onChange={handleAddFormChange}
                              placeholder='address'
                            />
                            <span className='validation-text'></span>
                          </div>
                        </div>
                      </Col>
                      <Col md='6' className='ms-auto'>
                        <div className='form-group mb-3'>
                          <label className='text-black font-w500'>
                            Country
                          </label>
                          <div className='contact-name'>
                            <select
                              id='selectCountry'
                              required
                              className='form-select form-control'
                              name='country'
                              value={addFormData.country}
                              onChange={handleAddFormChange}
                              placeholder='select a country'
                            >
                              <option value=''>Select a country</option>
                              {country_options.map((country) => (
                                <option
                                  key={country.value}
                                  value={country.label}
                                >
                                  {country.label}
                                </option>
                              ))}
                            </select>
                            <span className='validation-text'></span>
                          </div>
                        </div>
                      </Col>
                      <Col md='6' className='ms-auto'>
                        <div className='form-group mb-3'>
                          <label className='text-black font-w500'>State</label>
                          <div className='contact-name'>
                            <input
                              type='text'
                              className='form-control'
                              name='state'
                              required='required'
                              onChange={handleAddFormChange}
                              placeholder='state'
                            />
                            <span className='validation-text'></span>
                          </div>
                        </div>
                      </Col>
                      <Col md='6' className='ms-auto'>
                        <div className='form-group mb-3'>
                          <label className='text-black font-w500'>
                            Industry
                          </label>
                          <div className='contact-name'>
                            <select
                              id='industry'
                              required
                              className='form-select form-control'
                              name='industry'
                              value={addFormData.industry}
                              onChange={handleAddFormChange}
                              placeholder='select a industry'
                            >
                              <option value=''>Select an industry</option>
                              {industry_options.map((country) => (
                                <option
                                  key={country.value}
                                  value={country.label}
                                >
                                  {country.label}
                                </option>
                              ))}
                            </select>
                            <span className='validation-text'></span>
                          </div>
                        </div>
                      </Col>
                      <Col md='6' className='ms-auto'>
                        <div className='basic-form'>
                          <div className='form-group mb-3'>
                            <label className='text-black font-w500'>
                              Sub Admins
                            </label>

                            <div className='contact-name' id='multiselect'>
                              <DropdownMultiselect
                                options={optionsArray}
                                handleOnChange={handleSubAdminsSelect}
                                name='subAdmins'
                              />
                            </div>
                          </div>
                        </div>
                      </Col>
                      <Col md='6' className='ms-auto'>
                        <div className='basic-form'>
                          <div className='form-group mb-3'>
                            <label className='text-black font-w500'>
                              Staffs
                            </label>

                            <div className='contact-name' id='multiselect'>
                              <DropdownMultiselect
                                options={optionsArray}
                                handleOnChange={handleStaffSelect}
                                name='staffs'
                              />
                            </div>
                          </div>
                        </div>
                      </Col>
                      <Col md='12' className='ms-auto'>
                        <div className='form-group mb-3'>
                          <label className='text-black font-w500'>Logo</label>
                          <div className='form-file'>
                            <input
                              type='file'
                              className='form-control'
                              name='logo'
                              required='required'
                              onChange={handleAddFormChange}
                              placeholder='organisation logo'
                            />
                            <span className='validation-text'></span>
                          </div>
                        </div>
                      </Col>
                    </Row>
                  </Container>
                </div>
              </div>
            </div>
            <div className='modal-footer'>
              <button
                type='submit'
                className='btn btn-success'
                onClick={handleAddFormSubmit}
              >
                {add_organisation_loading ? (
                  <>
                    <Spinner
                      as='span'
                      animation='grow'
                      size='sm'
                      role='status'
                      aria-hidden='true'
                    />
                    Loading...
                  </>
                ) : (
                  <>Add</>
                )}
              </button>
              <button
                type='button'
                onClick={handleSetAddCard}
                className='btn btn-danger'
              >
                {' '}
                <i className='flaticon-delete-1'></i> Discard
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

const mapStateToProps = state => ({
  get_single_organisation: state.organisation.get_single_organisation
});

export default connect(mapStateToProps)(AddOrganisation)

{
  /* <Spinner animation="border" /> */
}
