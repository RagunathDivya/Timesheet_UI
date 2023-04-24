import React, { useState, useEffect } from 'react'
import { Input } from 'antd';

type Props = {
    defaultValue: number,
    row: {
        key: string,
        defaultValue: number,
        duration: number,
        status: string
    },
    allRecord: Array<any>,
    onSaveData: (data: Array<any>) => void
}

function Duration(props: Props) {

    const [value, setValue] = useState<number>(0);

    useEffect(() => {
        setValue(props.defaultValue);
        const row = props.row;
        var dataSource = props.allRecord;
        var filteredColumn = dataSource.filter((a:any) => a.key === row.key)[0];
        filteredColumn.duration = value;
        props.onSaveData(dataSource);
    }, [])

    const onDuration = (value:number) => {
        const row = props.row;
        setValue(value);
        var dataSource = props.allRecord;
        var filteredColumn = dataSource.filter((a:any) => a.key === row.key)[0];
        filteredColumn.duration = value;
        props.onSaveData(dataSource);
    }
    
    const maxLengthCheck = (e:React.FormEvent<HTMLInputElement>) => {
        if (Number(e.currentTarget.value) > Number(e.currentTarget.max)) {
            e.currentTarget.value = e.currentTarget.value.slice(0, e.currentTarget.value.length - 1);
        }
    }

    return (
        <Input
            value={value}
            type='number'
            defaultValue={props.row.defaultValue}
            onChange={(e:React.FormEvent<HTMLInputElement>) => onDuration(parseInt(e.currentTarget.value))}
            onInput={maxLengthCheck}
            onKeyDown={(evt:React.KeyboardEvent<HTMLInputElement>) => {
                evt.key === 'e' && evt.preventDefault();
                evt.key === '-' && evt.preventDefault();
            }}
            max={'24'}
            min={0}
            disabled={props.row.status.toLowerCase() === 'leave' || props.row.status.toLowerCase() === 'holiday' ? true : false}
        />
    )
}

export default Duration
