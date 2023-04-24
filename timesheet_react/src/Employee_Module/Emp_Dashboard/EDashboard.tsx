import React, { useState } from 'react';
import './EDashboard.css';
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';

const EDashboard = () => {
  const [pendingVisible, setPendingVisible] = useState(false);
  const [approvedVisible, setApprovedVisible] = useState(false);
  const [rejectedVisible, setRejectedVisible] = useState(false);


  const handlePendingClick = () => {
    setPendingVisible(true);
    setApprovedVisible(false);
    setRejectedVisible(false);
    console.log('Pending button clicked');
  };

  const handleApprovedClick = () => {
    setPendingVisible(false);
    setApprovedVisible(true);
    setRejectedVisible(false);
    console.log('Approved button clicked');
  };

  const handleRejectedClick = () => {
    setPendingVisible(false);
    setApprovedVisible(false);
    setRejectedVisible(true);
    console.log('Rejected button clicked');
  };
  const date = new Date();
  date.setMonth(date.getMonth() - 1);
  const Month = date.toLocaleString('default', { month: 'long' });
  const Year = date.getFullYear();
  

  return (
    <div>
      <h1 className='h1dashboard'>Timesheet {Month}-{Year} Status</h1>
      <div className='button-container'>
        <button
          className={`button ${pendingVisible ? 'button--selected' : ''}`}
          onClick={handlePendingClick}
        >
          {pendingVisible && (
            <span className="button-icon selected">
              <CheckOutlined style={{ color: 'blue' }} />
            </span>
          )}
          Pending
        </button>
        <button
          className={`button ${approvedVisible ? 'button--approved' : ''}`}
          onClick={handleApprovedClick}
        >
          {approvedVisible && (
            <span className="button-icon selected">
              <CheckOutlined style={{ color: 'green' }} />
            </span>
          )}
          Approved
        </button>
        <button
          className={`button ${rejectedVisible ? 'button--rejected' : ''}`}
          onClick={handleRejectedClick}
        >
          {rejectedVisible && (
            <span className="button-icon selected">
              <CloseOutlined style={{ color: 'red' }} />
            </span>
          )}
          Rejected
        </button>
      </div>
    </div>
  );
};

export default EDashboard;