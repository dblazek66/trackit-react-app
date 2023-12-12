export default function Dialog({ idata,resetButtons }) {
  const dialog = document.getElementById("dialog");

  return (
    <>
      <dialog id="dialog">
        <div className="dial-hdr">{idata.Customer}</div>
        <div className="dial-body">
          <div>
            <div className="title">Current Status</div>
            <div className="row">
              <div className="column half">
                <label>Status: </label>
                {idata.Status}
              </div>
              <div className="column half">
                <label>LastContacted: </label>
                {idata.LastContacted}
              </div>
            </div>
            <div className="title">Contact Info</div>
            <div className="row">
              <div className="column half">
                <label>Contact: </label>
                {idata.Contact}
              </div>
              <div className="column half">
                <label>ContactInfo: </label>
                {idata.ContactInfo}
              </div>
            </div>
            <div className="row">
              <div className="column half">
                <label>Phone: </label>
                {idata.Phone}
              </div>
              <div className="column half">
                <label>Address: </label>
                {idata.Address}
              </div>
            </div>
            <div className="row">
              <div className="column half">
                <label>City: </label>
                {idata.City}
              </div>
              <div className="column half">
                <label>State: </label>
                {idata.State}
              </div>
            </div>
            <div className="title">Schedule Info</div>
            <div className="row">
              <div className="column half">
                <label>Date: </label>
                {idata.ScheduleDate}
              </div>
              <div className="column half">
                <label>Time: </label>
                {idata.ScheduleTime}
              </div>
            </div>

            <div>
              <label>Location: </label>
              {idata.ScheduleLocation}
            </div>
            <div>
              {/*<select
                defaultValue={idata.Status}
              value={newstatus}
              className="input-control"
              onChange={(e) => handleNewStatus(e.target.value)}
            >
              <option value=""></option>
              <option value="New">New</option>
              <option value="Contacted">Contacted</option>
              <option value="Cancelled">Cancelled</option>
              <option value="Scheduled">Scheduled</option>
            </select>
            </div>
          
          <div>
            
            <input 
                className="input-control"
                onChange={(e)=>handleScheduleDate(e.target.value)}
                type="date"
                defaultValue={idata.ScheduleDate}
                value={idata.ScheduleDate||''}
            />
           */}
            </div>
          </div>
          <form method="dialog">
            <div className="dial-ftr">
              <button className="btn" onClick={()=>resetButtons()}>close</button>
            </div>
          </form>
        </div>
      </dialog>
    </>
  );
}
