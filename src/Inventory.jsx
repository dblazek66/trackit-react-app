export default function Inventory({ renderInfo, data, resetButtons }) {
  const handleInfo = (id, e) => {
    resetButtons();
    e.target.className = "btn-selected";
    renderInfo(id);
  };

  return (
    <>
      <table>
        <thead>
          <tr>
            <th>info</th>
            <th>Customer Name</th>
            <th>Status</th>
            <th>Contact</th>
            <th>Info</th>
            <th>Last Contact</th>
          </tr>
        </thead>
        <tbody>
          {data &&
            data.length &&
            data.map((item) => {
              return (
                <tr key={item.id}>
                  <td>
                    <button
                      className="btn"
                      onClick={(e) => handleInfo(item.id, e)}
                    >
                      info
                    </button>
                  </td>
                  <td>{item.Customer}</td>
                  <td>{item.Status}</td>
                  <td>{item.Contact}</td>
                  <td>{item.ContactInfo || item.Phone}</td>
                  <td>{item.LastContacted || "-"}</td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </>
  );
}
