import React, { Component } from 'react';
import { MDBContainer, MDBBtn, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter } from 'mdbreact';
import ImageUploader from 'react-images-upload';
import Loader from '../loader';
import axios from 'axios';

class ModalUpload extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal4: false,
      fileSelected: [],
      selectFile: false,
      setSubmiting: false,
      progress: 0,
      priview: '',
      mediaList: [],
      fileSelectedInMedia: [],
      indexFileInMedia: []
    };
  };
  

  bytesToSize = (bytes) => {
    var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    if (bytes == 0) return '0 Byte';
    var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
    return Math.round(bytes / Math.pow(1024, i), 2) + ' ' + sizes[i];
 };

 onDrop = (picture) => {
  const file = picture[0];
  const size = this.bytesToSize(file.size);
  const type = file.type;
  var data = new FormData();
      data.append('file', file);
      data.append('size', size);
      data.append('type', type);

      this.setState({setSubmiting: true});
      this.setState({progress: 0});

  axios.post('/api/v1/uploads', data, {
    onUploadProgress: progressEvent => {
      this.setState({progress: Math.round(progressEvent.loaded / progressEvent.total * 100)});
    }   
  }).then(res => {
    this.setState({setSubmiting: false});
    this.setState({priview: res.data.src});
  }).catch((err)=>{
    this.setState({setSubmiting: false});
  })
};

selectFileTab = ()  => {
  this.setState({selectFile: true});
  this.setState({progress: 0});
  this.setState({priview: ''});
};

libraryTab = ()  => {
  this.setState({selectFile: false});
  this.setState({progress: 0});
  this.setState({priview: ''});
  this.getMediaList();
};

getMediaList = () => {
  axios.get('/api/v1/uploads').then(res => {
    this.setState({mediaList: res.data});
  })
};

toggle = nr => () => {
  let modalNumber = 'modal' + nr

  this.getMediaList();
  this.setState({
    [modalNumber]: !this.state[modalNumber]
  });
  this.setState({selectFile: false});
  this.setState({progress: 0});
  this.setState({priview: ''});
  this.setState({fileSelectedInMedia: []});
  this.setState({selectFile: true});
};

onChangeFileInMedia = (src, currentIndex) => {

  const checkFile = this.state.indexFileInMedia.includes(currentIndex);
  var mediaItem = document.getElementById("media-item-"+currentIndex+"");
  mediaItem.classList.toggle("selected");

  if(checkFile == false) {
    this.setState({fileSelectedInMedia: [...this.state.fileSelectedInMedia, src]});
    this.setState({indexFileInMedia: [...this.state.indexFileInMedia, currentIndex]});
  }
  else if(checkFile == true) {
    const fileResult = this.state.fileSelectedInMedia.filter((t, index) => index != currentIndex);
    const indexResult = this.state.indexFileInMedia.filter((t, index) => index != currentIndex);

    this.setState({fileSelectedInMedia: fileResult});
    this.setState({indexFileInMedia: indexResult});
  }

  if(this.props.onlyUpload == true) {
    window.location.reload();
  }

};

render() {
  
  const {onchangeFileSelected, className, buttonName,doneUpload, onlyUpload} = this.props;

  return (
    <MDBContainer className="p-0 w-auto float-right m-0">
      <a className={`${className && className != '' ? className : 'text-primary'}`} onClick={this.toggle(4)}>{buttonName ? buttonName : 'Add Media'}</a>
      <MDBModal isOpen={this.state.modal4} toggle={this.toggle(4)} size="lg">
        <MDBModalHeader toggle={this.toggle(4)}>Media</MDBModalHeader>
        <MDBModalBody>
        <ul className="nav nav-tabs">
          <li className="nav-item">
            <a className={`nav-link ${this.state.selectFile == true ? 'active' : null}`} href="#"
            onClick={this.selectFileTab}
            >Select File</a>
          </li>
          <li className={`nav-item ${onlyUpload == true ? 'd-none' : ''}`}>
            <a className={`nav-link ${this.state.selectFile == false ? 'active' : null}`} href="#"
            onClick={this.libraryTab}
            >Library</a>
          </li>
        </ul>
          <div className="form-group">
            <div className={`input-group ${this.state.selectFile == true ? 'd-block' : 'd-none'}`}>
              <ImageUploader
              withIcon={true}
              buttonText='Choose images'
              onChange={this.onDrop}
              imgExtension={['.jpg', '.png', 'gif']}
              maxFileSize={5242880}
              withPreview={false}
              withLabel={false}
              singleImage	={true}
              />
              <div className={`text-center ${this.state.priview != '' ? 'd-block' : 'd-none'}`}>
                <img src={this.state.priview} width="100px" className="preview border rounded-10 m-2 p-2" />
              </div>
              <div className={`progress ${this.state.progress > 0 ? 'opacity' : 'opacity-none'}`}>
                <div className="progress-bar" role="progressbar" style={{ width: this.state.progress+'%' }} aria-valuenow={this.state.progress} aria-valuemin="0" aria-valuemax="100">{this.state.progress}%</div>
              </div>
            </div>
            <div className={`media-list ${this.state.selectFile == false ? 'd-block' : 'd-none'}`}>
              <div className="d-flex flex-wrap border rounded-10 mt-3 p-2">
                {
                  this.state.mediaList.map((item, index) => {
                    return (
                      <div  key={index} className="media-item">
                        <img src={item.src} onClick={() => this.onChangeFileInMedia(item.src, index)} width="100" height="100" id={`media-item-${index}`} className="border rounded-10 cursor-pointer object-fit-contain m-2 p-2" alt={item.alt} />
                      </div>
                    )
                  })
                }
              </div>
            </div>
            
          </div>
        </MDBModalBody>
        <MDBModalFooter>
          <MDBBtn color="secondary" onClick={this.toggle(4)}>Close</MDBBtn>
          <MDBBtn color="primary" className={onlyUpload != true ? 'd-none' : ''} onClick={() => doneUpload(true)}>Save</MDBBtn>
          <MDBBtn color="primary" className={onlyUpload == true ? 'd-none' : ''} onClick={() => onchangeFileSelected(this.state.fileSelectedInMedia)}>Save changes</MDBBtn>
        </MDBModalFooter>
      </MDBModal>
    </MDBContainer>
    );
  }
}

export default ModalUpload;