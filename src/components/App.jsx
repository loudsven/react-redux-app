import React from 'react';
import './app.less';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Main from './main/Main';
import Card from './card/Card';
import Error from './main/Error';

const App = () => {

    return (
        <BrowserRouter>
            <div className="container">
                <Routes>
                    <Route path="/" Component={Main} />
                    <Route path="/card/:username/:reponame" Component={Card} />
                    <Route path="/error" Component={Error}/>
                    <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
            </div>
        </BrowserRouter>
    )
}

export default App;