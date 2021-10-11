import React from "react";
import { useForm } from "react-hook-form";
import mintIt from './App'

function FormSub({ setMyvar, setMyJson, setMyImg}) {
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

        let nUri = '';
        if (data.uri.length < 50) {
            nUri = data.uri.padEnd(50, '-')
        } else {
            nSymb = 'ERROR--URI-TOO-LONG'
        };

        const NNN = nName + nSymb + nUri;

        setMyvar(NNN);

        const jsondata = JSON.stringify(data);
        setMyJson(jsondata);

        console.log('stringified Json :', JSON.stringify(data));
        console.log('with length: ', NNN.length);
        console.log('NNN :', NNN);

        console.log("ungood",data.photoupload[0].name);

        // const ext = ta.photoupload[0].name.lastIndexOf(".")

        setMyImg(data.photoupload[0])
        // const extension = str.substring(ext)

        // const key = mint.pubkey + extension
        // console.log(data.photoupload.);

       mintIt()
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <p>--------------------------</p>

            <div><label>Name </label><input
                type="string"
                name="name"
                placeholder="Name"
                {...register('name', {  max: 20 })}
            /></div>

            <div><label>Symbol </label><input
                type="string"
                name="symbol"
                placeholder="Symbol"
                {...register('symbol', {  max: 4 })}
            /></div>

            <div><label>URI </label><input
                type="string"
                name="uri"
                placeholder="Uri"
                {...register('uri', {  max: 50 })}
            /></div>
            <div>
                <input
                    id="photoupload"
                    type="file"
                    accept="image/*"
                    {...register('photoupload', { required: true })}
                />
            </div>
            <p><button>Submit</button></p>
            <p>--------------------------</p>
        </form>
    );
}

export default FormSub