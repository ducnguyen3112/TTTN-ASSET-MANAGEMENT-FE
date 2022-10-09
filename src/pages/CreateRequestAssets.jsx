import React from 'react';
import styled from 'styled-components';
import Aside from "../components/Aside";
import Navbar from "../components/Navbar";
import CreateRequestAssetMain from "../components/Home/CreateRequestAssetMain";


const Container = styled.div`
    display: grid;
    width: 96%;
    margin: auto;
    gap: 1.8rem;
    grid-template-columns: 18rem auto;
`

const CreateRequestAssets = () => {
    return (
        <>
            <Navbar pageName="Home " action="> Create request assets" dropDown={true} />
            <Container>
                <Aside active="home" />
                <CreateRequestAssetMain/>
            </Container>
        </>
    )
}

export default CreateRequestAssets;