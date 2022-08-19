import { useState } from 'react'

export const Modal = () => {
  const [isOpen, setIsOpen] = useState(true)
  return (
    <div className='modal fade' tabIndex={-1} aria-hidden={isOpen ? 'false' : 'true'}>
      <div className='modal-dialog'>
        <div className='modal-content'>
          <div className='modal-header'>
            <h5 className='modal-title' id='exampleModalLabel'>
              Modal title
            </h5>
            <button className='close' data-dismiss='modal' aria-label='Close'>
              <span aria-hidden='true'>&times;</span>
            </button>
          </div>
          <div className='modal-body'>...</div>
          <div className='modal-footer'>
            <button className='btn btn-secondary' data-dismiss='modal'>
              Close
            </button>
            <button className='btn btn-primary'>Save changes</button>
          </div>
        </div>
      </div>
    </div>
  )
}
