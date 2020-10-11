import React, {useState, ChangeEvent, useCallback} from "react";
import { TextField } from "@material-ui/core";

type EditablSpanPropsType = {
    value: string
    changeValue?: (value: string) => void
}

const EditableSpan = React.memo(function (props: EditablSpanPropsType) {

    console.log("EditableSpan called");

    let [editMode, setEditMode]=useState(false);
    let [title, setTitle]=useState(props.value);
    
    const activatedEditmode = () => {
        setEditMode(true);
    }
    const deActivatedEditmode = () => {
        setEditMode(false);
    }

    const onChangeTitle = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value);
        if (props.changeValue) {
        props.changeValue(title);
        }
    }, [])
    return editMode
    ? 
        <TextField 
                    variant="outlined"
                    value={title} 
                    onBlur={deActivatedEditmode} 
                    autoFocus={true}
                    onChange={onChangeTitle}
        />
    : <span onDoubleClick={activatedEditmode}>{props.value}</span>
    
});

export default EditableSpan;