import React, { Component } from 'react';
import { MDBContainer, MDBBtn, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter } from 'mdbreact';

class ModalUpload extends Component {
state={
  modal4: false,
}

toggle = nr => () => {
  let modalNumber = 'modal' + nr
  this.setState({
    [modalNumber]: !this.state[modalNumber]
  });
}

render() {
  return (
    <MDBContainer>
      <MDBBtn color="primary" onClick={this.toggle(4)}>Large modal</MDBBtn>
      <MDBModal isOpen={this.state.modal4} toggle={this.toggle(4)} size="lg">
        <MDBModalHeader toggle={this.toggle(4)}>MDBModal title</MDBModalHeader>
        <MDBModalBody>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore
          magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
          consequat.
        </MDBModalBody>
        <MDBModalFooter>
          <MDBBtn color="secondary" onClick={this.toggle(4)}>Close</MDBBtn>
          <MDBBtn color="primary">Save changes</MDBBtn>
        </MDBModalFooter>
      </MDBModal>
      <MDBBtn color="primary" onClick={this.toggle(5)}>Fluid modal</MDBBtn>
      <MDBModal isOpen={this.state.modal5} toggle={this.toggle(5)} size="fluid">
        <MDBModalHeader toggle={this.toggle(5)}>MDBModal title</MDBModalHeader>
        <MDBModalBody>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore
          magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
          consequat.
        </MDBModalBody>
        <MDBModalFooter>
          <MDBBtn color="secondary" onClick={this.toggle(5)}>Close</MDBBtn>
          <MDBBtn color="primary">Save changes</MDBBtn>
        </MDBModalFooter>
      </MDBModal>
    </MDBContainer>
    );
  }
}

export default ModalUpload;