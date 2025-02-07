import { useEffect, useState } from "react";

export default function NewForm({openForm,showForm,newData,setNewData,setShowForm,status,setStatus,}) {
  const [add, setAdd] = useState([
    {
      id: crypto.randomUUID(),
      itemName: "",
      qty: "",
      price: "",
      total: "",
    },
  ]);

  function handleAddMore() {
    setAdd([
      ...add,
      {
        id: crypto.randomUUID(),
        itemName: "",
        qty: "",
        price: "",
        total: "",
      },
    ]);
  }

  function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const formObj = Object.fromEntries(formData);
    formObj.id = crypto.randomUUID();
    formObj.status = status;
    console.log(formObj);
    e.target.reset();
    setNewData([formObj, ...newData]);
    setShowForm(false);
    formObj.items = add.map(item => ({
      itemName: item.itemName,
      qty: item.qty,
      price: item.price,
      total: item.total
    }));
  }

  if (!showForm) return null;

  return (
    <div className="form-container">
      <div className="form-area">
        <div className="flex" onClick={openForm}>
          <img src="./assets/images/left-arrow.svg" alt="Go back" />
          <span>Go back</span>
        </div>

        <h2>New Invoice</h2>

        <h5>Bill From</h5>
        <form onSubmit={handleSubmit}>
          <label htmlFor="streetAddress">
            Street Address
            <input required name="streetAddress" id="streetAddress" type="text" />
          </label>

          <div className="address-group">
            <div className="xd">
              <label htmlFor="cityFrom">
                City
                <input required name="cityFrom" id="cityFrom" type="text" />
              </label>

              <label htmlFor="postCode">
                Post Code
                <input required style={{ width: "115px" }} name="postCode" id="postCode" type="text"
                />
              </label>
            </div>
            <div>
              <label htmlFor="countryFrom">
                Country
                <input required className="country" name="countryFrom" id="countryFrom" type="text" />
              </label>
            </div>  

          </div>

          <h5>Bill To</h5>
          <label htmlFor="name">
            Client’s Name
            <input required name="name" id="client-name" type="text" />
          </label>

          <label htmlFor="clientEmail">
            Client’s Email
            <input required name="clientEmail" id="clientsEmail" type="email" />
          </label>

          <label htmlFor="streetTo">
            Street Address
            <input required name="streetTo" id="streetTo" type="text" />
          </label>

          <div className="address-group-two">
            <div className="xd">
              <label htmlFor="cityTo">
                City
                <input required name="cityTo" id="cityTo" type="text" />
              </label>
      
              <label htmlFor="postCodeTo">
                Post Code
                <input
                  style={{ width: "115px" }} required name="postCodeTo" id="postCodeTo" type="text"
                />
              </label>
              <div>
                <label htmlFor="countryTo">
                  Country
                  <input required name="countryTo" id="countryTo" type="text" />
                </label>
              </div>
            </div>
          </div>
          <label htmlFor="date">
            Invoice Date
            <input required name="date" id="date" type="date" />
          </label>

          <label htmlFor="paymentTerms">
            Payment Terms
            <select name="paymentTerms" id="paymentTerms">
              <option value="1">Net 1 Day</option>
              <option value="7">Net 7 Days</option>
              <option value="15">Net 15 Days</option>
              <option value="30">Net 30 Days</option>
            </select>
          </label>

          <label htmlFor="desc">
            Project Description
            <input required name="desc" id="desc" type="text" />
          </label>

          <h4>Item List</h4>
          {add.map((item, index) => (
            <div className="item" key={item.id}>
              <label htmlFor={`itemName-${index}`}>
                Item Name
                <input required name={`itemName-${index}`} id={`itemName-${index}`} type="text" value={item.itemName} onChange={(e) => { const newAdd = [...add]; newAdd[index].itemName = e.target.value; setAdd(newAdd); }} />
              </label>
              
              <div className="item-details">
                <label htmlFor={`qty-${index}`}>
                  Qty.
                  <input required
                    id={`qty-${index}`}
                    type="number"
                    name={`qty-${index}`}
                    value={item.qty}
                    onChange={(e) => {
                      const newAdd = [...add];
                      newAdd[index].qty = e.target.value;
                      newAdd[index].total = newAdd[index].qty * newAdd[index].price;
                      setAdd(newAdd);
                    }}
                  />
                </label>

                <label htmlFor={`price-${index}`}>
                  Price
                  <input required
                    id={`price-${index}`}
                    type="number"
                    name={`price-${index}`}
                    value={item.price}
                    onChange={(e) => {
                      const newAdd = [...add];
                      newAdd[index].price = e.target.value;
                      newAdd[index].total = newAdd[index].qty * newAdd[index].price;
                      setAdd(newAdd);
                    }}
                  />
                </label>

                <label htmlFor={`total`}>
                  Total
                  <input required
                    type="number"
                    disabled
                    id={`total`}
                    name={'total'}
                    value={item.total}
                  />
                </label>
                <img src="./assets/images/trash-icon.svg" alt="Delete" />
              </div>
            </div>
          ))}

          <button type="button" className="add-item-btn" onClick={handleAddMore}>+ Add New Item </button>
          <div className="form-footer">
            <button type="button" onClick={() => setShowForm(false)}>Discard</button>
            <button type="submit" onClick={() => setStatus("draft")}>Save as Draft</button>
            <button type="submit" onClick={() => setStatus("pending")}>Save & Send</button>
          </div>
        </form>
      </div>
    </div>
  );
}
