import React from 'react'

import CustomerList from './CustomerList'
import CustomerForm from './CustomerForm'

const All = ({ customers, postCustomer, deleteCustomer}) => {
    return (
        <div style={{overflowY:'auto', maxHeight:'calc(100vh - 65px)'}}>
            <CustomerForm postCustomer={postCustomer}/>
            <CustomerList
              className="d-block"
              customers={customers}
              deleteCustomer={deleteCustomer}
            />
        </div>
    )
}

export default All
