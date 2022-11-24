import "../css/UploadReports.css";
import { useState, useContext } from "react";
import { create } from "ipfs-http-client";
import ContractContext from "../ContractContext";

const UploadReports = () => {

  const { UploadReport } = useContext(ContractContext)
  const [category, setCategory] = useState("")
  const [age, setAge] = useState("")
  const [weight, setWeight] = useState("")
  const [height, setHeight] = useState("")
  const [gender, setGender] = useState("")
  const [bloodgroup, setBloodgroup] = useState("")
  const [selectedFile, setSelectedFile] = useState()
  const [password, setPassword] = useState("")

  const handleFileInput = (e) => {
    if (e.target.value === "") {
      e.target.value = ""
      setSelectedFile()
      return
    }
    const file = e.target.files[0]
    if (file.type === "application/pdf") {
      setSelectedFile(file)
    } else {
      window.alert("Please select a pdf file")
      e.target.value = ""
      setSelectedFile()
    }
  }

  const handleFormSubmit = async (e) => {
    e.preventDefault()
    console.log(selectedFile.name);
    let ipfs = await ipfsClient()
    const {cid} = await ipfs.add(selectedFile)
    console.log(cid.toString());
    await UploadReport(cid.toString(), category, age, weight, height, gender, bloodgroup)
    setSelectedFile("")
  }

  const ipfsClient = async () => {
    const ipfs = create(new URL('http://127.0.0.1:5002/'))
    return ipfs
  }

  return (
    <div className="upload-reports">
      <h1 className="upload-reports-form-title">Upload Reports</h1>
      <div className="upload-reports-form-container">
        <form className="upload-reports-form">
          <input
            type="string"
            value={category}
            placeholder="Enter category of report"
            onChange={e => setCategory(e.target.value)}
          />
          <input
            type="number"
            value={age}
            placeholder="Enter age"
            onChange={e => setAge(e.target.value)}
          />
          <input
            type="number"
            value={weight}
            placeholder="Enter weight"
            onChange={e => setWeight(e.target.value)}
          />
          <input
            type="number"
            value={height}
            placeholder="Enter height"
            onChange={e => setHeight(e.target.value)}
          />
          <input
            type="string"
            value={gender}
            placeholder="Enter gender"
            onChange={e => setGender(e.target.value)}
          />
          <input
            type="string"
            value={bloodgroup}
            placeholder="Enter bloodgroup"
            onChange={e => setBloodgroup(e.target.value)}
          />
          <input
            type="file"
            onChange={handleFileInput}
          />
          <input
            type="password"
            value={password}
            placeholder="Enter password to lock your report"
            onChange={e => setPassword(e.target.value)}
          />
          {selectedFile !== undefined || "" ? <button type="submit" onClick={handleFormSubmit} className="button-18">Upload Report</button> : <button disabled className="button-18">Upload Report</button>}
        </form>
      </div>
    </div>
  )
}

export default UploadReports;