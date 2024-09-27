import { useEffect, useState } from 'react';
import { ethers } from 'ethers';

//import { Line, Pie } from 'react-chartjs-2'; // For visualizations
import { gql } from '@apollo/client';

function TransferActivity({ client, query }) {
  const [transferData, setTransferData] = useState([]);
  
  useEffect(() => {
    const fetchData = async () => {
      const { data } = await client.query({ query });
      setTransferData(data.transfers);
    };

    fetchData();
  }, [client, query]);

 
 

  // Prepare data for visualization
  const transferHistory = transferData.map(transfer => ({
    from: transfer.from,
    to: transfer.to,
    amount: ethers.formatEther(transfer.value),
    blockNumber: transfer.blockNumber,
    blockTimestamp: transfer.blockTimestamp,
    transactionHash: transfer.transactionHash

  }));
  

  //truncate addresses
  const truncateAddress = (address) => `${address.slice(0, 6)}...${address.slice(-4)}`;

  return (
    <div className='card'>
      <h2>Transfer Activity</h2>
      
      <div className="table-container">
        <table>
            <thead>
            <tr>
                <th>Sender</th>
                <th>Recipient Address</th>
                <th>Amount</th>
                <th>Block Number</th>
            </tr>
            </thead>
            <tbody>
            {transferHistory.map((transfer, idx) => (
                <tr key={idx}>
                <td>{truncateAddress(transfer.from)}</td>
                <td>{truncateAddress(transfer.to)}</td>
                <td>{transfer.amount}</td>
                <td>{transfer.blockNumber}</td>
                </tr>
            ))}
            </tbody>
        </table>
      </div>
          
    </div>
  );
}

export default TransferActivity;
