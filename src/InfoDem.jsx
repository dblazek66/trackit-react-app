import { useState } from "react";
import {formatSchedDate} from "./js/common.js"
export default function InfoDem({ customer, age }) {
  return (
    <>
      <div className="grid">
        <div className="col-4 info-card ">
          <div className="grid">
            <div className="col-4">
              <label>Customer</label>
            </div>
            <div className="col-8">{customer.Customer}</div>
            <div className="col-4">
              <label>Ticket No.</label>
            </div>
            <div className="col-8">{customer.TicketNum}</div>
            <div className="col-4">
              <label>Status</label>
            </div>
            <div className="col-8">{customer.Status}</div>
            <div className="col-4">
              <label>Last Contact</label>
            </div>
            <div className="col-8">
              {customer.LastContacted} - <span className="text-highlight">{age} day(s) ago </span>
            </div>
            <div className="col-4">
              <label>Phone </label>
            </div>
            <div className="col-8">{customer.Phone}</div>
          </div>
        </div>
        <div className="col-4 info-card">
          <div className="grid">
            <div className="col-4">
              <label>Contact</label>
            </div>
            <div className="col-8">{customer.Contact}</div>
            <div className="col-4">
              <label>Contact Info</label>
            </div>
            <div className="col-8">{customer.ContactInfo}</div>
            <div className="col-4">
              <label>Email </label>
            </div>
            <div className="col-8">{customer.Email}</div>
            <div className="col-4">
              <label>Address </label>
            </div>
            <div className="col-8">{customer.Address}</div>
            <div className="col-4"></div>
            <div className="col-8">
              {customer.City}, {customer.State}, {customer.Zip}
            </div>
          </div>
        </div>
        <div className="col-4 info-card">
          <div className="grid">
            <div className="col-5">
              <label>Schedule Date </label>
            </div>
            <div className="col-7">
              {formatSchedDate(customer.ScheduleDate)}
            </div>
              <div className="col-5">
                <label>Schedule Time </label>
              </div>
              <div className="col-7">{customer.ScheduleTime}</div>
            </div>
            <div className="col-4">
              <label>Location </label>
            </div>
            <div className="col-8">
                {customer.ScheduleLocation}
            </div>
          </div>
  
      </div>
    </>
  );
}
