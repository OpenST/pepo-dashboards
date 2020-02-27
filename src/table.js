import React from 'react';
import styled from 'styled-components';
import Table from '@splunk/react-ui/Table';

const Wrapper = styled.div`
    width: ${props => props.width}px;
    height: ${props => props.height}px;
    max-height: ${props => props.height}px;
    overflow-y: scroll;
`;

const Value = styled.div`
    width: ${props => props.maxWidth}px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`;

const padNum = n => (n < 10 ? `0${n}` : String(n));

const formatTime = val => {
    const d = new Date(val);
    return `${d.getHours()}:${padNum(d.getMinutes())}:${padNum(d.getSeconds())}`;
};

export default function MyTable({ width, height, dataSources, ...props }) {
    let fields = [];
    let columns = [];
    try {
        fields = dataSources.primary.data.fields;
        columns = dataSources.primary.data.columns;
    } catch (e) {}

    const rows =
        columns.length > 0
            ? columns[0].map((_, i) => {
                  return {
                      id: `row${i}`,
                      values: columns.map(c => c[i]),
                  };
              })
            : [];

    return (
        <Wrapper width={width} height={height} data-test="my-table">
            <Table stripeRows>
                <Table.Head>
                    {fields.map(({ name }) => (
                        <Table.HeadCell truncate key={name}>
                            {name}
                        </Table.HeadCell>
                    ))}
                </Table.Head>
                <Table.Body>
                    {rows.map(row => (
                        <Table.Row key={row.id}>
                            {row.values.map((val, i) => (
                                <Table.Cell key={`val${i}`}>
                                    <Value maxWidth={(width - 30) / columns.length}>
                                        {fields[i].name === '_time' ? formatTime(val) : val}
                                    </Value>
                                </Table.Cell>
                            ))}
                        </Table.Row>
                    ))}
                </Table.Body>
            </Table>
        </Wrapper>
    );
}
