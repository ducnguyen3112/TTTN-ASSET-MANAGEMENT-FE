import React, {useEffect, useState} from 'react';
import styled from "styled-components";
import {useNavigate, useParams} from 'react-router-dom';
import "../../css/main.css"
import {ArrowDropDownOutlined} from "@mui/icons-material";
import CategoriesService from "../../service/CategoriesService";
import RequestAssetService from "../../service/RequestAssetService";
import requestAssetService from "../../service/RequestAssetService";

const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    margin-top: -150px;
`

const Title = styled.div`
    display: flex;
    width: 100%;
    margin-left: 60%;
`

const H2 = styled.h2`
    color: var(--color-primary);
    margin-bottom: 25px;
    font-size: 1.3rem;
`

const Form = styled.form`
    display: flex;
    flex-direction: row;
`

const FormTitle = styled.div`


`
const FormTitleItem = styled.div`
    min-width: 100px;
    height: 50px;
    font-size: 1.1rem;
    display: flex;
    justify-content: flex-start;
    align-items: center;

`
const FormContent = styled.div`

`
const FormContentItem = styled.div`
    font-size: 1.2rem;
    height: auto;
    min-width: 300px;
    display: flex;
    justify-content: flex-start;
    align-items: baseline;
    flex-direction: column;
`

const FormContentItemCheckbox = styled.div`
    display: flex;
    width: 220px;
    height: 40px;
    margin: 5px 0px;
    padding: 0px 0px;
    justify-content: center;
    align-items: center;
    flex-direction: row;
    font-size: 1.2rem;
`


const Button = styled.div`
    margin-top: 30px;
    width: 100%;
    display: flex;
    justify-content: flex-end;
    flex-direction: row;
`

const ButtonContainer = styled.div`
    position: relative;
    float: right;
    margin: 10px 0 0 0;
`

const ButtonClick = styled.button`
    min-width: 80px;
    padding: 10px;
    border: 2px solid #c0c3c7;
    background-color: #fff;
    color: #c0c3c7;
    cursor: pointer;
    font-weight: 500;
    border-radius: 5px;
    &.active {
        background-color: var(--color-primary);
        border: 2px solid var(--color-primary);
        color: #fff;
    }
    // &:hover {
    //     background-color: var(--color-primary);
    //     border: 2px solid var(--color-primary);
    //     color: #fff;
    // }

`


const InputText = styled.input`
    min-width: 300px;
    height: 40px;
    margin: 5px 20px;
    outline: none;
    color: #191919;
    border-color: #cecece;
    border-radius: 10px;
    padding: 0px 10px;
    box-sizing: border-box;
    &::placeholder {
        letter-spacing: 2px;

        font-size: 15px;
    }
    &:focus {
        box-shadow: 2px 2px 30px rgba(0, 0, 0, 0.1);
    }

`
const InputDate = styled.input`
    min-width: 300px;
    height: 40px;
    margin: 5px 20px;
    outline: none;
    color: #191919;
    border-radius: 10px;
    padding: 0px 10px;
    box-sizing: border-box;
    &::placeholder {
        letter-spacing: 2px;

        font-size: 15px;
    }
    &:focus {
        box-shadow: 2px 2px 30px rgba(0, 0, 0, 0.1);
    }
`
const InputRadio = styled.input`
    padding: 0px 10px;
    accent-color: red;
    
`

const InputRadioSpan = styled.span`
    font-size: 1.1rem;
    padding: 0px 10px;
`

const Select = styled.select`
    min-width: 300px;
    height: 40px;
    margin: 5px 20px;
    border: 1px solid #333;
    outline: none;
    color: #191919;
    border-radius: 10px;
    padding: 0px 10px;
    box-sizing: border-box;
    &:focus {
        box-shadow: 2px 2px 30px rgba(0, 0, 0, 0.1);
    } 
`

const TextArea = styled.textarea`
max-width: 300px;
margin: 5px 20px;
outline: none;
color: #191919;
border-radius: 10px;
padding: 5px 10px 0px 10px;
box-sizing: border-box;
border: 1px solid #c1c1c1;
resize: none;
&::placeholder {
    letter-spacing: 2px;

    font-size: 15px;
}
&:focus {
    box-shadow: 2px 2px 30px rgba(0, 0, 0, 0.1);
}
`


const Option = styled.option``

const Label = styled.label`
    display: flex;
    height: 100%;
    justify-content: center;
    align-items: center;
`

const Error = styled.span`
    margin-left: 20px;
    font-size: 1.1rem;
    color: red;
`

const CategoryLiContainer = styled.div`
    max-height: 240px;
    overflow-y: auto;
`

const CategoryIcon = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
`
const LiSpan = styled.span`
    font-size: 0.9rem;
    margin-left: 10px;
`

