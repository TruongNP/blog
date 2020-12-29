import React from 'react';

function Empty(props) {
    return (
        <tr>
            <td colSpan={props.colSpan}>
                <div className="d-flex justify-content-center mt-5 pt-5">
                    <span className="bg-danger text-light rounded-30 pt-2 pl-4 pr-4 pb-2 ">{props.message ? props.message : "Item not found"}</span>
                </div>
            </td>
        </tr>
    )
}

export default Empty;