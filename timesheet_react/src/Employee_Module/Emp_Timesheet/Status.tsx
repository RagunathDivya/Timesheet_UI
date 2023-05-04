import React, { useState } from 'react';
import Select from 'react-select';

function Status(props: any) {
  const [status, setStatus] = useState('');
  const status_options = [
    { value: 'Present', label: 'P', key: 'Present' },
    { value: 'Leave', label: 'L', key: 'Leave' },
    { value: 'WFH', label: 'WFH', key: 'WFH' },
    { label: 'H', value: 'Holiday', key: 'Holiday' },
  ];

  const onStatusSelect = (value: any) => {
    setStatus(value.value);
    const row = props.row;
    var dataSource = props.allRecord;
    var filteredColumn = dataSource.filter((a: any) => a.key === row.key)[0];
    filteredColumn.status = value.value;
    props.onSaveData(dataSource);
    if (row.key > 99) props.onDeleteRow(row);
  };

  const labelColor = (label: string) => {
    switch (label) {
      case 'P':
        return 'green';
      case 'L':
        return 'red';
      case 'WFH':
        return 'blue';
      case 'H':
        return 'purple';
      default:
        return 'black';
    }
  };

  const customStyles = {
    option: (provided: any, state: any) => ({
      ...provided,
      color: labelColor(state.data.label),
    }),
    singleValue: (provided: any, state: any) => ({
      ...provided,
      color: labelColor(state.data.label),
    }),
  };

  return (
    <Select
      isSearchable={false}
      onChange={(value: any) => onStatusSelect(value)}
      options={status_options}
      defaultValue={status_options.filter((a) => a.value == props.defaultValue)[0]}
      styles={customStyles}
    />
  );
}

export default Status;