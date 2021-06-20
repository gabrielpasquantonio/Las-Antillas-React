import React from 'react'
import styled from "styled-components";
function Footer() {
    return (
        <Div>
            Copyright Tabaqueria Las Antillas - 2020. Todos los derechos reservados.
        </Div>
    )
}


const Div = styled.div`
display: flex;
justify-content: center;
align-items: center;
font-size: large;

`;


export default Footer
