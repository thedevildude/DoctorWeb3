import React, { useState, useEffect } from "react";

const ReportResponse = (props) => {
  const { doctorWeb3, filehash } = props;
  const [responses, setResponses] = useState(undefined);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (!doctorWeb3) return;
      const responseList = await doctorWeb3.getDHResponse(filehash);
      console.log(responseList);
      setResponses(responseList);
      setLoading(false);
    };
    fetchData();
  }, [doctorWeb3, filehash]);

  return (
    <div className="space-y-4">
      {loading && <div>Loading...</div>}
      {!loading && responses && responses.length > 0 ? (
        responses.map((response, index) => (
          <div
            key={index}
            className="bg-gray-100 p-4 rounded-lg shadow-md max-w-md"
          >
            <div className="text-gray-500">
              Received from:{" "}
              <span className="text-sm">{response["sender"]}</span>
            </div>
            <div className="text-gray-700">Message: {response["response"]}</div>
          </div>
        ))
      ) : (
        <div>No response yet.</div>
      )}
    </div>
  );
};

export default ReportResponse;
