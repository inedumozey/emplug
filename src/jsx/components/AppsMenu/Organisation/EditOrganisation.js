import React from 'react'

const EditOrganisation = ({
  handleSetEditModal,
  handleEditFormChange,
  editFormData,
  handleEditFormSubmit,
}) => {
  return (
    <>
      <div role='document'>
        <div>
          <form>
            <div className='modal-header'>
              <h4 className='modal-title fs-20'>Edit Organisation</h4>
              <button
                type='button'
                className='btn-close'
                onClick={handleSetEditModal}
                data-dismiss='modal'
              >
                <span></span>
              </button>
            </div>
            <div className='modal-body'>
              <i className='flaticon-cancel-12 close' data-dismiss='modal'></i>
              <div className='add-contact-box'>
                <div className='add-contact-content'>
                  <div className='form-group mb-3'>
                    <label className='text-black font-w500'>Position</label>
                    <div className='contact-name'>
                      <input
                        type='text'
                        className='form-control'
                        autocomplete='off'
                        name='position'
                        required='required'
                        value={editFormData.position}
                        onChange={handleEditFormChange}
                        placeholder='position'
                      />
                      <span className='validation-text'></span>
                    </div>
                  </div>
                  <div className='form-group mb-3'>
                    <label className='text-black font-w500'>Type</label>
                    <div className='contact-name'>
                      <input
                        type='text'
                        className='form-control'
                        autocomplete='off'
                        name='type'
                        required='required'
                        value={editFormData.type}
                        onChange={handleEditFormChange}
                        placeholder='type'
                      />
                      <span className='validation-text'></span>
                    </div>
                  </div>
                  <div className='form-group mb-3'>
                    <label className='text-black font-w500'>Posted Date</label>
                    <div className='contact-name'>
                      <input
                        type='text'
                        className='form-control'
                        autocomplete='off'
                        name='pdate'
                        required='required'
                        value={editFormData.pdate}
                        onChange={handleEditFormChange}
                        placeholder='pdate'
                      />
                      <span className='validation-text'></span>
                    </div>
                  </div>
                  <div className='form-group mb-3'>
                    <label className='text-black font-w500'>Last Date</label>
                    <div className='contact-name'>
                      <input
                        type='text'
                        className='form-control'
                        autocomplete='off'
                        name='ldate'
                        required='required'
                        value={editFormData.ldate}
                        onChange={handleEditFormChange}
                        placeholder='ldate'
                      />
                      <span className='validation-text'></span>
                    </div>
                  </div>
                  <div className='form-group mb-3'>
                    <label className='text-black font-w500'>Close Date</label>
                    <div className='contact-name'>
                      <input
                        type='text'
                        className='form-control'
                        autocomplete='off'
                        name='cdate'
                        required='required'
                        value={editFormData.cdate}
                        onChange={handleEditFormChange}
                        placeholder='cdate'
                      />
                      <span className='validation-text'></span>
                    </div>
                  </div>
                  <div className='form-group mb-3'>
                    <label className='text-black font-w500'>Status</label>
                    <div className='contact-name'>
                      <input
                        type='text'
                        className='form-control'
                        autocomplete='off'
                        name='status'
                        required='required'
                        value={editFormData.status}
                        onChange={handleEditFormChange}
                        placeholder='status'
                      />
                      <span className='validation-text'></span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className='modal-footer'>
              <button
                type='submit'
                className='btn btn-primary'
                onClick={handleEditFormSubmit}
              >
                Save
              </button>
              <button
                type='button'
                onClick={handleSetEditModal}
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

export default EditOrganisation
