import React, { useState, useEffect } from 'react';
import { ApolloClient, InMemoryCache, gql } from '@apollo/client';
import './App.css';  // Importing the CSS

function Dashboard() {
  const [eventType, setEventType] = useState('mints'); // Default event type
  const [eventData, setEventData] = useState([]);

  const QueryURL = "https://api.studio.thegraph.com/query/88578/metatrack/version/latest";  // Replace with actual subgraph endpoint

  const client = new ApolloClient({
    uri: QueryURL,
    cache: new InMemoryCache()
  });

  // Define GraphQL queries for each Decentraland (MANA) event type
  const GET_MINTS = gql`
    {
      mints(first: 10) {
        id
        to
        value
      }
    }
  `;

  const GET_APPROVALS = gql`
    {
      approvals(first: 16) {
        id
        owner
        spender
        value
      }
    }
  `;

  const GET_TRANSFERS = gql`
    {
      transfers(first: 16) {
        id
        from
        to
        value
      }
    }
  `;

  const GET_BURNS = gql`
    {
      burns(first: 16) {
        id
        from
        value
      }
    }
  `;

  const GET_PAUSE_EVENTS = gql`
    {
      pauses(first: 16) {
        id
        paused
      }
    }
  `;

  const GET_UNPAUSE_EVENTS = gql`
    {
      unpauses(first: 16) {
        id
        unpaused
      }
    }
  `;

  // Fetch data based on selected event type
  useEffect(() => {
    const fetchData = async () => {
      try {
        let query;
        switch (eventType) {
          case 'mints':
            query = GET_MINTS;
            break;
          case 'approvals':
            query = GET_APPROVALS;
            break;
          case 'transfers':
            query = GET_TRANSFERS;
            break;
          case 'burns':
            query = GET_BURNS;
            break;
          case 'pauses':
            query = GET_PAUSE_EVENTS;
            break;
          case 'unpauses':
            query = GET_UNPAUSE_EVENTS;
            break;
          default:
            query = GET_MINTS;
        }

        const { data } = await client.query({ query });
        setEventData(data[eventType]);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [eventType, client]);

  return (
    <div className="parent">
      <div className="banner">
        <h1>Decentraland (MANA) Event Dashboard</h1>
        <p>Explore Decentraland token events like Mints, Transfers, Approvals, and more.</p>
      </div>
  
      <div>
        tokenomics
      </div>
  
      <div className="cards-container">
        {eventData && eventData.length > 0 ? (
          eventData.map((event) => (
            <div key={event.id} className="card">
              <h2>{eventType.charAt(0).toUpperCase() + eventType.slice(1)} Data</h2>
              <div className="card-data">
                {eventType === 'mints' && (
                  <>
                    <div>To: <span className="value">{event.to}</span></div>
                    <div>Value: <span className="value">{event.value}</span></div>
                  </>
                )}
                {eventType === 'approvals' && (
                  <>
                    <div>Owner: <span className="value">{event.owner}</span></div>
                    <div>Spender: <span className="value">{event.spender}</span></div>
                    <div>Value: <span className="value">{event.value}</span></div>
                  </>
                )}
                {eventType === 'transfers' && (
                  <>
                    <div>From: <span className="value">{event.from}</span></div>
                    <div>To: <span className="value">{event.to}</span></div>
                    <div>Value: <span className="value">{event.value}</span></div>
                  </>
                )}
                {eventType === 'burns' && (
                  <>
                    <div>From: <span className="value">{event.from}</span></div>
                    <div>Value: <span className="value">{event.value}</span></div>
                  </>
                )}
                {eventType === 'pauses' && (
                  <>
                    <div>Paused: <span className="value">{event.paused ? 'Yes' : 'No'}</span></div>
                  </>
                )}
                {eventType === 'unpauses' && (
                  <>
                    <div>Unpaused: <span className="value">{event.unpaused ? 'Yes' : 'No'}</span></div>
                  </>
                )}
              </div>
            </div>
          ))
        ) : (
          <p>No data available for {eventType}</p>
        )}
      </div>
    </div>
  );
}

export default Dashboard;

