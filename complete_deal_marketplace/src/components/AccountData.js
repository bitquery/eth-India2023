import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";

import { useParams } from "react-router-dom";

const flattenRow = (originalRow, index) => ({
  id: index + 1,
  date: originalRow.date?.date || "",
  blockHeight: originalRow.block?.height || 0,
  blockTime: originalRow.block?.timestamp.time || 0,
  senderAccount: originalRow.sender?.account || "",
  receiverAccount: originalRow.receiver?.account || "",
  senderAddress: originalRow.sender?.address || "",
  receiverAddress: originalRow.receiver?.address || "",
  burned: originalRow.burned || 0,
  amount: originalRow.amount || 0,
  signedHash: originalRow.signedHash || "",
  signatureType: originalRow.signatureType || "",
  signature: originalRow.signature || "",
  refund: originalRow.refund || 0,
  returnValue: originalRow.returnValue || "",
  success: originalRow.success,
  hash: originalRow.hash,
  transferType: originalRow.transferType,
});

const columns1 = [
  {
    field: "date",
    headerName: "Date",
    flex: 1,
    headerClassName: "bold-header",
  },
  { field: "blockHeight", headerName: "Block Height", flex: 1 },
  { field: "senderAccount", headerName: "Sender Account", flex: 1 },
  { field: "receiverAccount", headerName: "Receiver Account", flex: 1 },
  { field: "burned", headerName: "Burned", flex: 1 },
  { field: "amount", headerName: "Amount", flex: 1 },
  { field: "signedHash", headerName: "Signed Hash", flex: 1 },
  { field: "signatureType", headerName: "Signature Type", flex: 1 },
  { field: "signature", headerName: "Signature", flex: 1 },
  { field: "refund", headerName: "Refund", flex: 1 },
  { field: "returnValue", headerName: "Return Value", flex: 1 },
];

const columns2 = [
  { field: "senderAccount", headerName: "Sender Account", flex: 1 },
  { field: "receiverAccount", headerName: "Receiver Account", flex: 1 },
  { field: "success", headerName: "Success", flex: 1 },
  { field: "hash", headerName: "Hash", flex: 1 },
];

const columns3 = [
  { field: "transferType", headerName: "Transfer Type", flex: 1 },
  { field: "senderAddress", headerName: "Sender Account", flex: 1 },
  { field: "receiverAddress", headerName: "Receiver Account", flex: 1 },
  { field: "hash", headerName: "Hash", flex: 1 },
  { field: "amount", headerName: "Amount", flex: 1 },
];

const DataTable = ({ rows, col }) => (
  <div style={{ height: 400, width: "100%" }}>
    <DataGrid
      rows={rows}
      columns={col.map((column) => ({
        ...column,
        cellClassName: "bold-cell",
      }))}
      pageSize={5}
      rowsPerPageOptions={[5, 10, 20]}
      checkboxSelection
      disableSelectionOnClick
    />
  </div>
);

function AccountData(props) {
  const params = useParams();

  const [apiData, setApiData] = useState([]);
  const [apiDataStorageCommits, setApiDataStorageCommits] = useState([]);
  const [apiDataStorageCommit, setApiDataStorageCommit] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("X-API-KEY", "BQYEkA40vbJBTq8FRV4WsHgLKJV1Q2RE");

      const raw = JSON.stringify({
        query: "query ($sender: String!) {\n  filecoin(network: filecoin) {\n    messages(\n      any: {receiver: {is: \"f05\"}}\n      options: {limit: 10}\n      method: {is: 4}\n      date: {after: \"2023-08-08\"}\n      sender: {is: $sender}\n    ) {\n      date: date {\n        date(format: \"%Y-%m-%d\")\n      }\n      block {\n        height\n      }\n      sender {\n        account\n        address\n        type\n      }\n      receiver {\n        account\n        address\n        type\n      }\n      method {\n        id\n        name\n      }\n      burned\n      amount\n      signedHash\n      signatureType\n      signature\n      refund\n      returnValue\n    }\n  }\n}\n",
        variables: `{\n  "sender": "${params.address}"\n}`,
      });

      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };

      try {
        const response = await fetch(
          "https://graphql.bitquery.io",
          requestOptions
        );
        const result = await response.json();

        console.log(" >>109 API Response:", result);

        const publishDeals = result?.data?.filecoin?.publishdeals || [];
        const formattedRows =
          publishDeals.map((deal, index) => flattenRow(deal, index)) || [];

        console.log("Formatted Rows:", formattedRows);

        setApiData(formattedRows);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    const fetchData2 = async () => {
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("X-API-KEY", "BQYEkA40vbJBTq8FRV4WsHgLKJV1Q2RE");

      var raw = JSON.stringify({
        query:
          'query MyQuery($address: String) {\n  filecoin(network: filecoin) {\n    messages(\n      method: {is: 6}\n      date: {is: "2023-12-01"}\n      options: {limit: 10}\n      sender: {is: $address}\n    ) {\n      amount\n      sender {\n        account\n        address\n        type\n      }\n      receiver {\n        account\n        address\n        annotation\n        type\n      }\n      success\n      method {\n        id\n        name\n      }\n      hash\n    }\n  }\n}',
        variables: `{\n  "address": "${params.address}"\n}`,
      });

      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };

      try {
        const response = await fetch(
          "https://graphql.bitquery.io",
          requestOptions
        );
        const result = await response.json();

        console.log("API Response - changed query:", result);

        const publishDeals = result?.data?.filecoin?.messages || [];
        const formattedRows =
          publishDeals.map((deal, index) => flattenRow(deal, index)) || [];

        console.log("Formatted Rows:", formattedRows);

        setApiDataStorageCommits(formattedRows);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    const fetchData3 = async () => {
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("X-API-KEY", "BQYEkA40vbJBTq8FRV4WsHgLKJV1Q2RE");

      var raw = JSON.stringify({
        query:
          'query ($sender: String) {\n  filecoin(network: filecoin) {\n    transfers(\n      transferType: {is: burn}\n      options: {limit: 10}\n      sender: {is: $sender}\n      date: {is: "2023-10-10"}\n    ) {\n      transferType\n      receiver {\n        address\n      }\n      sender {\n        address\n      }\n      amount\n      block {\n        timestamp {\n          time\n        }\n      }\n      hash\n    }\n  }\n}\n',
        variables: `{\n  "address": "${params.address}"\n}`,
      });

      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };

      try {
        const response = await fetch(
          "https://graphql.bitquery.io",
          requestOptions
        );
        const result = await response.json();

        console.log("API Response:", result);

        const publishDeals = result?.data?.filecoin?.transfers || [];
        const formattedRows =
          publishDeals.map((deal, index) => flattenRow(deal, index)) || [];

        console.log("Formatted Rows:", formattedRows);

        setApiDataStorageCommit(formattedRows);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
    fetchData2();
    fetchData3();
  }, []);

  return (
    <div className="App">
      <div className="dashboard-title"></div>
      <div className="data-table-container">
        <h2>Previous Deals</h2>
        <DataTable rows={apiData} col={columns1} />
      </div>
      <div className="data-table-container">
        <h2>Storage Commits</h2>
        <DataTable rows={apiDataStorageCommits} col={columns2} />
      </div>
      <div className="data-table-container">
        <h2>Past Collateral Slashing</h2>
        <DataTable rows={apiDataStorageCommit} col={columns3} />
      </div>
    </div>
  );
}

export default AccountData;
