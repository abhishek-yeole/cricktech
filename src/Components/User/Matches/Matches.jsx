import React, { useState, useEffect } from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import './match.css';

const CricketScoreComponent = () => {
  const [apiData, setApiData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [sortCriteria, setSortCriteria] = useState('dateTimeGMT'); // Default sorting criteria
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://api.cricapi.com/v1/cricScore?apikey=80f3a127-a409-4396-86b6-5514f62f59df&offset=0");
        const data = await response.json();
        setApiData(data);
        setLoading(false);
      } catch (error) {
        console.error("An error occurred. Please check your code", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const getCardColor = (ms) => {
    if (ms === 'live') {
      return 'rgba(0, 0, 255, 0.4)';
    } else if (ms === 'fixture') {
      return 'rgba(0, 255, 0, 0.4)';
    } else if (ms === 'result') {
      return 'rgba(255, 0, 0, 0.5)';
    } else {
      return 'white';
    }
  };

  const handleSortChange = (event) => {
    setSortCriteria(event.target.value);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredAndSortedData = apiData
    ? apiData.data
        .filter((match) => match.t1.toLowerCase().includes(searchQuery.toLowerCase()) || match.t2.toLowerCase().includes(searchQuery.toLowerCase()))
        .sort((a, b) => (a[sortCriteria] > b[sortCriteria] ? 1 : -1))
    : [];

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
          <br />
          <h1>Cricket Matches</h1><br />
          <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-around'}}>
            <div> 
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Sort</InputLabel>
                <Select labelId="demo-simple-select-label" id="demo-simple-select" value={sortCriteria} label="Sort by" onChange={handleSortChange} fullWidth>
                  <MenuItem value={'dateTimeGMT'}>Date and Time</MenuItem>
                  <MenuItem value={'matchType'}>Match Type</MenuItem>
                </Select>
              </FormControl>
            </div>
            <div><TextField id="filled-basic" label="Search" variant="filled" placeholder="Search teams..." value={searchQuery} onChange={handleSearchChange}/></div>
          </div><br />
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
            {filteredAndSortedData.map((match, index) => (
              <div className='match-card' key={index} style={{ border: '1px solid #ccc', borderRadius: '12px', margin: '10px', padding: '10px', width: '300px', backgroundColor: getCardColor(match.ms) }}>
                <h3 style={{textTransform: 'uppercase', textAlign: 'center', margin: '5px'}}>{match.matchType}</h3>
                <div style={{display:'flex', justifyContent: 'space-around'}}>
                  <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems:'center', fontSize:'12px', fontWeight: 'bold'}}>
                    <img src={match.t1img} alt={`${match.t1} logo`} style={{ width: '64px', height: '64px' }} />
                    {match.t1}
                  </div>
                  <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems:'center', fontSize:'12px', fontWeight: 'bold'}}>
                    <img src={match.t2img} alt={`${match.t2} logo`} style={{ width: '64px', height: '64px' }} />
                    {match.t2}
                  </div>
                </div><br />
                <p><strong>Status: </strong> {match.status}</p>
                <p><strong>Score: </strong>{match.t1s} - {match.t2s}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CricketScoreComponent;