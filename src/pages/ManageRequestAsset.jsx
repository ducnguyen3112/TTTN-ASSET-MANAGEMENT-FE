import React, { useState } from 'react';
import styled from 'styled-components';
import Aside from "../components/Aside";
import Navbar from "../components/Navbar";
import RequestForReturningMain from "../components/RequestForReturning/RequestForReturningMain";
import ManageRequestAssetMain from "../components/RequestAsset/ManageRequestAssetMain";


const Container = styled.div`
    display: grid;
    width: 96%;
    margin: auto;
    gap: 1.8rem;
    grid-template-columns: 20rem auto;
`

const RequestForReturning = () => {
    return (
        <>
            <Navbar pageName="Manage Request For Asset" dropDown={true} />
            <Container>
                <Aside active="requestForAsset" />
                <ManageRequestAssetMain/>
            </Container>
        </>
    )
}

export default RequestForReturning;