import React, { useEffect, useState } from 'react'
import Select from "react-select";

function Project(props:any) {

    const [project, setProject] = useState<{ value: string; label: string; project_Id: string }[]>([]);
    useEffect(() => {
        setProject(props.ProjectOption);
    }, [props.ProjectOption]);


    const onProjectSelect = (value:any) => {
        const row = props.row;

        var dataSource = props.allRecord;
        var filteredColumn = dataSource.filter((a:any) => a.key === row.key)[0];
        filteredColumn.project = value.value;
        props.onSaveData(dataSource);
        props.setProject(project[0].project_Id);
    }

    return (
        <Select
            //styles={{ width: "100%" }}
            isDisabled={props.row.status.toLowerCase() === 'holiday' || props.row.status.toLowerCase() === 'leave' ? true : false}
            isSearchable={false}
            options={project}
            onChange={(value:any) => onProjectSelect(value)}
            defaultValue={project.filter((a) => a.value === props.row.project)[0]}
        />
    )
}
export default Project