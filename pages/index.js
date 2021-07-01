import Head from 'next/head'
import React, { useState } from 'react';
import StickyItem from '../components/sticky-item'
import Modal from '../components/modal'

export default function Home() {
    const [stickies, setStickies] = useState([]);
    const [selected, setSelected] = useState({});
    const [showModal, setShowModal] = useState(false);

    const saveSticky = (current) => {
        current.text = current.text.trim();

        var newStickies = [...stickies];
        if (!current.text) {
            deleteSticky(current);
            return;
        }

        if (current.id >= 0) {
            newStickies[current.id].text = current.text;
            newStickies[current.id].color = current.color;
        } else {
            newStickies.push({
                text: current.text,
                color: current.color
            });
        }

        finish(newStickies);
    };

    const deleteSticky = (current) => {
        if (current.id >= 0) {
            var newStickies = [...stickies];
            newStickies.splice(current.id, 1);

            return finish(newStickies);
        }

        finish();
    }

    const finish = (newStickies = []) => {
        if (newStickies.length > 0) {
            newStickies.sort((a, b) => {
                if (a.color > b.color) return -1;
                if (a.color < b.color) return 1;
                return 0;
            });

            setStickies(newStickies);
        }

        setShowModal(false);
        setSelected({});
    }

    const exportCSV = () => {
        var text = '';
        stickies.forEach((sticky) => {
            text += `${sticky.color}, ${sticky.text}\n`;
        });

        const element = document.createElement('a');
        element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
        element.setAttribute('download', 'board.csv');
        element.click();
    }

    const importCSV = () => {
        const element = document.createElement('input');
        element.type = 'file';
        element.addEventListener('change', (e) => {
            var newStickies = [...stickies];

            const file = e.target.files[0];
            const reader = new FileReader();
            reader.addEventListener('load', (event) => {
                event.target.result.trim().split("\n").forEach((row) => {
                    const [color, text] = row.split(",");
                    newStickies.push({
                        text: text,
                        color: color
                    });
                });

                setStickies(newStickies);
            });

            reader.readAsText(file);
        });

        element.click();
    }

    return ( 
        <>
            <Head>
                <title>Design Thinking App</title>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </Head>

            <main className = "border border-1 border-dark" >
                <div className="border-bottom border-1 border-dark buttons btn-group p-3 w-100">
                    <button className="btn btn-dark mx-1" onClick={() => { setShowModal(true) }}>Create Sticky</button>
                    <button className="btn btn-danger mx-1" onClick={() => setStickies([])}>Clear Board</button>
                </div>
                <div className="w-100 p-1 text-center">
                    <button className="btn btn-outline-primary mx-1 btn-sm" onClick={exportCSV}>Export CSV</button>
                    <button className="btn btn-outline-primary mx-1 btn-sm" onClick={importCSV}>Import CSV</button>
                </div>

                <div className = "my-2 w-100 h-90" >
                    <div id="content">
                        {stickies.map((value, index) => {
                            return <StickyItem key={index} id={index} value={value} setShowModal={setShowModal}  setSelected={setSelected} />
                        })}
                    </div>
                </div>

                { showModal && <Modal selected={selected} onSave={saveSticky} onDelete={deleteSticky} /> }

                <div id = "background">
                    <p id="bg-text">Yonko's Design Thinking App</p>
                </div>
            </main>
        </>
    )
}