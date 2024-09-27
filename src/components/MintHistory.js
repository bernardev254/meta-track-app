import { useEffect, useState } from 'react';
//import { Line, Pie } from 'react-chartjs-2'; // For visualizations
import { gql } from '@apollo/client';
import { ethers } from 'ethers';

function MintHistory({ client, query, query1 }) {
  const [mintData, setMintData] = useState([]);
  const [allMintData, setAllMintData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch both queries in parallel
        const [{ data: mintDataRes }, { data: allMintDataRes }] = await Promise.all([
          client.query({ query }),
          client.query({ query: query1 })
        ]);

        setMintData(mintDataRes.mints);
        setAllMintData(allMintDataRes.mints);
      } catch (error) {
        console.error("Error fetching mint data:", error);
      }
    };

    fetchData();
  }, [client, query, query1]);

  // Prepare data for visualization
  const mintHistory = mintData.map(mint => ({
    to: mint.to,
    amount: ethers.formatEther(mint.amount),
    blockNumber: mint.blockNumber,
    blockTimestamp: mint.blockTimestamp,
    transactionHash: mint.transactionHash
  }));

  const totalMinted = allMintData.reduce((acc, mint) => {
    return acc + Number(ethers.formatEther(mint.amount));
  }, 0);

  // Truncate addresses
  const truncateAddress = (address) => `${address.slice(0, 6)}...${address.slice(-4)}`;



  return (
    <div className='card'>
      <h2>Minting Activity</h2>
      <h2>Total mint value:   {totalMinted}</h2>
      <div className="table-container">
        <table>
            <thead>
            <tr>
                <th>To Address</th>
                <th>Amount</th>
                <th>Block Number</th>
            </tr>
            </thead>
            <tbody>
            {mintHistory.map((mint, idx) => (
                <tr key={idx}>
                <td>{truncateAddress(mint.to)}</td>
                <td>{mint.amount}</td>
                <td>{mint.blockNumber}</td>
                </tr>
            ))}
            </tbody>
        </table>
      </div>
          
    </div>
  );
}

export default MintHistory;
