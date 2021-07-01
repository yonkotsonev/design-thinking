import React, { useEffect } from 'react';

export default function Modal(props) {
    useEffect(() => {
        document.getElementById("modal-content").focus();
    });

    var selected = props.selected;
    selected.text = selected.text || "";
    selected.color = selected.color || "warning";

    const handleChange = (e) => { 
        selected.text = e.target.value;
    }

    const handleSave = () => {
        props.onSave(selected);
    };

    const handleDelete = () => {
        props.onDelete(selected);
    };

    return (
        <div id="modal" className="p-5">
            <div className="w-100 h-100">
                <div className="text-center w-100 h-90">
                    <textarea id="modal-content" className="w-100 h-100 bg-warning border border-dark border-1" maxLength="800" defaultValue={selected.text} onChange={handleChange}></textarea>
                </div>
                <div className="btn-group w-100 p-3">
                    <button className="btn btn-dark mx-1" onClick={handleSave}>OK</button>
                    <button className="btn btn-danger mx-1" onClick={handleDelete}>DELETE</button>
                </div>
            </div>
        </div>
    )
}