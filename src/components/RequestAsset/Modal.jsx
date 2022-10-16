import styled from "styled-components";
import { CloseOutlined } from "@mui/icons-material";
import { useCallback, useEffect, useRef, useState } from "react";
import "../../css/main.css";
import StringFormatter from "../../service/StringFormatter";
import axios from "axios";
import DateFormatterService from "../../service/DateFormatterService";
import { AXIOS_API_URL } from "../../constants/Axios";
import requestAssetService from "../../service/RequestAssetService";

const Background = styled.div`
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.4);
    position: fixed;
    display: flex;
    justify-content: center;
    align-items: center;

    top: 0;
    right: 0;
    bottom: 0;
    left: 0;

    animation: fadeIn linear 0.1s;
`

const ModalWrapper = styled.div`
    width: 500px;
    height: auto;
    box-shadow: 0 5px 16px rgba(0, 0, 0, 0.2);
    background: var(--color-white);
    color: var(--color-dark);
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    position: relative;
    z-index: 10;
    border-radius: 10px;
    --growth-from: 0.7;
    --growth-to: 1;
    animation: growth linear 0.1s;
        border: 2px solid #333;
`

const ModalContent = styled.div`
    display: flex;
    width: 100%;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    line-height: 1.8;
    color: #141414;
    margin: 20px 0px 20px 150px;


    p {
        font-size: 1.2rem;
        margin: 20px 20px 0px 20px;
    }
`

const ModalDisableContent = styled.div`
    display: flex;
    width: 100%;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    line-height: 1.8;
    color: #141414;
    margin: 20px 0;
    p {
        font-size: 1.2rem;
        margin: 20px 20px 0px 20px;
    }
`

const CloseModalButton = styled.span`
    cursor: pointer;
    position: absolute;
    top: 20px;
    right: 20px;
    width: 32px;
    height: 32px;
    padding: 0;
    z-index: 10;
`

const H2 = styled.h2`
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 0.8rem;
    color: var(--color-primary);
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    border-bottom: 2px solid #333;
    width: 100%;
    height: 80px;
    margin: 0;
    background-color: #eff1f5;
`

const DetailTitle = styled.div`
`

const DetailTitleItem = styled.div`
font-size: 1.1rem;
margin-bottom: 10px;
color: #8f9194;
`
const DetailContent = styled.div`
margin-left: 50px;
`

const DetailContentItem = styled.div`
font-size: 1.1rem;
margin-bottom: 10px;
color: #8f9194;
`

const ButtonContainer = styled.div`
    position: relative;
    float: right;
    margin: 0 22px 22px 0;
`

const ButtonClick = styled.button`
    min-width: 80px;
    padding: 10px;
    border: 2px solid #868e95;
    background-color: #fff;
    color: #868e95;
    cursor: pointer;
    font-weight: 500;
    border-radius: 5px;
    &.active {
        background-color: var(--color-primary);
        border: 2px solid var(--color-primary);
        color: #fff;
    }
 
`
const Button = styled.div`
    margin-top: 10px;
    margin-right: 40px;
    width: 100%;
    display: flex;
    justify-content: flex-end;
    flex-direction: row;
`


const Modal = ({ showModal, setShowModal, type, requestAsset, setIsReloadPage }) => {

    const modalRef = useRef();
    const closeModal = (e) => {
        if (modalRef.current === e.target) {
            setShowModal(false);
        }
    }

    const keyPress = useCallback(
        (e) => {
            if (e.key === 'Escape' && showModal) {
                setShowModal(false);
            }
        },
        [setShowModal, showModal]
    );

    useEffect(
        () => {
            document.addEventListener('keydown', keyPress);
            return () => document.removeEventListener('keydown', keyPress);
        },
        [keyPress]
    );

    const handleChangeStateRequestAsset = (state) => {
        const data = {
            'state': state
        }
        requestAssetService.changeStateRequestAsset(requestAsset.id, data)
            .then(res => {
                setShowModal(false);
                setIsReloadPage(prev => !prev);

            })
            .catch(err => {
                console.log(err)
            })
    }

    // =============== Xóa danh mục ===============
    if (type === "acceptRequestAsset") {
        return (
            <>
                {showModal ? (
                    <Background ref={modalRef} onClick={closeModal} id="back_ground_disable_user">
                        <ModalWrapper showModal={showModal} id="modal_wrapper">
                            <H2>Are you sure?</H2>

                            <ModalDisableContent id="modal_disable_content">
                                <p>Do you want to accept this request for asset?</p>
                                <Button id="button">
                                    <ButtonContainer id="button_container_disable">
                                        <ButtonClick
                                            id="btn_disable"
                                            className="active"
                                            onClick={() => handleChangeStateRequestAsset('APPROVED')}
                                        >Yes</ButtonClick>
                                    </ButtonContainer>
                                    <ButtonContainer id="button_container_cancel">
                                        <ButtonClick
                                            id="btn_cancel"
                                            onClick={() => setShowModal(prev => !prev)}
                                        >Cancel</ButtonClick>
                                    </ButtonContainer>
                                </Button>
                            </ModalDisableContent>

                            <CloseModalButton
                                id="close_modal_button"
                                aria-label="Close modal"
                                onClick={() => setShowModal(prev => !prev)}
                            >
                                <CloseOutlined />
                            </CloseModalButton>
                        </ModalWrapper>
                    </Background>
                ) : null}
            </>
        );
    }
    if (type === "rejectRequestAsset") {
        return (
            <>
                {showModal ? (
                    <Background ref={modalRef} onClick={closeModal} id="back_ground_disable_user">
                        <ModalWrapper showModal={showModal} id="modal_wrapper">
                            <H2>Are you sure?</H2>

                            <ModalDisableContent id="modal_disable_content">
                                <p>Do you want to reject this request for asset?</p>
                                <Button id="button">
                                    <ButtonContainer id="button_container_disable">
                                        <ButtonClick
                                            id="btn_disable"
                                            className="active"
                                            onClick={() => handleChangeStateRequestAsset('REJECTED')}
                                        >Yes</ButtonClick>
                                    </ButtonContainer>
                                    <ButtonContainer id="button_container_cancel">
                                        <ButtonClick
                                            id="btn_cancel"
                                            onClick={() => setShowModal(prev => !prev)}
                                        >Cancel</ButtonClick>
                                    </ButtonContainer>
                                </Button>
                            </ModalDisableContent>

                            <CloseModalButton
                                id="close_modal_button"
                                aria-label="Close modal"
                                onClick={() => setShowModal(prev => !prev)}
                            >
                                <CloseOutlined />
                            </CloseModalButton>
                        </ModalWrapper>
                    </Background>
                ) : null}
            </>
        );
    }
    else {
        return (
            <></>
        );
    }
};

export default Modal;