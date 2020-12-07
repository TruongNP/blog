import React, { Component } from 'react';
import { MDBContainer, MDBBtn, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter } from 'mdbreact';

class ChangeProductOption extends Component {
  constructor(props) {
    super(props);
    this.state = {
      variantsOption: props.variants,
      colorSelected: props.colorSelected,
      sizeSelected: props.sizeSelected,
      modal14: false,
      colorOption: [],
      sizeOption: []
    };
  };

  toggle = nr => () => {
    let modalNumber = 'modal' + nr
    this.setState({
      [modalNumber]: !this.state[modalNumber]
    });
  }

  colorOptionList = () => {
    this.state.variantsOption.forEach(v => {
      if(!this.state.colorOption.find(co => co == v.color) )
        this.state.colorOption.push(v.color);
    });
  }

  onChangeColor = (color) => {
    const arrSize = [];

    this.state.variantsOption.forEach(v => {
      if(v.color == color )
        arrSize.push(v.size);
    });

    this.setState({sizeOption: arrSize});
    this.setState({colorSelected: color});
    this.setState({sizeSelected: arrSize[0]});
  }

  onChangeSize = (size) => {
    this.setState({sizeSelected: size});
  }

  componentDidMount() {
    this.colorOptionList();
    this.onChangeColor(this.state.colorSelected);
  }

render() {

  const {updateVariantSelected, indexToUpdate} = this.props;

  return (
      <MDBContainer className="p-0">
        <a className="text-info" onClick={this.toggle(14)}><i className="fa fa-pencil-alt"></i></a>
        <MDBModal isOpen={this.state.modal14} toggle={this.toggle(14)} centered>
          <MDBModalHeader toggle={this.toggle(14)}>Change product option</MDBModalHeader>
          <MDBModalBody>
            <div className="product-option color mb-4">
                <label>Color: <span className="text-primary">{this.state.colorSelected}</span></label>
                <div className="color-option d-flex">
                  {
                    this.state.colorOption.map((item, index) => {
                      return (
                      <span key={index} className={`color-option__item cursor-pointer ml-2 mr-2 ${item == this.state.colorSelected ? 'selected' : ''}`} onClick={() => this.onChangeColor(item)}>{item}</span>
                      )
                    })
                  }
                </div>
            </div>
            <div className="product-option size">
                <label>Size: <span className="text-primary">{this.state.sizeSelected}</span></label>
                <div className="size-option d-flex">
                  {
                    this.state.sizeOption.map((item, index) => {
                      return (
                        <span key={index} className={`size-option__item border cursor-pointer ml-2 mr-2 p-2 ${item == this.state.sizeSelected ? 'selected' : ''}`} onClick={() => this.onChangeSize(item)}>{item}</span>
                      )
                    })
                  }
                </div>
            </div>
          </MDBModalBody>
          <MDBModalFooter>
            <MDBBtn color="secondary" onClick={this.toggle(14)}>Close</MDBBtn>
            <MDBBtn color="primary" onClick={() => updateVariantSelected(indexToUpdate, this.state.colorSelected, this.state.sizeSelected)}>Save changes</MDBBtn>
          </MDBModalFooter>
        </MDBModal>
      </MDBContainer>
    );
  }
}

export default ChangeProductOption;