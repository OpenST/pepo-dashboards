import React from 'react';
import styled from 'styled-components';
import { toObjs } from './results';

const Wrapper = styled.div`
    width: ${props => props.width}px;
    height: ${props => props.height}px;
    max-height: ${props => props.height}px;
`;

export default function ProfileInfo({ width, height, dataSources, ...props }) {
    const [res] = toObjs(dataSources);

    if (!res || !res.video) {
        return null;
    }

    return (
        <Wrapper width={width} height={height} data-test="my-table">
            <video key={res.video} width={width} height={height} style={{ objectFit: 'cover' }} autoPlay loop muted>
                <source key={res.video} src={res.video} type="video/mp4" />
            </video>
        </Wrapper>
    );
}
