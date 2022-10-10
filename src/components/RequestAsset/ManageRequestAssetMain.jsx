import styled from "styled-components";
import "../../css/main.css";
import {useEffect, useRef, useState} from "react";
import {
    ArrowDropDownOutlined,
    ArrowDropUpOutlined,
    CheckOutlined,
    CloseOutlined,
    ReplayOutlined
} from "@mui/icons-material";
import Modal from "./Modal";
import Toast from "./Toast";
import AssignmentService from "../../service/AssignmentService";
import DateFormatterService from "../../service/DateFormatterService";
import {useNavigate} from "react-router-dom";
import requestAssetService from "../../service/RequestAssetService";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPencilAlt} from "@fortawesome/free-solid-svg-icons";
import PagingItem from "../ManageAsset/PagingItem";

const Container = styled.div`
    margin-top: 100px;
`;

// Recent Orders
const RecentOrders = styled.div`
    margin-top: 3.3rem;
`;

const H2 = styled.h2`
    padding-left: 29px;
    margin-bottom: 1.2rem;
    color: var(--color-primary);
`;

const Table = styled.table`
    background: var(--color-white);
    width: 100%;
    padding: var(--card-padding);
    text-align: left;
    transition: all 300ms ease;
    position: relative;
`;

const Thead = styled.thead``;

const Tr = styled.tr`
    &:hover {
        background: var(--color-light);
    }
`;

const Tbody = styled.tbody``;

const Td = styled.td`
    height: 2.8rem;
    border-bottom: 1px solid var(--color-light);
    color: #65676a;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
`;

const A = styled.a`
    text-align: center;
    display: block;
    margin: 1rem auto;
    color: var(--color-primary);
`;

// Tìm kiếm
const SearchWrapper = styled.div`
    position: absolute;
    transform: translate(-50%, -50%);
    top: 12%;
    left: 57%;
    box-shadow: var(--box-shadow);
    &.active {
        box-shadow: none;
    }
`;

const Input = styled.input`
    width: 100%;
    height: 42px;
    padding: 0px 50px 0 20px;
    border-radius: 5px;
    background-color: #ffffff;
    box-sizing: border-box;
    border: none;
    outline: none;
    font-size: 16px;
    font-weight: 400;
    line-height: 20px;
    color: var(--color-dark);
`;

const Button = styled.button`
    width: 30px;
    height: 30px;
    padding: 0px;
    outline: none;
    background-color: transparent;
    z-index: 2;
    cursor: pointer;
`;

const ButtonDelete = styled.button`
width: 30px;
height: 30px;
padding: 0px;
outline: none;
background-color: transparent;
z-index: 2;
cursor: pointer;
    color: var(--color-danger);
`;

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

const FilterContainer = styled.div`
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    position: relative;
    height: 43px;
    width: 250px;
`;

const FilterTitle = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: row;
    border-radius: 5px;
`;

const FilterSpan = styled.span`
    display: block;
    min-width: 175px;
    padding: 10px 0px 10px 20px;
`;
const FilterUl = styled.ul`
    background-color: #f5f5f5;
    position: absolute;
    top: 43px;
    left: 0px;
    width: 100%;
    max-height: 240px;
    overflow-y: auto;
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;
    z-index: 10;
`;
const FilterLi = styled.li`
    padding-left: 20px;
`;
const FilterCheckbox = styled.input`
    accent-color: red;
`;

const Filter = styled.div`
    margin: 20px;
    display: flex;
    border: 1px solid #333;
    border-radius: 5px;
`;

const FilterIcon = styled.div`
    border-left: 1px solid #b5b5b5;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
`;

const Select = styled.select`
    border-radius: 5px;
    padding: 10px;
`;

const Option = styled.option``;

const OptionContainer = styled.div`
    display: flex;
    justify-content: space-between;
    height: auto;
    padding-left: 29px;
`;

const RightOption = styled.div`
    display: flex;
    flex-direction: row;
`;

const SearchContainer = styled.div`
    // margin: 20px;
    display: flex;
    border: 1px solid #dadada;
    border-radius: 5px;
