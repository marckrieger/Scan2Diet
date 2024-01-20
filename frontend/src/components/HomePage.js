import React, { useState, useEffect } from 'react';
import axios from 'axios';
import LogoutButton from './LogoutButton'
import Camera from './Camera'

import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import { Fab } from '@mui/material';


function HomePage(props) {

    const [cameraIsOpened, setCameraIsOpened] = useState(false);

    const toggleCameraIsOpened = () => {
        setCameraIsOpened(true);
    };

    return (
        <div>
            <LogoutButton onLogout={props.onLogout} />
            <Fab onClick={toggleCameraIsOpened} color="primary" aria-label="add">
                <PhotoCameraIcon />
            </Fab>
            {cameraIsOpened && <Camera />}
        </div>
    );
}

export default HomePage;