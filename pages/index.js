import Head from 'next/head'
import React, { useState } from 'react';

export default function Home() {
  const [stickies, setStickies] = useState([]);
  var current = null;

  const showModal = () =>  {
    const sticky = document.getElementById('sticky');
    sticky.style.display = 'block';
    document.getElementById("sticky-content").focus();

    if (current !== null) {
      document.getElementById("sticky-content").value = stickies[current];
    }
  };

  const closeModal = () => {
    document.getElementById("sticky-content").value = null;

    const sticky = document.getElementById('sticky');
    sticky.style.display = 'none';
  }

  const saveSticky = () => {
    var newStickies = [...stickies];
    var value = document.getElementById("sticky-content").value;
    if (!value) {
      closeModal();
      return;
    }

    if (current != null) {
      newStickies[current] = value;
      current = null;
    } else {
      newStickies.push(value);
    }

    setStickies(newStickies);

    closeModal();
  };

  const deleteSticky = () => {
    if (current != null ) {
      var newStickies = [...stickies];
      newStickies.splice(current, 1);
      
      current = null;

      setStickies(newStickies);
    }

    closeModal();
  }

  return (
    <>
      <Head>
        <title>Design Thinking App</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <main className="border border-1 border-dark">
       <div className="border border-1 border-dark buttons btn-group p-3 w-100">
        <button className="btn btn-dark mx-1" onClick={showModal}>Create Sticky</button>
        <button className="btn btn-danger mx-1" onClick={() => setStickies([])}>Clear Board</button>
       </div>
       <div className="my-2 w-100 h-90">
          <div id="content">
            {stickies.map((value, index) => {
              return <div id={index} key={index} onClick={() => {current = index; showModal()}} className="bg-warning sticky m-1 p-1 border border-2 border-dark">{value}</div>
            })}
          </div>
       </div>

       <div id="sticky" className="p-5">
          <div className="w-100 h-100">
            <div className="text-center w-100 h-90">
              <textarea id="sticky-content" className="w-100 h-100 bg-warning border border-dark border-1" maxLength="800">

              </textarea>
            </div>
            <div className="btn-group w-100 p-3">
              <button className="btn btn-dark mx-1" onClick={saveSticky}>OK</button>
              <button className="btn btn-danger mx-1" onClick={deleteSticky}>DELETE</button>
            </div>
          </div>
       </div>
       <div id="background">
        <p id="bg-text">Yonko's Design Thinking App</p>
      </div>
      </main>
    </>
  )
}
