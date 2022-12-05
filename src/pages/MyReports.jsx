import { useState, useContext } from "react";
import ContractContext from "../ContractContext";
import "../css/MyReports.css"

const MyReports = () => {

  const { doctorWeb3 } = useContext(ContractContext)
  const [reports, setReports] = useState([])
  const [loading, setLoading] = useState(true)


  const FindReports = async () => {
    const reports = await doctorWeb3.getPatientReports()
    DetailedReport(reports)
  }

  const DetailedReport = async (reports) => {
    let detailedReport = []
    for (let i = 0; i < reports.length; i++) {
      const data = await doctorWeb3.getDetailedReports(reports[i])
      detailedReport.push([data[0], data[1]])
    }
    setReports(detailedReport)
    setLoading(false)
  }

  return (
    <div className="my-reports">
      <h1 className="my-reports-title">My Reports</h1>
      <div className="my-reports-button">
        <button className="button-18" onClick={FindReports}>Load Reports</button>
      </div>
      <div className="reports-box">
        {loading ? <p className='loading-text'>Loading...</p> : reports.map((item, index) => {
          return (
            <div key={index} className="report-box">
              <div className="report-filehash-box">
                <p className="filehash-box-title">FileHash</p>
                <p className="filehash-box-filehash"><a href={`http://127.0.0.1:9090/ipfs/${item[0]}`} target="_blank" rel="noopener noreferrer">{item[0]}</a></p>
              </div>
              <p className="report-box-category">{item[1]}</p>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default MyReports;