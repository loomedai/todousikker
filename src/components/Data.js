import React from 'react';
import {FaRegTrashAlt} from 'react-icons/fa';

const Data = ({data:{text, id_T}, onDelete}) => {
    return (
      <li>
          <div className="row d-flex align-items-center bg-gray-300 dataset mb-2 me-2">
              <div className="col-md-10">
                  <div className="d-flex align-items-center">
                      <div className="form-check">
                          <input className='form-check-input' type="checkbox" value="" id="flexCheckDefault" />
                      </div>
                      <div className="ms-3">
                          <div dangerouslySetInnerHTML={{ __html: sanitizeHtmlContent(content) }}></div>

                      </div>
                  </div>
              </div>
              <div className="col-md-2">
              <button className="btn trash" onClick={() => onDelete(id_T)}>{<FaRegTrashAlt />}</button>
              </div>
          </div>
      </li>
    )
  }
export default Data;