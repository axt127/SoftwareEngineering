import React, { useState } from 'react';
import logo from './assets/logo.png';
import './WR.css';

const WR = () => {
  const [client, setClient] = useState('');
  const [po, setPo] = useState('');
  const [carrier, setCarrier] = useState('');
  const [trackingNumber, setTrackingNumber] = useState('');
  const [hazmatCode, setHazmatCode] = useState('');
  const [notes, setNotes] = useState('');
  
  
 
  const [tableData, setTableData] = useState([
    { number: '', type: '', length: '', width: '', height: '', weight: '', location: '' }
  ]);


  const handleClientChange = (e) => setClient(e.target.value);
  const handlePoChange = (e) => setPo(e.target.value);
  const handleCarrierChange = (e) => setCarrier(e.target.value);
  const handleTrackingNumberChange = (e) => setTrackingNumber(e.target.value);
  const handleHazmatCodeChange = (e) => setHazmatCode(e.target.value);
  const handleNotesChange = (e) => setNotes(e.target.value);

 
  const isUserTyping = client || po || carrier || trackingNumber || hazmatCode || notes || tableData.some(row => 
    Object.values(row).some(value => value !== '')
  );

  
  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = {
      client,
      po,
      carrier,
      trackingNumber,
      hazmatCode,
      notes,
      tableData
    };

    console.log('Form Data Submitted:', formData);
    
   
    alert('Form submitted successfully!');

   
    setClient('');
    setPo('');
    setCarrier('');
    setTrackingNumber('');
    setHazmatCode('');
    setNotes('');
    setTableData([{ number: '', type: '', length: '', width: '', height: '', weight: '', location: '' }]);

  
  };

  
  const handleClose = (e) => {
    e.preventDefault();
    if (!isUserTyping) {
      console.log("Close button clicked");
      
    }
  };

 
  const handleTableInputChange = (index, field, value) => {
    const newData = [...tableData];
    newData[index][field] = value;
    setTableData(newData);
  };

  return (
    <div className="form-container">
      <header>
        <h1>Warehouse Receipt Form</h1>
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      <div className="thick-line"></div>
      <form>
        <div className="main-layout">
          <div className="left-sidebar">
            <button type="button" className="purchase-order-btn" onClick={handlePurchaseOrder}>Purchase Order</button>
            <button type="button" className="material-receipt-btn" onClick={handleMaterialReceipt}>Material Receipt</button>
            <button type="button" className="print-form-btn" onClick={handlePrintForm}>Print Form</button>
            <button type="button" className="edit-warehouse-btn" onClick={handleEditWarehouseReceipt}>Edit Warehouse Receipt</button>
            <button type="button" className="print-btn" onClick={handlePrint}>Print</button>
          </div>
          <div className="form-content">
            <div className="top-section">
              <div className="client-info-wrapper">
                <div className="client-info-table">
                  <div className="form-row">
                    <div className="form-label">Client</div>
                    <div className="form-field">
                      <input type="text" value={client} onChange={handleClientChange} />
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-label">PO#</div>
                    <div className="form-field">
                      <input type="text" value={po} onChange={handlePoChange} />
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-label">Carrier</div>
                    <div className="form-field">
                      <input type="text" value={carrier} onChange={handleCarrierChange} />
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-label">Tracking Number</div>
                    <div className="form-field">
                      <input type="text" value={trackingNumber} onChange={handleTrackingNumberChange} />
                    </div>
                  </div>
                </div>
              </div>
              <div className="hazmat-section">
                <div className="hazmat-checkbox">
                  <input type="checkbox" />
                  <label>Hazmat</label>
                </div>
                <div className="hazmat-code">
                  <label>Hazmat Code</label>
                  <input type="text" value={hazmatCode} onChange={handleHazmatCodeChange} />
                </div>
              </div>
            </div>
            <div className="notes-section">
              <label>Notes:</label>
              <textarea value={notes} onChange={handleNotesChange}></textarea>
            </div>
            <div className="table-section">
              <table>
                <thead>
                  <tr>
                    <th>Number</th>
                    <th>Type</th>
                    <th>Length</th>
                    <th>Width</th>
                    <th>Height</th>
                    <th>Weight</th>
                    <th>Location</th>
                  </tr>
                </thead>
                <tbody>
                  {tableData.map((row, index) => (
                    <tr key={index}>
                      <td><input type="text" value={row.number} onChange={(e) => handleTableInputChange(index, 'number', e.target.value)} /></td>
                      <td><input type="text" value={row.type} onChange={(e) => handleTableInputChange(index, 'type', e.target.value)} /></td>
                      <td><input type="text" value={row.length} onChange={(e) => handleTableInputChange(index, 'length', e.target.value)} /></td>
                      <td><input type="text" value={row.width} onChange={(e) => handleTableInputChange(index, 'width', e.target.value)} /></td>
                      <td><input type="text" value={row.height} onChange={(e) => handleTableInputChange(index, 'height', e.target.value)} /></td>
                      <td><input type="text" value={row.weight} onChange={(e) => handleTableInputChange(index, 'weight', e.target.value)} /></td>
                      <td><input type="text" value={row.location} onChange={(e) => handleTableInputChange(index, 'location', e.target.value)} /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="button-section">
              <button className="delete-btn" type="button" onClick={handleDelete}>Delete</button>
              <button className="close-btn" type="submit" onClick={isUserTyping ? handleSubmit : handleClose}>
                {isUserTyping ? "Submit" : "Close"}
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};


function handlePurchaseOrder() { console.log("Purchase Order clicked"); }
function handleMaterialReceipt() { console.log("Material Receipt clicked"); }
function handlePrintForm() { console.log("Print Form clicked"); }
function handleEditWarehouseReceipt() { console.log("Edit Warehouse Receipt clicked"); }
function handlePrint() { console.log("Print clicked"); }
function handleDelete() { console.log("Delete clicked"); }

export default WR;