`;

const SearchIcon = styled.div`
    border-left: 1px solid #dadada;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 50px;
    height: auto;
`;

const AddContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: auto;
`;

const Item = styled.div`
    width: auto;
    height: 40px;
    background: var(--color-primary);
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 1.2rem var(--card-padding);
    border-radius: 5px;
    box-shadow: var(--box-shadow);
    transition: all 300ms ease;
    &.add-product {
        background-color: transparent;
        border: 2px solid var(--color-primary);
        color: var(--color-primary);
        display: flex;
        align-items: center;
        justify-content: center;
        background: var(--color-primary);
        color: white;
        cursor: pointer;
        & div {
            display: flex;
            justify-items: center;
            gap: 0.6rem;
        }
    }
`;

const Th = styled.th`
    border-bottom: 1px solid #34383c;
    min-width: 50px;
    color: #34383c;
`;
const ThButton = styled.th`
    min-width: 30px;
    color: #34383c;
`;

const ThContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-start;
`;

const ThSpan = styled.span``;

const ThSortIcon = styled.div``;

const Label = styled.label`
    display: flex;
    flex-direction: row;
    padding: 10px 0px;
`;

const LiSpan = styled.span`
    font-size: 0.9rem;
    margin-left: 10px;
`;

const PictureNoResultFound = styled.div`
display: flex;
width: 100%;
flex-direction: column;
justify-content: center;
align-items: center;
`

const Img = styled.img`
width: 500px;
max-height: 600px;
object-fit: cover;
`

const H1NoResultFound = styled.h1`
letter-spacing: 2px;
font-size: 1.3rem;
color: var(--color-primary);
`

const ButtonFix = styled.button`
    width: 30px;
    height: 30px;
    border: 2px solid var(--color-warning);
    border-radius: var(--border-radius-2);
    color: var(--color-warnning);
    background: var(--color-white);
    padding:0px;
    outline:none;
    z-index: 2;
    cursor: pointer;
    
`

const ButtonInfo = styled.button`
    width: 30px;
    height: 30px;
    padding: 0px;
    outline: none;
    background-color: transparent;
    z-index: 2;
    cursor: pointer;
    color: #576be3;
