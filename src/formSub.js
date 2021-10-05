import React, {useReducer} from "react";
import { useForm } from "react-hook-form";
// import {NNNNContext} from './App'
// import axios from "axios";
// import { writeFile } from 'fs';
// import { useFormik } from 'formik';
//  const NNN = useContext(NNNNContext);
const reducer =(state, action) =>{
switch(action.type){
    case "addString":
        return state + action.payload;
    default:
        return state;
}
}
function FormSub({setMyvar}) {
    const { register, handleSubmit } = useForm({
        mode: 'onSubmit',
        defaultValues: {},
        resolver: undefined,
        context: undefined,
        criteriaMode: "firstError",
        shouldFocusError: true,
        shouldUnregister: true,
    })
    
    const onSubmit = (data) => {
        // preventDefault();
        // const jsonData = JSON.stringify(data, null, 2, (err) => {
        //     if (err) console.log('Error writing file:', err);
        // });
        let nName = '';
        // if (data.name.length < 20) {
            nName = data.name.padEnd(20,'-')
        // } else if(data.name.length == 20){
        //     nName = data.name
        // };
        let nSymb = '';
        if (data.symbol.length < 4) {
            nSymb = data.symbol.padEnd(4,'-')
     } else if(data.name.length == 4){
        nSymb = data.symbol
            } else{
                nSymb = data.symbol.slice(0,4)
            };
        let nUri = '';
        // if (data.uri.length < 50) {
            nUri = data.uri.padEnd(50,'-')
        // };
        // console.log(namel);
        // const NNN = useContext(NNNNContext);
          const NNN = nName + nSymb + nUri;
          setMyvar(NNN)
        // console.log('data: ', data);
        // console.log('jsondata: ', jsonData);
        console.log('NNN :', NNN);
        console.log('with length: ', NNN.length);
        // module.exports = { NNN };
    }
    // console.log(NNN);
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <p>--------------------------</p>
            <div><label>Name </label><input
                type="text"
                name="name"
                placeholder="Name"
                {...register('name', { required: true, max: 20 })}
                /></div>
            <div><label>Symbol </label><input
                type="text"
                name="symbol"
                placeholder="Symbol"
                {...register('symbol', { required: true, max: 4 })}
                /></div>
            <div><label>URI </label><input
                type="text"
                name="uri"
                placeholder="Uri"
                {...register('uri', { required: true, max: 50 })}
                /></div>
            <p><button>Submit</button></p>
            <p>--------------------------</p>
        </form>
    );
}

export default FormSub