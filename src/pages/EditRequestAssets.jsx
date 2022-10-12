import React from 'react';
import styled from 'styled-components';
import Aside from "../components/Aside";
import Navbar from "../components/Navbar";
import CreateRequestAssetMain from "../components/Home/CreateRequestAssetMain";
import EditRequestAssetMain from "../components/Home/EditRequestAssetMain";
import {useLocation} from "react-router-dom";


const Container = styled.div`
    display: grid;
    width: 96%;
    margin: auto;
    gap: 1.8rem;
    grid-template-columns: 18rem auto;
`

const EditRequestAssets = () => {
    const location = useLocation();
    return (
        <>
            <Navbar pageName="Home " action="> Edit request asset" dropDown={true} />
            <Container>
                <Aside active="home" />
                <EditRequestAssetMain data={location.state}/>
            </Container>
        </>
    )
}

export default EditRequestAssets;