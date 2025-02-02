import NewForm from './NewForm'
export default function Filter({openForm, newData}) { 
  return(
    <>
    <div className="filter-area">
      <div>
        <h3>Invoices</h3>
        <h6>{newData.length > 0 ? newData.length : "No"} invoices</h6>
      </div>
        <div className="right">
          <select name="">
            <option value="">Draft</option>
            <option value="">Pending</option>
            <option value="">Paid</option>
          </select>
          <button onClick={openForm} className="button-area">
            <img src="./assets/images/plus-icon.jpg"/>New</button>
        </div>         
    </div>
    </>
  )
}