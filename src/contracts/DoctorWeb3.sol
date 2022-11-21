// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

// [X] 1  - Apply for verification as Doctor/Hospital
// [X] 2  - Find Patient/User Reports Collection
// [X] 3  - Find Doctors
// [X] 4  - Find Hospitals
// [X] 5  - Send Report to Doctor/Hospital for analysis
// [ ] 6  - Send Report Analysis back to patient
// [ ] 7  - Reviews Doctor/Hospital on receiving the report
// [X] 8  - Find authorized Doctor/Hospital

import "@chainlink/contracts/src/v0.8/ChainlinkClient.sol";

contract DoctorWeb3 is ChainlinkClient {
    using Chainlink for Chainlink.Request;
    address owner;
    address private oracle;
    bytes32 private jobId;
    uint256 private fee;
    string _value;
    uint256 requestId;

    constructor() {
        owner = msg.sender;
        setChainlinkToken(0x326C977E6efc84E512bB9C30f76E30c160eD06FB);
        oracle = 0x40193c8518BB267228Fc409a613bDbD8eC5a97b3;
        jobId = "ca98366cc7314957b8c012c72f05aeeb";
        fee = 0.1 * 10 ** 18; // 0.1 LINK
        _value = "hello";
        requestId = 1;

    }
    event ValueChanged(address indexed author, string oldValue, string newValue);


    struct PatientInfo {
        address patient;
        uint256 age;
        uint256 weight;
        uint256 height;
        string gender;
        string bloodGroup;
    }

    struct Report {
        string fileHash;
        string category;
        address Patient;
        PatientInfo patientInfo;
    }

    struct Applicant {
        string name;
        address applicantAddress;
        string medicalId;
        uint256 applicantType; // 0 = Doctor, 1 = Hospital
    }

    struct AuthorizedDHDetails {
        address authorizedDHAddress;
        string name;
        string medicalId;
    }

    address[] Doctors;
    address[] Hospitals;
    mapping(address => string[]) public PatientReports; // Maps Patient's address to its reports
    mapping(string => Report) public Reports; // Maps report hash value from IPFS to Report Datatype
    //mapping(bytes32 => Applicant) public Applicants; // Maps address of applicant to Applicant DataType
    mapping(uint256 => Applicant) public Applicants; // remove during main chain
    mapping(string => bool) private medicalIdUsed; // Maps medicalId to boolean
    mapping(address => AuthorizedDHDetails) public AuthorizedDH; // Maps address of authorized Doctor or hospital with their details
    mapping(address => bool) public AuthorisedHospital;
    mapping(address => bool) public AuthorisedDoctor;

    event AuthorizationResult(
        address applicantAddress,
        string medicalId,
        bool status
    );

    event DoctorAuthorized(
        string name,
        address _authAddress,
        string medicalId,
        uint AuthOnDate
    );

    event HospitalAuthorized(
        string name,
        address _authAddress,
        string medicalId,
        uint AuthOnDate
    );

    function getValue() view public returns (string memory) {
        return _value;
    }

    function setValue(string memory value) public {
        emit ValueChanged(msg.sender, _value, value);
        _value = value;
    }

    function testFunction() public pure returns (string memory myString) {
        return "Hello! The Contract is connected with web3";
    }

    event Received(address, uint);
    receive() external payable {
        emit Received(msg.sender, msg.value);
    }

    function getPatientReports(address _address)
        public
        view
        returns (string[] memory)
    {
        return PatientReports[_address];
    }

    function getDetailedReports(string memory _fileHash)
        public
        view
        returns (Report memory)
    {
        return Reports[_fileHash];
    }

    function findDoctors() public view returns (address[] memory) {
        return Doctors;
    }

    function findHospitals() public view returns (address[] memory) {
        return Hospitals;
    }

    function getAuthorizedDHDetails(address _address) public view returns (AuthorizedDHDetails memory) {
        return AuthorizedDH[_address];
    }

    /* function ApplyForVerification(
        string memory _name,
        address _applicantAddress,
        string memory _medicalId,
        uint256 _applicantType
    ) public returns (bytes32 requestId) {
        require(_applicantType == 1 || _applicantType == 0,"Apply id should be either 0 or 1");
        require(!medicalIdUsed[_medicalId], "Medical ID is already used"); // Stopping function spamming

        //ChainLink Code for Verification

        Chainlink.Request memory request = buildChainlinkRequest(jobId, address(this), this.fulfill.selector);
        request.add("get", "https://mocki.io/v1/9471e151-4903-43bb-8bf9-45e98994672b");

        //Set the path {"data":{"id":100}}

        request.add("path", "data,id");

        requestId = sendChainlinkRequestTo(oracle, request, fee);
        Applicants[requestId] = Applicant(
            _name,
            _applicantAddress,
            _medicalId,
            _applicantType
        );

        return requestId;
    }

    function fulfill(bytes32 _requestId, uint256 _verification)
        public
        recordChainlinkFulfillment(_requestId)
    {
        Applicant memory applicant = Applicants[_requestId];
        if (_verification == 100) {
            if (applicant.applicantType == 0) {
                addAuthorizedDoctor(
                    applicant.applicantAddress,
                    applicant.name,
                    applicant.medicalId
                );
            } else {
                addAuthorizedHospital(
                    applicant.applicantAddress,
                    applicant.name,
                    applicant.medicalId
                );
            }
            emit AuthorizationResult(applicant.applicantAddress, applicant.medicalId, true);
        } else {
            emit AuthorizationResult(applicant.applicantAddress, applicant.medicalId, false);
        }
        medicalIdUsed[applicant.medicalId] = true;
    } */

    function ApplyForVerification(
        string memory _name,
        address _applicantAddress,
        string memory _medicalId,
        uint256 _applicantType
    ) public {
        //require(_applicantType == 1 || _applicantType == 0,"Apply id should be either 0 or 1");
        //require(!medicalIdUsed[_medicalId], "Medical ID is already used"); // Stopping function spamming
        Applicants[requestId] = Applicant(
            _name,
            _applicantAddress,
            _medicalId,
            _applicantType
        );

        Applicant memory applicant = Applicants[requestId];

        if (applicant.applicantType == 0) {
                addAuthorizedDoctor(
                    applicant.applicantAddress,
                    applicant.name,
                    applicant.medicalId
                );
            } else if (applicant.applicantType == 1)  {
                addAuthorizedHospital(
                    applicant.applicantAddress,
                    applicant.name,
                    applicant.medicalId
                );
            }
        requestId = requestId + 1;
        emit AuthorizationResult(applicant.applicantAddress, applicant.medicalId, true);
        medicalIdUsed[applicant.medicalId] = true;

    }

    function addAuthorizedDoctor(
        address _authAddress,
        string memory _name,
        string memory _medicalId
    ) private {
        require(!AuthorisedDoctor[_authAddress], "Already registered!");
        Doctors.push(_authAddress);
        AuthorisedDoctor[_authAddress] = true;

        AuthorizedDHDetails memory _authorizedDHDetail;

        _authorizedDHDetail.authorizedDHAddress = _authAddress;
        _authorizedDHDetail.name = _name;
        _authorizedDHDetail.medicalId = _medicalId;

        AuthorizedDH[_authAddress] = _authorizedDHDetail;

        emit DoctorAuthorized(_name, _authAddress, _medicalId, block.timestamp);
    }

    function addAuthorizedHospital(
        address _authAddress,
        string memory _name,
        string memory _medicalId
    ) private {
        require(!AuthorisedHospital[_authAddress], "Already registered!");
        Hospitals.push(_authAddress);
        AuthorisedHospital[_authAddress] = true;

        AuthorizedDHDetails memory _authorizedDHDetail;

        _authorizedDHDetail.authorizedDHAddress = _authAddress;
        _authorizedDHDetail.name = _name;
        _authorizedDHDetail.medicalId = _medicalId;

        AuthorizedDH[_authAddress] = _authorizedDHDetail;

        emit HospitalAuthorized(_name, _authAddress, _medicalId, block.timestamp);
    }

    function uploadReport(
        string memory _fileHash,
        string memory _category,
        uint256 _age,
        uint256 _weight,
        uint256 _height,
        string memory _gender,
        string memory _bloodGroup
    ) public {
        PatientInfo memory _patientInfo;
        Report memory _report;

        _patientInfo.patient = msg.sender;
        _patientInfo.age = _age;
        _patientInfo.bloodGroup = _bloodGroup;
        _patientInfo.gender = _gender;
        _patientInfo.weight = _weight;
        _patientInfo.height = _height;

        _report.fileHash = _fileHash;
        _report.Patient = msg.sender;
        _report.category = _category;
        _report.patientInfo = _patientInfo;

        Reports[_fileHash] = _report;
        PatientReports[msg.sender].push(_fileHash);
    }

}