`

const ManageRequestAssetMain = () => {
    const navigate = useNavigate();

    // Modal
    const [showModal, setShowModal] = useState(false);
    const [typeModal, setTypeModal] = useState("")
    const [danhMucModal, setDanhMucModal] = useState(null);

    // User
    const userStaffCode = JSON.parse(localStorage.getItem('user_info')).id;

    // request for asset
    const [requestAssets, setRequestAssets] = useState([]);
    const [totalPage, setTotalPage] = useState(0);
    const [page, setPage] = useState(1);
    const [requestAssetModal, setRequestAssetModal] = useState();

    // Reload page
    const [isReloadPage, setIsReloadPage] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        getListRequestAsset();
    }, [page]);


    //Change
    const openModal = (modal) => {
        setShowModal(prev => !prev);
        setTypeModal(modal.type);
        setRequestAssetModal(modal.requestAsset);
    }


    // ===== TOAST =====
    const [dataToast, setDataToast] = useState({message: "alo alo", type: "success"});
    const toastRef = useRef(null);  // useRef có thể gọi các hàm bên trong của Toast
    // bằng các dom event, javascript, ...

    const showToastFromOut = (dataShow) => {
        console.log("showToastFromOut da chay", dataShow);
        setDataToast(dataShow);
        toastRef.current.show();
    }

    // request for asset
    const getListRequestAsset = () => {
        requestAssetService.getListRequestAssets(page, 5)
            .then(data => {
                setRequestAssets(data.data.list);
                console.log(data.data.list)
                setTotalPage(data.data.last_page);
            })
            .catch(errors => {
                console.log(errors)
            })
    }

    function handleRejectRequestAsset(value) {
        openModal({type: "rejectRequestAsset", requestAsset: value})
    }

    return (
        <Container id='assignment-list'>

            <RecentOrders>
                <AddContainer>
                    <H2 id='assignment-title'>Manage Request For Assets</H2>
                </AddContainer>
                <div>
                    <Table>
                        <Thead>
                            <Tr>
                                <Th>
                                    <ThContainer>
                                        <ThSpan>ID</ThSpan>
                                    </ThContainer>
                                </Th>
                                <Th>
                                    <ThContainer>
                                        <ThSpan>Asset type</ThSpan>
                                    </ThContainer>
                                </Th>
                                <Th>
                                    <ThContainer>
                                        <ThSpan>Quantity</ThSpan>
                                    </ThContainer>
                                </Th>
                                <Th>
                                    <ThContainer>
                                        <ThSpan>Requested date</ThSpan>
                                    </ThContainer>
                                </Th>
                                <Th>
                                    <ThContainer>
                                        <ThSpan>Note</ThSpan>
                                    </ThContainer>
                                </Th>
                                <Th>
                                    <ThContainer>
                                        <ThSpan>State</ThSpan>
                                    </ThContainer>
                                </Th>
                                <ThButton id='th-decline-button'></ThButton>
                                <ThButton id='th-return-button'></ThButton>
                            </Tr>
                        </Thead>
                        {
                            isLoading ? (
                                    <div className="spinner-border text-warning" style={{
                                        color: "#e22027",
                                        position: "absolute",
                                        left: "50%"
                                    }} role="status">
                                        <span className="visually-hidden"></span>
                                    </div>
                                ) :
                                (
                                    <Tbody id='assignment-body'>
                                        {
                                            requestAssets.map(value =>
                                                <Tr>
                                                    <Td>
                                                        {value.id}
                                                    </Td>
                                                    <Td>
                                                        {value.categoryName}
                                                    </Td>
                                                    <Td>
                                                        {value.quantity}
                                                    </Td>
                                                    <Td>
                                                        {value.requestedDate}
                                                    </Td>
                                                    <Td data-toggle="tooltip"
                                                        title={value.note}>
                                                        {value.note}
                                                    </Td>
                                                    <Td>
                                                        {value.state}
                                                    </Td>
                                                    <Td style={{border: 'none'}}>
                                                        <Button
                                                            disabled={value.state !== 'Waiting for approval' ? true : false}
                                                            onClick={() => handleRejectRequestAsset(value)}
                                                        >
                                                            <CheckOutlined
                                                                style={{
                                                                    marginLeft: '25px',
                                                                    color: value.state !== 'Waiting for approval' ? '#919191' : '#198754',
                                                                }}
                                                                icon={faPencilAlt}
                                                            />
                                                        </Button>
                                                    </Td>
                                                    <Td style={{border: 'none'}}>
                                                        <Button
                                                            disabled={value.state !== 'Waiting for approval' ? true : false}
                                                            onClick={() => handleRejectRequestAsset(value)}
                                                        >
                                                            <CloseOutlined
                                                                style={{
                                                                    border:
                                                                        value.state !== 'Waiting for approval'
                                                                            ? '2px solid #919191'
                                                                            : '2px solid #de6a79',
                                                                    borderRadius: '50%',
                                                                    color: value.state !== 'Waiting for approval' ? '#919191' : '#de6a79',
                                                                }}
                                                            />
                                                        </Button>
                                                    </Td>
                                                </Tr>
                                            )
                                        }
                                    </Tbody>

                                )
                        }
                    </Table>
                    {totalPage > 0 ? PagingItem(page, totalPage, setPage) : <></>}
                </div>
            </RecentOrders>
            <Modal id='modal_assignment'
                   showModal={showModal}   //state Đóng mở modal
                   setShowModal={setShowModal} //Hàm Đóng mở modal
                   type={typeModal}    //Loại modal
                   setIsReloadPage={setIsReloadPage}   //Hàm rerender khi dữ liệu thay đổi
                   showToastFromOut={showToastFromOut} //Hàm hiện toast
                   requestAsset={requestAssetModal}
            />

            {/* === TOAST === */}
            <Toast
                ref={toastRef}
                dataToast={dataToast}   // Thông tin cần hiện lên: Đối tượng { message,type }
            />
        </Container>
    );
};


export default ManageRequestAssetMain;