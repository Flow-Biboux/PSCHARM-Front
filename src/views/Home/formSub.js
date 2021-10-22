import React, { Component } from "react";
import { useForm } from "react-hook-form";
import Input from "../../components/styled/Input";
import styled from 'styled-components'

function FormSub({ SubmitForm }) {
    
    const { register, handleSubmit } = useForm({
        mode: 'onSubmit',
        defaultValues: {},
        resolver: undefined,
        context: undefined,
        criteriaMode: "firstError",
        shouldFocusError: true,
        shouldUnregister: true,
    })

    return (
        <form onSubmit={handleSubmit(SubmitForm)}>
            <ImgContainer src={"/images/nft_text-transparent.png"}></ImgContainer>
            <Container>
                <FormGroup><FormLabel>Name </FormLabel><Input
                    type="string"
                    name="name"
                    placeholder="Name (max 20 char)"
                    {...register('name', { max: 20, required: true })}
                /></FormGroup>

                <FormGroup><FormLabel>Symbol </FormLabel><Input
                    type="string"
                    name="symbol"
                    placeholder="Symbol (max 4 char)"
                    {...register('symbol', { max: 4, required: true })}
                /></FormGroup>

                <FormGroup><FormLabel> Description </FormLabel><Input
                    type="string"
                    name="description"
                    placeholder="Description (max 50 char)"
                    {...register('description', { max: 50, required: true })}
                /></FormGroup>
                
                <FormGroup><FormLabel>Upload </FormLabel>
                    <FormRight>
                        <UploadFile>
                            <span>Drag your <br /> file here <br /> (Only .png)</span>
                        </UploadFile>
                        <InputImg
                            id="photoupload"
                            type="file"
                            accept="image/png"
                            {...register('photoupload', { required: true })}
                        />
                    </FormRight>

                </FormGroup>
                <FormGroup>
                    <FormLabel></FormLabel>
                    <FormRight>
                        <SubmitBtn>Create</SubmitBtn>
                        {/* <SubmitLink href={"/feed"}>List</SubmitLink> */}
                    </FormRight>

                </FormGroup>

            </Container>
        </form>
    );
}

export default FormSub

const ImgContainer = styled.img`
    display: flex;
    width: 500px;
    justify-content: center;
    margin: 6px auto;
    
`
const Container = styled.div`
    width:400px;
    margin: 0 auto;
`

const FormGroup = styled.div`
   display:flex; 
`
const FormLabel = styled.label`
    width:120px;
    text-align: right;
    padding-right: 20px;
    padding-top:12px
`

const FormInput = styled.input`
    width:100%;
`
const FormRight = styled.div`
    width:100%;
    text-align: left;
    position: relative;
`
const UploadFile = styled.div`
    position: absolute;
    left: 3px;
    top: 7px;
    width: 135px;
    height: 113px;
    background: #fff;
    border-radius: 8px;
    color: #000;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
`
const InputImg = styled.input`
    width: 138px;
    height: 118px;
    opacity: 0;
    cursor: pointer;
    text-indent: -9999px;
`
const SubmitBtn = styled.button`
    width: auto;
    font-family: 'Playfair Display', serif;
    font-size: 30px;
    text-transform: uppercase;
    border-radius: 12px;
    margin-top: 50px;
    padding: 2px 16px 4px;
    transition: all 0.2s;
    border: 2px solid #832e2e;
    :hover{
        background: linear-gradient(90deg, rgba(43,0,0,1) 0%, rgba(168,102,102,1) 24%, rgba(196,92,92,1) 49%, rgba(204,133,133,1) 76%, rgba(43,0,0,1) 100%);
        color:#fff;
    }
`
const SubmitLink = styled.a`
    width: auto;
    font-family: 'Playfair Display', serif;
    font-size: 30px;
    text-transform: uppercase;
    border-radius: 12px;
    margin-top: 50px;
    padding: 2px 16px 4px;
    transition: all 0.2s;
    border: 2px solid #832e2e;
    background:#fff;
    text-decoration:none;
    color:#000;
    margin-left:16px;
    :hover{
        background: linear-gradient(90deg, rgba(43,0,0,1) 0%, rgba(168,102,102,1) 24%, rgba(196,92,92,1) 49%, rgba(204,133,133,1) 76%, rgba(43,0,0,1) 100%);
        color:#fff;
    }
`