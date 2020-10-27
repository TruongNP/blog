import React from 'react';
import ReactDOM from 'react-dom';
import MainPage from '../../components/admin/modules/dashboard';

function DasbBoard() {
    return (
        <div>
            <MainPage />
        </div>
    );
}

export default DasbBoard;

if (document.getElementById('dashboard')) {
    ReactDOM.render(<DasbBoard />, document.getElementById('dashboard'));
}
