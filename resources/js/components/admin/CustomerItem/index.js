import React from 'react';

function CustomerItem(props) {

    const { currentCustomerList, firstItem, lastItem, prefixAdmin, deleteCustomer } = props;
    return (
        currentCustomerList.slice(firstItem, lastItem).map((item, index) => {
            return (
                <tr key={index}>
                    <th scope="row">
                        <div className="form-check pl-0">
                        <input type="checkbox" className="form-check-input filled-in" id={`check-${item.id}`} />
                        <label className="form-check-label small text-uppercase card-a-secondary" htmlFor={`check-${item.id}`}></label>
                        </div>
                    </th> 
                    <td><a href={`${prefixAdmin}/edit/${item.id}`}><img src={item.avata} width="50" alt={item.title} /></a></td>
                    <td>
                        <a href={`${prefixAdmin}/edit/${item.id}`} className="text-primary">{item.first_name} {item.last_name}</a>
                        <br></br>
                        <span>{item.address}</span>
                    </td>
                    <td><span className="text-capitalize pl-2 pr-2 rounded-15 text-light bg-primary">{item.role}</span></td>
                    <td>
                        <button id={`customer-${item.id}`} className="btn bg-danger btn-sm m-0 py-1 px-2 mr-1 text-light" onClick={() => {deleteCustomer(item.id)}} >Delete</button>
                        <a href={`${prefixAdmin}/edit/${item.id}`} className="btn btn-primary btn-sm m-0 py-1 px-2 text-light" >Edit</a>
                    </td>
                </tr>
            )
        })
    )
} 

export default CustomerItem;