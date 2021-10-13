import React, { Component } from "react";
import { useForm } from "react-hook-form";
import mintIt from './App'
// import {} from 'react-imageblurloader'

function FormSub({ setMyvar, setMyJson, setMyImg }) {
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

        let nName = '';
        if (data.name.length < 20) {
            nName = data.name.padEnd(20, '-')
        } else if (data.name.length > 20) {
            nName = data.name.slice(0, 20)
        };

        let nSymb = '';
        if (data.symbol.length < 4) {
            nSymb = data.symbol.padEnd(4, '-')
        } else {
            nSymb = data.symbol.slice(0, 4)
        };

        let nDesc = '';
        if (data.desc.length < 50) {
            nDesc = data.desc.padEnd(50, '-')
        } else {
            nDesc = data.desc.slice(0, 50)
        };

        const NNN = nName + nSymb ;
        setMyvar(NNN);

        console.log('data :\n', data);
        const shortData = { ...data };
        delete shortData.photoupload;
        console.log('shortData :\n', shortData);

        const jsondata = JSON.stringify(shortData);
        setMyJson(jsondata)
     
        console.log('Stringified Json : \n', jsondata);
        console.log('NNN :\n', NNN);

        console.log("ungood :\n", data.photoupload[0].name);

        setMyImg(data.photoupload[0])
        // convert input.jpg -resize 20x20 -quality 70 preview.jpg
        mintIt()
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <p>--------------------------</p>

            <div><label>Name </label><input
                type="string"
                name="name"
                placeholder="Name (max 20 char)"
                {...register('name', { max: 20 })}
            /></div>

            <div><label>Symbol </label><input
                type="string"
                name="symbol"
                placeholder="Symbol (max 4 char)"
                {...register('symbol', { max: 4 })}
            /></div>

            <div><label>Description </label><input
                type="string"
                name="desc"
                placeholder="Description (max 50 char)"
                {...register('desc', { max: 50 })}
            /></div>
            <div>
                <input
                    id="photoupload"
                    type="file"
                    accept="image/*"
                    {...register('photoupload')}
                />
            </div>
            <p><button>Submit</button></p>
            <p>--------------------------</p>
        </form>
    );
}

export default FormSub