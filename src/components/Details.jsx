import { useRef, useState } from 'react'
export default function Details({ details, setDetails, setNewData, newData, setShowDetails, setShowForm }) {
  console.log(details);
  const dialogRef = useRef(null);
  const [isEdit, setEdit] = useState(false);

  function handleConfirm() {
    dialogRef.current.showModal();
  }

  function handleDelete() {
    setNewData(newData.filter(x => x.id !== details.id))
    console.log(details);
    dialogRef.current.close();
    setShowDetails(false);
  }

  function handleEscape() {
    dialogRef.current.close();
  }

  function handleEdit() {
    setEdit(!isEdit)
  }

  function updateWork(updatedWork) {
    const workToUpdateIndex = newData.findIndex(x => x.id === details.id);
    console.log(workToUpdateIndex);
    const updatedData = [...newData];
    updatedData[workToUpdateIndex] = updatedWork;
    setNewData(updatedData);
    setDetails(updatedWork);
    setEdit(false);

  }

  function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const formObj = Object.fromEntries(formData);
    formObj.id = details.id;
    formObj.total = formObj.qty * formObj.price; 
    updateWork(formObj); 
  }

  function handleMarkPaid() {
    const updateState = { ...details, status: 'paid' };
    console.log("Güncellenmiş Details:", updateState);
    const finalStatus = newData.map(x => x.id === details.id ? updateState : x);
    console.log(finalStatus);
    setDetails(updateState);
    setNewData(finalStatus);
  }


  return (
    <>
      {!isEdit ? (
        <>
          <div className="flex">
            <img src="./assets/images/left-arrow.svg" alt="Go back" />
            <span onClick={() => setShowDetails(false)}>Go back</span>
          </div>
          <div className="detail-area">
            <div className="status-area">
              <h6>Status</h6>
              <div className={details?.status === 'draft' ? 'status-draft' : '' || details?.status === 'pending' ? 'status-pending' : 'status-paid'}>{details.status}</div>
            </div>
            <div className="payment-area">
              <div className='payment-desc'>
                <h3><span>#</span>MG3543</h3>
                <h6>{details.desc}</h6>
              </div>

              <div className='payment-adress'>
                <h5>{details.streetAddress}</h5>
                <h5>{details.cityFrom}</h5>
                <h5>{details.postCode}</h5>
              </div>

              <div className='payment-billTo'>
                <h6>Bill To</h6>
                <h4>{details.name}</h4>
                <h5>{details.cityTo}</h5>
                <h5>{details.postCodeTo}</h5>
                <h5>{details.countryTo}</h5>
              </div>

              <div className='payment-due'>
                <h6>Payment Due</h6>
                <h4>{details.date}</h4>
              </div>

              <div className='payment-sendMail'>
                <h6>Sent to</h6>
                <h4>{details.clientEmail}</h4>
              </div>

              <div className='detail-payment'>
                <div>
                  {details.items.map((y) => (
                    <div className="prices" key={y.id}>
                      <div>
                        <h4>{y.itemName}</h4>
                        <div className='price-flex'>
                          <h4>{y.qty} x </h4> 
                          <h5>£{y.price}.00</h5>
                        </div>
                      </div>

                      <div>
                        <h6>£{y.total}.00</h6>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
                  <div className='total-payment'>
                    <h6>Amount Due</h6>
                    <h3>£{details.items.map(y => y.total).reduce((a, b) => a + b, 0)}.00</h3>
                  </div>

            </div>
            <div className="detail-footer">
              <button onClick={handleEdit}>Edit</button>
              <button onClick={handleConfirm}>Delete</button>
              <button onClick={() => handleMarkPaid(details)}>Mark as Paid</button>
            </div>
          </div>
          <dialog ref={dialogRef}>
            <h2>Confirm Deletion</h2>
            <p>Are you sure you want to delete invoice #XM9141? This action cannot be undone.</p>
            <div className="dialog-buttons">
              <button onClick={handleEscape}>Cancel</button>
              <button onClick={handleDelete}>Delete</button>
            </div>
          </dialog>
        </>
      ) : (
        <div className="form-container">
      <div className="form-area">
        <div className="flex">
          <img src="./assets/images/left-arrow.svg" alt="Go back" />
          <span>Go back</span>
        </div>

        <h2>Edit Invoice</h2>

        <h5>Bill From</h5>
        <form onSubmit={handleSubmit}>
          <label htmlFor="streetAddress">
            Street Address
            <input required  defaultValue={details.streetAddress}  name="streetAddress" id="streetAddress" type="text" />
          </label>

          <div className="address-group">
            <div className="xd">
              <label htmlFor="cityFromtwo">
                City
                <input required defaultValue={details.cityFrom} name="cityFromtwo" id="cityFrom" type="text" />
              </label>

              <label htmlFor="postCodetwo">
                Post Code
                <input required defaultValue={details.postCode} style={{ width: "115px" }} name="postCodetwo" id="postCode" type="text"
                />
              </label>
            </div>
            <div>
              <label htmlFor="countryFrom">
                Country
                <input required className="countrytwo" defaultValue={details.countryFrom} name="countryFromtwo" id="countryFromtwo" type="text" />
              </label>
            </div>  

          </div>

          <h5>Bill To</h5>
          <label htmlFor="nametwo">
            Client’s Name
            <input required defaultValue={details.name} name="nametwo" id="client-nametwo" type="text" />
          </label>

          <label htmlFor="clientEmailtwo">
            Client’s Email
            <input required defaultValue={details.clientEmail} name="clientEmailtwo" id="clientsEmailtwo" type="email" />
          </label>

          <label htmlFor="streetTotwo">
            Street Address
            <input required defaultValue={details.streetTo} name="streetTotwo" id="streetTotwo" type="text" />
          </label>

          <div className="address-group-two">
            <div className="xd">
              <label htmlFor="cityTotwo">
                City
                <input required defaultValue={details.cityTo} name="cityTotwo" id="cityTotwo" type="text" />
              </label>
      
              <label htmlFor="postCodeTo">
                Post Code
                <input
                  style={{ width: "115px" }} required defaultValue={details.postCodeTo} name="postCodeTo" id="postCodeTo" type="text"
                />
              </label>
              <div>
                <label htmlFor="countryTotwo">
                  Country
                  <input required defaultValue={details.countryTo} name="countryTotwo" id="countryTotwo" type="text" />
                </label>
              </div>
            </div>
          </div>
          <label htmlFor="datetwo">
            Invoice Date
            <input required name="datetwo" defaultValue={details.date} id="datetwo" type="date" />
          </label>

          <label htmlFor="paymentTermstwo">
            Payment Terms
            <select name="paymentTermstwo" id="paymentTermstwo">
              <option value="1">Net 1 Day</option>
              <option value="7">Net 7 Days</option>
              <option value="15">Net 15 Days</option>
              <option value="30">Net 30 Days</option>
            </select>
          </label>

          <label htmlFor="desctwo">
            Project Description
            <input required name="desctwo" defaultValue={details.desc} id="desctwo" type="text" />
          </label>

          <h4>Item List</h4>
         
            <div className="item">
              <label htmlFor={`itemName`}>
                Item Name
                <input required defaultValue={details.itemName} name={"itemName"} id={`itemName`} type="text" />
              </label>

              <div className="item-details">
                <label htmlFor={`qty`}>
                  Qty.
                  <input required
                    id={`qty`}
                    type="number"
                    name={`qty`}
                  />
                </label>

                <label htmlFor={`price`}>
                  Price
                  <input required
                    id={`price`}
                    type="number"
                    name={`price`}
                  />
                </label>

                <label htmlFor={`total`}>
                  Total
                  <input required
                    type="number"
                    disabled
                    id={`total`}
                    name={'total'}
                  />
                </label>
                <img src="./assets/images/trash-icon.svg" alt="Delete" />
              </div>
            </div>
          <button type="button" className="add-item-btn">+ Add New Item </button>
          <div className="form-detail-footer">
            <button type="button" onChange={() => setShowForm(false)}>Cancel</button>
            <button type="button">Save Changes</button>
          </div>
        </form>
      </div>
    </div>
      )}
    </>
  )
}
