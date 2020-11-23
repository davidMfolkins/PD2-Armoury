import React, { useState, useEffect } from 'react';
import axios from "axios";

import './Ladder.scss'

import { Table } from 'react-bootstrap'




function Ladder(props) {
  const [data, setData] = useState({
    ladderChars: []
  })
  const [hardcore, setHardcore] = useState({
    hardcore: false
  })

  useEffect(() => {
    axios.get('http://localhost:3030/ladder')
      .then((result) => {
        if (hardcore) {
          setData({ ...data, ladderChars: result.data[0].rankings.entries })
        } else {
          setData({ ...data, ladderChars: result.data[1].rankings.entries })
        }
      })
  }, [hardcore])

  const changeButton = function () {
    if (hardcore) {
      return "Hardcore Ladder"
    } else {
      return "Standard Ladder"
    }
  }

  const tableName = function () {
    if (!hardcore) {
      return "Hardcore Ladder"
    } else {
      return "Standard Ladder"
    }
  }

  const rows = data.ladderChars.map((entry) => {
    const className = entry.character.class
    const num = Math.ceil(Math.random() * 5)
    return (
      <tr id="ladderList" className="d-flex" onClick={() => props.getCharacter(entry.account.name, entry.character.name)}>
        <td className="col-4">{entry.character.name} </td>
        <td className="col-4">{entry.character.level}</td>
        <td className="col-4">{className}</td>
      </tr>
    )
  })


  return (
    <div className="ladderPage">
      
      <div className="ladderTitle">{tableName()}</div>
      <button className="ladderButton"onClick={() => setHardcore(!hardcore)}>{changeButton()}</button>
      <div className="ladderContainer">
        <Table striped bordered variant="dark">
          <thead>
            <tr className="d-flex">
              <th className="col-4">Name</th>
              <th className="col-4">Level</th>
              <th className="col-4">Class</th>
            </tr>
          </thead>
          <tbody>
            {rows}
          </tbody>
        </Table>
      </div>
    </div>
  );
}

export default Ladder;