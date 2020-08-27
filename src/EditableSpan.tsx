import React, {useState, ChangeEvent} from "react";

type EditablSpanPropsType = {
    value: string
    changeValue?: (value: string) => void
}

function EditableSpan (props: EditablSpanPropsType) {

    let [editMode, setEditMode]=useState(false);
    let [title, setTitle]=useState(props.value);
    
    const activatedEditmode = () => {
        setEditMode(true);
    }
    const deActivatedEditmode = () => {
        setEditMode(false);
    }

    const onChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value);
        if (props.changeValue) {
        props.changeValue(title);
        }
    }
    return editMode
    ? <input 
        value={title} 
        onBlur={deActivatedEditmode} 
        autoFocus={true}
        onChange={onChangeTitle}
        />
    : <span onDoubleClick={activatedEditmode}>{props.value}</span>
    
};

export default EditableSpan;