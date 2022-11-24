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
        <button className="button-18" onClick={FindReports}>Find Reports</button>
      </div>
      <div className="reports-box">
        {loading ? <p className='loading-text'>Loading...</p> : reports.map((item, index) => {
          return (
            <div key={index} className="report-box">
              <div className="">
                <p>FileHash</p>
                <p>{item[0]}</p>
              </div>
              <p>{item[1]}</p>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default MyReports;