import React from 'react';
import styled from 'styled-components';
import { toObjs } from './results';

const Wrapper = styled.div`
    width: ${props => props.width}px;
    height: ${props => props.height}px;
    max-height: ${props => props.height}px;
`;

export default function Pic({ width, height, dataSources, ...props }) {
    const [res] = toObjs(dataSources);

    if (!res || !res.profile_image) {
        return null;
    }

    return (
        <Wrapper width={width} height={height} data-test="my-table">
            <img src={res.profile_image} width={width} height={height} alt="profile pic" />
        </Wrapper>
    );
}
