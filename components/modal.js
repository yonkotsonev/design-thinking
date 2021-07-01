import React, { useEffect, useState } from 'react';

export default function Modal(props) {
    useEffect(() => {
        document.getElementById("modal-content").focus();
    });

    var selected = props.selected;
    selected.text = selected.text || "";
    selected.color = selected.color || "bg-warning";

    const [color, setColor] = useState(selected.color);

    const handleChange = (e) => { 
        selected.text = e.target.value;
    }

    const handleSave = () => {
        props.onSave(selected);
    };

    const handleDelete = () => {
        props.onDelete(selected);
    };

    const changeColor = (color) => {
        selected.color = color;
        setColor(selected.color);
    }

    return (
        <div id="modal" className="p-5">
            <div className="w-100 h-100">
                <div className="text-center w-100 h-90">
                    <textarea id="modal-content" className={`w-100 h-100 ${color} border border-dark border-1`} maxLength="800" defaultValue={selected.text} onChange={handleChange}></textarea>
                </div>
                <div className="btn-group w-100 p-3">
                    <button className="btn btn-warning btn-sm mx-1" onClick={() => {changeColor("bg-warning")}}>&nbsp;</button>
                    <button className="btn btn-danger btn-sm mx-1" onClick={() => {changeColor("bg-danger")}}>&nbsp;</button>
                    <button className="btn btn-info btn-sm mx-1" onClick={() => {changeColor("bg-info")}}>&nbsp;</button>
                    <button className="btn btn-primary btn-sm mx-1" onClick={() => {changeColor("bg-primary")}}>&nbsp;</button>
                    <button className="btn btn-secondary btn-sm mx-1" onClick={() => {changeColor("bg-secondary")}}>&nbsp;</button>
                    <button className="btn btn-success btn-sm mx-1" onClick={() => {changeColor("bg-success")}}>&nbsp;</button>
                </div>
                <div className="btn-group w-100 p-3">
                    <button className="btn btn-dark mx-1" onClick={handleSave}>OK</button>
                    <button className="btn btn-danger mx-1" onClick={handleDelete}>DELETE</button>
                </div>
            </div>
        </div>
    )
}