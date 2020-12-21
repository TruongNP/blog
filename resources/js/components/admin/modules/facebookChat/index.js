import React, {useState, useEffect} from 'react';
import Editor from 'react-simple-code-editor';
import { highlight, languages } from 'prismjs/components/prism-core';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-markup';
import 'prismjs/components/prism-jsx';
import Loader from '../../loader';
import axios from 'axios';
import { useAlert } from "react-alert";
import $ from "jquery";
   
  function MainPage() {

    const alert = useAlert();
    const [code, setCode] = useState('');
    const [id, setId] = useState(0);
    const [submiting, setSubmiting] = useState(false);

    const submitForm = () => {
        var data = new FormData();
        data.append('id', id);
        data.append('script', code);

        setSubmiting(true)

        var url;
        if(id == 0)
            url = '/api/v1/facebook-chat/add';
        else 
            url = '/api/v1/facebook-chat/update';

        axios.post(url, data, {
            
        }).then(res => {
            setSubmiting(false)
            alert.success(res.data.success);
        }).catch((err)=>{
            setSubmiting(false);
            alert.error("There was an error sending");
        })
    };

    function getCollectionList() {
        axios.get('/api/v1/facebook-chat').then(res => {
            setCode(res.data[0].script);
            setId(res.data[0].id);
        })
    };

    useEffect(() => {
        getCollectionList();
    },[]);

      return (
        <div className="container-fluid pl-5 pb-5 pr-5">
            <h1 className="h3 mb-2 text-gray-800">Facebook Chat</h1>
            <div className="border mb-4">
                <Editor
                value={code}
                onValueChange={code => setCode(code)}
                highlight={code => highlight(code, languages.js)}
                padding={10}
                style={{
                    fontFamily: '"Fira code", "Fira Mono", monospace',
                    fontSize: 12,
                    minHeight: 400,
                    background: '#f9f9f9'
                }}
                />
            </div>
            <button className="btn btn-primary bg-primary" onClick={() => {submitForm()}}>Save {submiting == true ? <Loader with="20" /> : null}</button>
        </div>
      );
  }

export default MainPage;