const CategoryLi = styled.li`
    padding: 10px 0px 10px 20px;
    cursor: pointer;
`

const CategoryContainer = styled.div`
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    position: relative;
    height: 43px;
    width: 300px;
`

const CategoryTitle = styled.div`
display: flex;
justify-content: space-between;
align-items: center;
flex-direction: row;
border-radius: 5px;
`

const CategoryUl = styled.ul`
background-color: #f5f5f5;
position: absolute;
top: 43px;
left: 0px;
width: 300px;
border: 0;
padding: 0;
z-index: 10;
`

const CategorySpan = styled.span`
    display: block;
    min-width: 260px;
    padding: 10px 0px 10px 20px;
`
const EditRequestAssetMain = (props) => {
    const {id}= useParams();
    const navigate = useNavigate();
    const [quantity, setQuantity] = useState();
    const [note, setNote] = useState();
    const [categoryId, setCategoryId] = useState();
    const [category, setCategory] = useState();
    const [categories, setCategories] = useState([]);

    const getAllCategories = () => {
        CategoriesService.getListCategories()
            .then(res => {
                setCategories(res.data.reverse());
            })
            .catch(errors => {
                console.log(errors.message)
            })
    }

    const setToggleCategory = () => {
        var checkList = document.getElementById('createAsset_Category');
        if (checkList.classList.contains('visible-create-asset')) {
            checkList.classList.remove('visible-create-asset');
        } else {
            checkList.classList.add('visible-create-asset');
        }
    }

    const handleChooseCategory = (props) => {
        setCategory(props.item);
        setCategoryId(props.item.id);
        setToggleCategory();
    }

    useEffect(() => {
        getAllCategories()
        if (props.data) {
            setQuantity(props.data.quantity);
            setNote(props.data.note);
            setCategoryId(props.data.categoryId)
        }
    }, []);

    function handleEditRequestAsset() {
        const data ={
            'categoryId': categoryId,
            'note': note,
            'quantity': quantity
        }
        requestAssetService.editRequestAsset(id,data)
            .then(res=>{
                console.log(res.data)
                navigate('/home');
            })
            .catch(err=>{
                console.log(err)
            })
    }

    return (
        <Container>
            <Title>
                <H2>Edit request for asset</H2>
            </Title>
            <Form>
                <FormTitle>
                    <FormTitleItem>Product type</FormTitleItem>
                    <FormTitleItem>Quantity</FormTitleItem>
                    <FormTitleItem>Note</FormTitleItem>
                </FormTitle>
                <FormContent>
                    <FormContentItem>
                        <CategoryContainer id="createAsset_Category"
                                           className="dropdown-check-list-create-asset"
                                           tabindex="100" style={{margin: "5px 20px"}}>
                            <CategoryTitle className="anchor-create-asset"
                                           onClick={() => {
                                               setToggleCategory()
                                           }}>
                                <CategorySpan>{category ? category.name : props.data.categoryName}</CategorySpan>
                                <CategoryIcon>
                                    <ArrowDropDownOutlined/>
                                </CategoryIcon>
                            </CategoryTitle>
                            <CategoryUl className="items-create-asset"
                                        style={{padding: "0"}}>
                                <CategoryLiContainer id="list-category-id">
                                    {categories.map((item) => <CategoryLi id={item.id}
                                                                          onClick={() => {
                                                                              handleChooseCategory({item: item})
                                                                          }}>
                                        <LiSpan>{item.name}</LiSpan>
                                    </CategoryLi>)}
                                </CategoryLiContainer>
                            </CategoryUl>
                        </CategoryContainer>
                        <InputText type="number" className='borderPrimary'
                                   value={quantity ? quantity : 0}
                                   onChange={(e) => {
                                       setQuantity(e.target.value)
                                   }}
                        ></InputText>
                        <TextArea id='createAsset_Specification' rows="5" cols="46"
                                  className='borderPrimary'
                                  value={note ? note : ''}
                                  onChange={(e) => {
                                      setNote(e.target.value)
                                  }}
                                  maxLength={200}
                        ></TextArea>
                    </FormContentItem>
                    <ButtonContainer>
                        <ButtonClick
                            id='createAsset_Cancel'
                            onClick={() => navigate("/home")}
                        >Cancel</ButtonClick>
                    </ButtonContainer>
                    <ButtonContainer>
                        <button
                            type="button"
                            className={'btn btn-login btn-danger btn-lg ' +
                                (categoryId && quantity ? '' : 'disabled')}
                            style={{fontSize: "1rem"}}
                            onClick={handleEditRequestAsset}
                        >
                            Save
                        </button>
                    </ButtonContainer>
                </FormContent>
            </Form>
        </Container>
    )
}

export default EditRequestAssetMain