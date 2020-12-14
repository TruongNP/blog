import React,{useState} from 'react';


function ProductOption(props) {

    const {indexToRemove, color, size, quantity, onChangeColorName, onChangeSizeName, onChangeQuantity, onBlurQuantity, removeVariants} = props;

    return (
        <div className="row mb-3"  i={indexToRemove}>
            <div className="col">
                <input
                    type="text"
                    className="form-control"
                    onChange={(e) => onChangeColorName(e.target.value)}
                    value={color}
                />
            </div>
            <div className="col">
                <input
                    type="text"
                    className="form-control"
                    onChange={(e) => onChangeSizeName(e.target.value)}
                    value={size}
                />
            </div>
            <div className="col">
                <input
                    type="text"
                    className="form-control"
                    onChange={(e) => onChangeQuantity(e.target.value)}
                    onBlur={(e) => onBlurQuantity(e.target.value)}
                    value={quantity}
                />
            </div>
            <small className="d-flex align-items-center pr-2 cursor-pointer" onClick={() => removeVariants(indexToRemove)} ><i className="fa fa-times ml-1"></i></small>
        </div>
    );
}

export default ProductOption;
