import { useEffect, useState } from 'react';
import { ethers } from 'ethers';
//import { Line, Pie } from 'react-chartjs-2'; // For visualizations
//import { gql } from '@apollo/client';

function BurnInsights({ client, query }) {
  const [burnData, setBurnData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await client.query({ query });
      setBurnData(data.burns);
    };

    fetchData();
  }, [client, query]);

  // Prepare data for visualization
  const burnsHistory = burnData.map(burn => ({
    burner: burn.burner,
    value: ethers.formatEther(burn.value),
    blockNumber: burn.blockNumber,
    blockTimestamp: burn.blockTimestamp,
    transactionHash: burn.transactionHash

  }));
  //truncate addresses
  const truncateAddress = (address) => `${address.slice(0, 6)}...${address.slice(-4)}`;

 

  return (
    <div className='card'>
      <h2>Burn Insights</h2>
    
      <div className="table-container">
        <table>
            <thead>
            <tr>
                <th>Burner Address</th>
                <th>Amount</th>
                <th>Block Number</th>
            </tr>
            </thead>
            <tbody>
            {burnsHistory.map((burn, idx) => (
                <tr key={idx}>
                <td>{truncateAddress(burn.burner)}</td>
                <td>{burn.value}</td>
                <td>{burn.blockNumber}</td>
                </tr>
            ))}
            </tbody>
        </table>
      </div>
          
    </div>
  );
}

export default BurnInsights;
