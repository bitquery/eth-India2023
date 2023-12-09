import getData from "../bitquery/data";
import React, { useState, useEffect, useRef } from "react";

const renderClickableAddress = (address) => (
  <a href="#" onClick={() => handleClick(address)}>
    {address}
  </a>
);
function handleClick(address) {
  // Open a new tab with the provided address
  window.open(`https://explorer.bitquery.io/filecoin/address/${address}/graph`, "_blank");
}


function MyComponent() {
  const [data, setData] = useState(null);
  const [precommitdata, setPrecommitData] = useState(null);
  const [burndata, setBurnData] = useState(null);
  useEffect(() => {
    getData()
      .then((responseData) => {
        console.log(">>10 ", responseData.data.data.filecoin);
        setData(responseData.data.data.filecoin.publishdeals);
        setPrecommitData(responseData.data.data.filecoin.precommits);
        setBurnData(responseData.data.data.filecoin.storage_burn);
      })
      .catch((error) => console.error(error));
  }, []);

  if (!data) {
    return <p>Loading...</p>;
  }

  const styles = {
    table: {
      borderCollapse: "collapse",
      width: "100%",
    },
    thead: {
      backgroundColor: "#f1f1f1",
      fontSize: "16px",
    },
    tbody: {
      backgroundColor: "#fff",
      fontSize: "14px",
    },
  
    a: {
      color: "#000",
      textDecoration: "none",
      fontWeight: "bold",
      ":hover": {
        textDecoration: "underline",
      },
    },
  };

  return (
    <div>
      <h2>Latest Deals</h2>
      <table style={styles.table}>
        <thead style={styles.thead}>
          <tr>
            <th>Sender Account</th>
            <th>Sender Address</th>
            <th>Burned</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody style={styles.tbody}>
          {data.map((message) => (
            <tr key={message.signedHash}>
              <td>{message.sender.account}</td>
              <td>{renderClickableAddress(message.sender.address)}</td>
              <td>{message.burned}</td>
              <td>{message.date.date}</td>
            </tr>
          ))}
        </tbody>
      </table >
      <h2>Latest Storage Commits</h2>
      <table style={styles.table}>
        <thead style={styles.thead}>
          <tr>
            <th>Sender Account</th>
            <th>Sender Address</th>
            <th>Burned</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody style={styles.tbody}>
          {precommitdata.map((message) => (
            <tr key={message.signedHash}>
              <td>{message.sender.account}</td>
              <td>{renderClickableAddress(message.sender.address)}</td>
              <td>{message.burned}</td>
              <td>{message.date.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h2>Latest Storage Burns</h2>
      <table style={styles.table}>
        <thead style={styles.thead}>
          <tr>
            <th>Sender Account</th>
            <th>Amount Burned</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody style={styles.tbody}>
          {burndata.map((transfer) => (
            <tr key={transfer.hash}>
           <td>{renderClickableAddress(transfer.sender.address)}</td>
              <td>{transfer.amount}</td>
              <td>{transfer.date.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default MyComponent;
