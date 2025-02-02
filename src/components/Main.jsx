import Details from "./details" 
import { useState } from 'react'
export default function Main({ setShowDetails, newData, setNewData, openForm, showDetails ,status,setStatus}) {
 
  const [details,setDetails] =  useState(null);
  console.log(newData);
  console.log(details);

  function handleClick(x) {
    setDetails(x)
    setShowDetails(true);
  }
  
  return(
    <div className="main-area">
  {showDetails ? (
    <Details details={details} openForm={openForm}  setDetails={setDetails} setNewData={setNewData} newData={newData} setShowDetails={setShowDetails}  />
  ) : newData.length > 0 ? (
    newData.map((x) => (
      <div key={x.id}>
        <div className="card" onClick={() => handleClick(x)}>
          <div className="card-flex">
            <h3>
              <span>#</span>MG3131
            </h3>
            <h4>{x.name}</h4>
          </div>

          <div className="date-flex">
            <div>
              <h5>{x.date}</h5>
              <h6>{x.items.map(y => y.total).reduce((a, b) => a + b, 0)}</h6>
            </div>
            <div>
              <div className={x.status === 'paid' ? 'status-paid' : '' || x.status ==='draft' ? 'draft' : '' || x.status === 'pending' ? 'status' : ''}>
                {x.status}
              </div>
            </div>
          </div>
        </div>
      </div>
    ))
  ) : (
    ''
  )}
</div>
  )
 
}

