import React from 'react'
import { LoaderDiv } from './style'
const Loader = ({
    absolute
}) => {
    return (
        <LoaderDiv absolute={absolute}>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
        </LoaderDiv>
    )
}

export default Loader