import { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import { BigNumber } from "@ethersproject/bignumber";
//import { Line, Pie } from 'react-chartjs-2'; // For visualizations
//import { gql } from '@apollo/client';

function ApprovalPermissions({ client, query }) {
  const [approvalData, setApprovalData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await client.query({ query });
      setApprovalData(data.approvals);
    };

    fetchData();
  }, [client, query]);

  // Prepare data for visualization
  const approvalsHistory = approvalData.map(approv => ({
    id: approv.id,
    owner: approv.owner,
    spender: approv.spender,
    value: approv.value,
    blockNumber: approv.blockNumber,
    blockTimestamp: approv.blockTimestamp,
    transactionHash: approv.transactionHash

  }));
  
  //truncate addresses
  const truncateAddress = (address) => `${address.slice(0, 6)}...${address.slice(-4)}`;

 

  return (
    <div className='card'>
      <h2>Approval Permissions</h2>
      
      <div className="table-container">
        <table>
            <thead>
            <tr>
                <th>Recipient Address</th>
                <th>Owner Address</th>
                <th>Id</th>
            </tr>
            </thead>
            <tbody>
            {approvalsHistory.map((approval, idx) => (
                <tr key={idx}>
                <td>{truncateAddress(approval.spender)}</td>
                <td>{truncateAddress(approval.owner)}</td>
                <td>{truncateAddress(approval.id)}</td>
                </tr>
            ))}
            </tbody>
        </table>
      </div>
          
    </div>
  );
}

export default ApprovalPermissions;
