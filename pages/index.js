import Head from 'next/head'
import React, { useState } from 'react';
import StickyItem from '../components/sticky-item'
import Modal from '../components/modal'

export default function Home() {
    const [stickies, setStickies] = useState([]);
    const [selected, setSelected] = useState({});
    const [showModal, setShowModal] = useState(false);

    const saveSticky = (current) => {
        console.log(current);

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

        setStickies(newStickies);
        setShowModal(false);
        setSelected({});
    };

    const deleteSticky = (current) => {
        if (current.id >= 0) {
            var newStickies = [...stickies];
            newStickies.splice(current.id, 1);

            setStickies(newStickies);
        }

        setShowModal(false);
        setSelected({});
    }

    return ( 
        <>
            <Head>
                <title>Design Thinking App</title>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </Head>

            <main className = "border border-1 border-dark" >
                <div className="border border-1 border-dark buttons btn-group p-3 w-100">
                    <button className="btn btn-dark mx-1" onClick={() => { setShowModal(true) }}>Create Sticky</button>
                    <button className="btn btn-danger mx-1" onClick={() => setStickies([])}>Clear Board</button>
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