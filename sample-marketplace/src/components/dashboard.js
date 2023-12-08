import getData from "../bitquery/data";
import React, { useState, useEffect, useRef } from "react";

function MyComponent() {
  const [data, setData] = useState(null);
  const [precommitdata, setPrecommitData] = useState(null);
  useEffect(() => {

    getData().then((responseData) => {
        console.log(">>10 ",responseData.data.data.filecoin)
        setData(responseData.data.data.filecoin.publishdeals);
        setPrecommitData(responseData.data.data.filecoin.precommits);
      }).catch((error) => console.error(error));
  }, []);

  if (!data) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h2>Latest Deals</h2>
      <table>
        <thead>
          <tr>
            <th>Sender Account</th>
            <th>Sender Address</th>
            <th>Burned</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {data.map((message) => (
            <tr key={message.signedHash}>
              <td>{message.sender.account}</td>
              <td>{message.sender.address}</td>
              <td>{message.burned}</td>
              <td>{message.date.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h2>Latest Storage Commits</h2>
      <table>
        <thead>
          <tr>
            <th>Sender Account</th>
            <th>Sender Address</th>
            <th>Burned</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {precommitdata.map((message) => (
            <tr key={message.signedHash}>
              <td>{message.sender.account}</td>
              <td>{message.sender.address}</td>
              <td>{message.burned}</td>
              <td>{message.date.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default MyComponent;
