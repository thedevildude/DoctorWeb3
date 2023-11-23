import "../css/UploadReports.css";
import { useState, useRef } from "react";
import { create } from "ipfs-http-client";
import { ColorRing } from "react-loader-spinner";
import { useContextState } from "../context/context";

const UploadReports = () => {
  const { isLoading, isConnected, doctorWeb3 } = useContextState();
  const [form, setForm] = useState({
    category: "",
    age: "",
    weight: "",
    height: "",
    gender: "",
    bloodgroup: "",
    selectedFile: "",
    password: "",
  });
  const fileInputRef = useRef(null);

  const handleFileInput = (e) => {
    if (e.target.value === "") {
      e.target.value = "";
      setForm({ ...form, selectedFile: "" });
      fileInputRef.current.value = "";
      return;
    }
    const file = e.target.files[0];
    if (file.type === "application/pdf") {
      setForm({ ...form, selectedFile: file });
    } else {
      window.alert("Please select a pdf file");
      e.target.value = "";
      setForm({ ...form, selectedFile: "" });
      fileInputRef.current.value = "";
    }
  };

  const UploadReport = async (fileHash) => {
    const tx = await doctorWeb3.uploadReport(
      fileHash,
      form.category,
      form.age,
      form.weight,
      form.height,
      form.gender,
      form.bloodgroup
    );
    await tx.wait();
    doctorWeb3.on("ReportUploaded", (fileHash, category) => {
      window.alert(
        `Report with filehash ${fileHash} of ${category} category uploaded successfully`
      );
    });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    console.log(form.selectedFile?.name);
    try {
      const ipfs = create(new URL("http://127.0.0.1:5001/"));
      const { cid } = await ipfs.add(form.selectedFile);
      console.log(cid.toString());
      await UploadReport(cid.toString());
    } catch (error) {
      console.log(error);
      window.alert("Please install IPFS and run it on port 5001");
    } finally {
      setForm({ ...form, selectedFile: "" });
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="upload-reports">
      <h1 className="upload-reports-form-title">Upload Reports</h1>
      <div className="upload-reports-form-container">
        {isLoading || !isConnected ? (
          <ColorRing
            visible={true}
            height="80"
            width="80"
            ariaLabel="blocks-loading"
            wrapperStyle={{}}
            wrapperClass="blocks-wrapper"
            colors={["#e15b64", "#f47e60", "#f8b26a", "#abbd81", "#849b87"]}
          />
        ) : (
          <form className="upload-reports-form">
            <input
              type="string"
              value={form.category}
              placeholder="Enter category of report"
              onChange={(e) => setForm({ ...form, category: e.target.value })}
            />
            <input
              type="number"
              value={form.age}
              placeholder="Enter age"
              onChange={(e) => setForm({ ...form, age: e.target.value })}
            />
            <input
              type="number"
              value={form.weight}
              placeholder="Enter weight"
              onChange={(e) => setForm({ ...form, weight: e.target.value })}
            />
            <input
              type="number"
              value={form.height}
              placeholder="Enter height"
              onChange={(e) => setForm({ ...form, height: e.target.value })}
            />
            <input
              type="string"
              value={form.gender}
              placeholder="Enter gender"
              onChange={(e) => setForm({ ...form, gender: e.target.value })}
            />
            <input
              type="string"
              value={form.bloodgroup}
              placeholder="Enter bloodgroup"
              onChange={(e) => setForm({ ...form, bloodgroup: e.target.value })}
            />
            <input type="file" ref={fileInputRef} onChange={handleFileInput} />
            <input
              type="password"
              value={form.password}
              placeholder="Enter password to lock your report"
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            />
            {form.selectedFile !== "" ? (
              <button
                type="submit"
                onClick={handleFormSubmit}
                className="button-18"
              >
                Upload Report
              </button>
            ) : (
              <button disabled className="button-18">
                Upload Report
              </button>
            )}
          </form>
        )}
      </div>
    </div>
  );
};

export default UploadReports;
