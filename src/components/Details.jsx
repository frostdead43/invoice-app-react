import { useRef, useState } from 'react'
export default function Details({ details, setDetails, setNewData, newData, setShowDetails }) {
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
    const total = formObj.qty * formObj.price;
    formObj.total = total;
    updateWork(formObj);
    handleMarkPaid(formObj)
    

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
              <div className={details.status === 'draft' ? 'status-draft' : '' || details.status === 'pending' ? 'status-pending' : 'status-paid'}>{details.status}</div>
            </div>
            <div className="payment-area">
              <div className='payment-desc'>
                <h3><span>#</span>MG3131</h3>
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
        <div className="form-area">
          <div className="flex">
            <img src="./assets/images/left-arrow.svg" alt="Go back" />
            <span onClick={() => setShowDetails(false)}>Go back</span>
          </div>
          <h2>New Invoice</h2>
          <h5>Bill From</h5>
          <form onSubmit={handleSubmit}>
            <label htmlFor="streetAddress">
              Street Address
              <input defaultValue={details.streetAddress} name="streetAddress" id="streetAddress" type="text" />
            </label>
            <div className="address-group">
              <label htmlFor="cityFrom">
                City
                <input defaultValue={details.cityFrom} name="cityFrom" id="cityFrom" type="text" />
              </label>
              <label htmlFor="postCode">
                Post Code
                <input defaultValue={details.postCode} name="postCode" id="postCode" type="text" />
              </label>
            </div>
            <label htmlFor="countryFrom">
              Country
              <input defaultValue={details.countryTo} name="countryFrom" id="countryFrom" type="text" />
            </label>
            <h5>Bill To</h5>
            <label htmlFor="name">
              Client’s Name
              <input defaultValue={details.name} name="name" id="client-name" type="text" />
            </label>
            <label htmlFor="clientEmail">
              Client’s Email
              <input defaultValue={details.clientEmail} name="clientEmail" id="clientsEmail" type="email" />
            </label>
            <label htmlFor="streetTo">
              Street Address
              <input defaultValue={details.streetAddress} name="streetTo" id="streetTo" type="text" />
            </label>
            <div className="address-group">
              <label htmlFor="cityTo">
                City
                <input defaultValue={details.cityTo} name="cityTo" id="cityTo" type="text" />
              </label>
              <label htmlFor="postCodeTo">
                Post Code
                <input defaultValue={details.postCodeTo} name="postCodeTo" id="postCodeTo" type="text" />
              </label>
            </div>
            <label htmlFor="countryTo">
              Country
              <input defaultValue={details.countryTo} name="countryTo" id="countryTo" type="text" />
            </label>
            <label htmlFor="date">
              Invoice Date
              <input defaultValue={details.date} name="date" id="date" type="date" />
            </label>
            <label htmlFor="paymentTerms">
              Payment Terms
              <select name="paymentTerms" id="paymentTerms">
                <option value="">Net 1 Days</option>
                <option value="">Net 7 Days</option>
                <option value="">Net 15 Days</option>
                <option value="">Net 30 Days</option>
              </select>
            </label>
            <label htmlFor="desc">
              Project Description
              <input defaultValue={details.desc} name="desc" id="desc" type="text" />
            </label>
            <h4>Item List</h4>
            <div className="item">
              <label htmlFor="itemName">
                Item Name
                <input defaultValue={details.itemName} name="itemName" id="itemName" type="text" />
              </label>
              <div className="item-details">
                <label htmlFor="qty">
                  Qty.
                  <input defaultValue={details.qty} id="qty" type="number" name="qty" />
                </label>
                <label htmlFor="price">
                  Price
                  <input defaultValue={details.price} id="price" type="number" name="price" />
                </label>
                <label htmlFor="total">
                  Total
                  <input type="number" disabled id="total" name="total" />
                </label>
                <img src="./assets/images/trash-icon.svg" alt="" />
              </div>
            </div>
            <button className="add-item-btn"> + Add New Item</button>
            <div className="form-footer">
              <button>Discard</button>
              <button>Save as Draft</button>
              <button>Save & Send</button>
            </div>
          </form>
        </div>
      )}
    </>
  )
}
