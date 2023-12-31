import { useEffect, useState } from "react";
import { useContextState } from "../../context/application/context";
import "../../css/findDoctorHospital.css";
import { ColorRing } from "react-loader-spinner";

const FindHospitals = () => {
  const { isLoading, isConnected, doctorWeb3 } = useContextState();
  const [doctorDetails, setDoctorDetails] = useState([]);

  useEffect(() => {
    const findDHDetails = async () => {
      if (isLoading || !isConnected) return;
      const doctorAddress = await doctorWeb3.findHospitals();
      const detailArray = [];
      for (let i = 0; i < (await doctorAddress.length); i++) {
        let helpObject = {};
        const data = await doctorWeb3.getAuthorizedDHDetails(doctorAddress[i]);
        data.forEach((element, index) => {
          helpObject["detail" + index] = element;
        });
        detailArray.push(helpObject);
      }
      setDoctorDetails(detailArray);
    };
    findDHDetails();
  }, [doctorWeb3, isConnected, isLoading]);

  return (
    <div className="findDH">
      <h1 className="text-3xl mt-8 font-medium">Registered Hospitals</h1>
      <div className="findDH-cards">
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
          doctorDetails.map((item, index) => {
            return (
              <div key={index} className="findDH-card">
                <img
                  className="findDH-card-image"
                  src="https://via.placeholder.com/200"
                  alt=""
                />
                <p className="findDH-card-name">{item.detail1}</p>
                <p className="findDH-card-address">{item.detail0}</p>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default FindHospitals;
