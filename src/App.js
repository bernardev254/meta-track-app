import React, { useState, useEffect } from 'react';
import { ApolloClient, InMemoryCache, gql } from '@apollo/client';
import MintHistory from './components/MintHistory'; // Component for Mint Events
import BurnInsights from './components/BurnInsights'; // Component for MintFinished & Burn Insights
import ApprovalPermissions from './components/ApprovalPermissions'; // Component for Approval Events
import TransferActivity from './components/TransferActivity'; // Component for Transfer Events
//import TokenStatus from './components/TokenStatus'; // Component for Pause/Unpause Events
//import SupplyDemandAnalytics from './components/SupplyDemandAnalytics'; // Component for Combined Metrics
import './App.css';  // Custom CSS for layout

const QueryURL = "https://api.studio.thegraph.com/query/88578/metatrack/version/latest";
const client = new ApolloClient({ uri: QueryURL, cache: new InMemoryCache() });

function Dashboard() {
  const [selectedView, setSelectedView] = useState('MintHistory');

  // Define GraphQL queries for all required events
  const GET_MINT_EVENTS = gql`{ mints(first: 5) { id to amount blockNumber blockTimestamp transactionHash } }`;
  const GET_BURN_EVENTS = gql`{ burns(first: 5) { id burner value blockNumber } }`;
  const GET_APPROVAL_EVENTS = gql`{ approvals(first: 5) { id owner spender value } }`;
  const GET_TRANSFER_EVENTS = gql`{ transfers(first: 5) { id from to value blockNumber } }`;
  const GET_PAUSE_UNPAUSE_EVENTS = gql`{ pauseEvents { blockNumber paused } unpauseEvents { blockNumber } }`;
  const GET_TOTAL_MINT = gql`{mints{amount}}`;
  const GET_TOTAL_TRANSFER = gql`{transfers{amount}}`;

  return (
    <div className="parent">
      <header className='banner'>
        <h1>Decentraland MANA Token Dashboard</h1>
        <p>Explore Decentraland token events like Mints, Transfers, Approvals, and more.</p>
        
      </header>
      

      {/* Render components based on the selected view */}
      {/*selectedView === 'MintHistory' && <MintHistory query={GET_MINT_EVENTS} client={client} />*/}
      <div className='cards-container'>
        
        <MintHistory query={GET_MINT_EVENTS} query1={GET_TOTAL_MINT} client={client} />
        <TransferActivity query={GET_TRANSFER_EVENTS}  client={client} />
        <ApprovalPermissions query={GET_APPROVAL_EVENTS} client={client} />
        <BurnInsights query={GET_BURN_EVENTS} client={client} />
        
      </div>
    </div>
  );
}

export default Dashboard;
