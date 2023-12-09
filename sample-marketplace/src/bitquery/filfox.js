import React, { useEffect, useState } from 'react';



const StorageInfo = () => {
  const [responseData, setResponseData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://filfox.info/api/v1/message/bafy2bzacedup2x2wzttg7jgtq2zd72p6wg4d2hfzgi45yocjhfozw4z74zjla/others');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setResponseData(data);
      } catch (error) {
        console.error('There was a problem fetching the data:', error);
      }
    };

    fetchData();
  }, []);

  const renderTable = () => {
    if (!responseData) {
      return null;
    }

    const deals = responseData.decodedParams.Deals;

    return (
      <table>
        <thead>
          <tr>
            <th>Piece CID</th>
            <th>Piece Size</th>
            <th>Verified Deal</th>
            <th>Client</th>
            <th>Provider</th>
            <th>Label</th>
            <th>Start Epoch</th>
            <th>End Epoch</th>
            <th>Storage Price Per Epoch</th>
            <th>Provider Collateral</th>
            <th>Client Collateral</th>
          </tr>
        </thead>
        <tbody>
          {deals.map((deal, index) => (
            <tr key={index}>
              <td>{deal.Proposal.PieceCID}</td>
              <td>{deal.Proposal.PieceSize}</td>
              <td>{deal.Proposal.VerifiedDeal.toString()}</td>
              <td>{deal.Proposal.Client}</td>
              <td>{deal.Proposal.Provider}</td>
              <td>{deal.Proposal.Label}</td>
              <td>{deal.Proposal.StartEpoch}</td>
              <td>{deal.Proposal.endEpoch}</td>
              <td>{deal.Proposal.StoragePricePerEpoch}</td>
              <td>{deal.Proposal.ProviderCollateral}</td>
              <td>{deal.Proposal.ClientCollateral}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  return (
    <div>
      <h1>FVM Storage Information</h1>
      {renderTable()}
    </div>
  );
};

export default StorageInfo;
