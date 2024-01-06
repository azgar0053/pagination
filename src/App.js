import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';

function App() {
  const [apiData, setApiData] = useState([]);
  const [currentPage, setCurrentPage]= useState(1);
  const itemsPerPage = 10;

  const fetchData=async()=>{
    try{
    const fetchD = await fetch('https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json');
    if(fetchD.status===200){
      const res = await fetchD.json();
      setApiData(res);
    }
    } catch(error){
      alert('failed to fetch data')
    }
  }

  useEffect(()=>{
    fetchData()
  }, [])

  const indexOfLastItem =currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = apiData.slice(indexOfFirstItem, indexOfLastItem);


  const handlePrev=()=>{
    setCurrentPage((prev)=> (prev>1? prev-1: prev ));
  }
  const handleNext=()=>{
    setCurrentPage((prev)=> (apiData.length/prev>10?prev+1:prev));
  }

  return (
    <div className="App">
      <h1>Employee Data Table</h1>
      <table style={{border:'2px solid lightGreen',borderCollapse:'collapse', width: '100%', margin:'20px 0px'}}>
        <thead>
        <tr style={{border:'1px solid black',borderCollapse:'collapse', backgroundColor:'lightGreen', color:'white', }}>
          <th style={{padding:'10px'}}>ID</th>
          <th>Name</th>
          <th>Email</th>
          <th>Role</th>
        </tr>
        </thead>
        <tbody>
        {currentItems.map((ele)=> 
        <tr key={ele.id} style={{border:'1px solid black',borderCollapse:'collapse'}}>
          <td style={{padding:'10px'}}>{ele.id}</td>
          <td>{ele.name}</td>
          <td>{ele.email}</td>
          <td>{ele.role}</td>
        </tr>)}
        </tbody>
      </table>
      <div style={{display:'flex', justifyContent:'center',}}>
        <button onClick={handlePrev} style={{margin:'10px', padding:'10px 20px'}}>Previous</button>
        <p style={{margin:'10px'}}>{currentPage}</p>
        <button onClick={handleNext} style={{margin:'10px', padding:'10px 20px'}}>Next</button></div>
    </div>
  );
}

export default App;
