import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import {
    AssignmentIndOutlined,
    AssignmentReturnOutlined,
    HomeOutlined,
    PersonOutlineOutlined,
    ReportGmailerrorredOutlined,
    WebAssetOutlined
} from "@mui/icons-material";
import styled from "styled-components";
import {useState} from 'react';
import "../css/main.css";
import {Link} from "react-router-dom";

const Container = styled.aside`
    margin-top: 30px;
    height: 100vh;
`;
const Top = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 1.4rem;
`;

const Logo = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.8rem;
`;

const Img = styled.img`
    width: 5rem;
    height: 5rem;
`;

const H2 = styled.h2`
    color: var(--color-primary);
    font-size: 1.3rem;
    min-width: 16rem;
`;

const Close = styled.div`
    display: none;
`;

// SIDE BAR
const SideBar = styled.div`
    display: flex;
    flex-direction: column;
    height: 86vh;
    position: relative;
    top: 3rem;
`;

const IconSpan = styled.span`
    fontSize: 1.6rem;
    transition: all 300ms ease;

`

const LinkStyled = styled(Link)`
    display: flex;
    color: #22262a;
    padding: 1.5rem;
    gap: 1rem;
    align-items: center;
    position: relative;
    height: 3.7rem;
    transition: all 300ms ease;
    background-color: #eff1f5;
    margin-bottom: 3px;
    &.active {
        background: var(--color-primary);
        color: var(--color-white);
    }
    &:hover {
        cursor: pointer;
        ${IconSpan} {
            margin-left: 1rem;
        }
    }
`;

const H3 = styled.h3`
    font-size: 1.3rem;
`;

const Aside = (props) => {
    // Home
    const [isHomeActive, setHomeIsActive] = useState(props.active === "home" ? true : false);
    const handleClickHome = () => {
        setHomeIsActive(true);
        setManageUserIsActive(false);
        setManageAssignmentIsActive(false);
        setManageRequestForReturningIsActive(false);
        setManageRequestForAssetIsActive(false);
        setReportIsActive(false);
        setManageAssetIsActive(false);
    }

    // Manage User
    const [isManageUserActive, setManageUserIsActive] = useState(props.active === "manageUser" ? true : false);
    const handleClickManageUser = () => {
        setHomeIsActive(false);
        setManageUserIsActive(true);
        setManageAssignmentIsActive(false);
        setManageRequestForReturningIsActive(false);
        setManageRequestForAssetIsActive(false);
        setReportIsActive(false);
        setManageAssetIsActive(false);
    }

    // Manage Asset
    const [isManageAssetActive, setManageAssetIsActive] = useState(props.active === "manageAsset" ? true : false);
    const handleClickManageAsset = () => {
        setHomeIsActive(false);
        setManageUserIsActive(false);
        setManageAssignmentIsActive(false);
        setManageRequestForReturningIsActive(false);
        setManageRequestForAssetIsActive(false);
        setReportIsActive(false);
        setManageAssetIsActive(true);
    }

    // Manage Assignment
    const [isManageAssignmentActive, setManageAssignmentIsActive] = useState(props.active === "manageAssignment" ? true : false);
    const handleClickManageAssignment = () => {
        setHomeIsActive(false);
        setManageUserIsActive(false);
        setManageAssignmentIsActive(true);
        setManageRequestForReturningIsActive(false);
        setManageRequestForAssetIsActive(false);
        setReportIsActive(false);
        setManageAssetIsActive(false);
    }

    // Request For Returning
    const [isRequestForReturningIsActive, setManageRequestForReturningIsActive] = useState(props.active === "requestForReturning" ? true : false);
    const handleClickRequestForReturning = () => {
        setHomeIsActive(false);
        setManageUserIsActive(false);
        setManageAssignmentIsActive(false);
        setManageRequestForReturningIsActive(true);
        setManageRequestForAssetIsActive(false);
        setReportIsActive(false);
        setManageAssetIsActive(false);
    }

    // Request For Asset
    const [isRequestForAssetIsActive, setManageRequestForAssetIsActive] = useState(props.active === "requestForAsset" ? true : false);
    const handleClickRequestForAsset = () => {
        setHomeIsActive(false);
        setManageUserIsActive(false);
        setManageAssignmentIsActive(false);
        setManageRequestForReturningIsActive(false);
        setManageRequestForAssetIsActive(true);
        setReportIsActive(false);
        setManageAssetIsActive(false);
    }

    // Report
    const [isReportActive, setReportIsActive] = useState(props.active === "report" ? true : false);
    const handleClickReport = () => {
        setHomeIsActive(false);
        setManageUserIsActive(false);
        setManageAssignmentIsActive(false);
        setManageRequestForReturningIsActive(false);
        setManageRequestForAssetIsActive(false);
        setReportIsActive(true);
        setManageAssetIsActive(false);
    }

    return (
        <Container>
            <Top>
                <Logo>
                    <H2>Online Asset Management</H2>
                </Logo>
                <Close>
                    <CloseOutlinedIcon></CloseOutlinedIcon>
                </Close>
            </Top>
            <SideBar id = "Aside_SideBar">
                <LinkStyled to={"/"} className={isHomeActive ? "active" : null}
                            onClick={handleClickHome}
                            id="Aside_Home"
                            >
                    <H3>Home</H3>
                </LinkStyled>
                {props.isUser ?
                    (<div></div>) : (
                        <div>
                            <LinkStyled to={"/manage-user"}
                                        className={isManageUserActive ? "active" : null}
                                        onClick={handleClickManageUser}
                                        id="Aside_ManageUser_Admin"
                                        >
                                <H3>Manage User</H3>
                            </LinkStyled>
                            <LinkStyled to={"/manage-asset"}
                                        className={isManageAssetActive ? "active" : null}
                                        onClick={handleClickManageAsset}
                                        id="Aside_ManageAsset_Admin"
                                        >
                                <H3>Manage Asset</H3>
                            </LinkStyled>
                            <LinkStyled to={"/manage-assignment"}
                                        className={isManageAssignmentActive ? "active" : null}
                                        onClick={handleClickManageAssignment}
                                        id="Aside_ManageAssignment_Admin"
                                        >
                                <H3>Manage Assignment</H3>
                            </LinkStyled>
                            <LinkStyled to={"/request-for-returning"}
                                        className={isRequestForReturningIsActive ? "active" : null}
                                        onClick={handleClickRequestForReturning}
                                        id="Aside_RequestForReturning_Admin"
                                        >
                                <H3>Request for Returning</H3>
                            </LinkStyled>
                            <LinkStyled to={"/manage-request-asset"}
                                        className={isRequestForAssetIsActive ? "active" : null}
                                        onClick={handleClickRequestForAsset}
                                        id="Aside_RequestForAsset_Admin"
                            >
                                <H3>Request for Assets</H3>
                            </LinkStyled>
                            <LinkStyled to={"/assets/report"}
                                        className={isReportActive ? "active" : null}
                                        onClick={handleClickReport}
                                        id="Aside_Report_Admin"
                                        >
                                <H3>Report</H3>
                            </LinkStyled>
                        </div>
                    )}
            </SideBar>
        </Container>

    );
};

export default Aside;