const ethers = require('ethers')
const DoctorWeb3 = require('../abis/DoctorWeb3.json')

const formatInterface = async () => {
    let iface = new ethers.utils.Interface(DoctorWeb3.abi)
    iface = iface.format(ethers.utils.FormatTypes.full)
    return iface
}

const DoctorArray = [
    {
        name: "Dr Devdeep Ghosh",
        address: "0xab351917c28764db8a86215222747d6699A6934a",
        medicalId: "5654"
    },
    {
        name: "Dr Shipra Ghoshal",
        address: "0xA2F362BE705799bD6d1F35eDb58030Bf4a2b9008",
        medicalId: "2514"
    },
    {
        name: "Dr Bishwarup Biswas",
        address: "0x82331017CD2010D2356D1a36E1078d0897fd15B9",
        medicalId: "5432"
    },
    {
        name: "Dr Samragyi Sharma",
        address: "0xc5afa525B2470C370e01f60a18D587E6B5A50088",
        medicalId: "9875"
    },
    {
        name: "Dr Abhirup Dey",
        address: "0xEb0A4a9FceCdF46FAF276782BAed549d43D14Cb7",
        medicalId: "2343"
    },
    {
        name: "Dr Sancharini Basak",
        address: "0xDa97Cc741BD892433Fd972cB3bDCf99529871dB5",
        medicalId: "5499"
    }
]

const HospitalArray = [
    {
        name: "Barala Hospital",
        address: "0xf977814e90da44bfa03b6295a0616a897441acec",
        medicalId: "7654"
    },
    {
        name: "Delhi Hospital",
        address: "0xda9dfa130df4de4673b89022ee50ff26f6ea73cf",
        medicalId: "8765"
    },
    {
        name: "NIMS Hospital",
        address: "0x28c6c06298d514db089934071355e5743bf21d60",
        medicalId: "5499"
    },
    {
        name: "Natwarlal's Clinic",
        address: "0x0716a17fbaee714f1e6ab0f9d59edbc5f09815c0",
        medicalId: "0124"
    },
    {
        name: "Dr Paul's Clinic",
        address: "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
        medicalId: "2388"
    }
]

module.exports = async function (callback) {
    // TODO: implement your actions
    try {
        const provider = new ethers.providers.JsonRpcProvider("HTTP://127.0.0.1:7545")
        const signer = provider.getSigner()
        const contractAddress = DoctorWeb3.networks[5777].address
        const doctorWeb3_abi = await formatInterface()
        const doctorWeb3 = new ethers.Contract(contractAddress, doctorWeb3_abi, signer)
        console.log(`Contract is deployed at ${doctorWeb3.address}`);

        // Add Doctors and Hospitals

        for (let i = 0; i < DoctorArray.length; i++) {
            const tx = await doctorWeb3.ApplyForVerification(DoctorArray[i].name, DoctorArray[i].address, DoctorArray[i].medicalId, 0)
            tx.wait()
            console.log(`Doctor ${DoctorArray[i].name} registered`);
        }
        for (let i = 0; i < HospitalArray.length; i++) {
            const tx = await doctorWeb3.ApplyForVerification(HospitalArray[i].name, HospitalArray[i].address, HospitalArray[i].medicalId, 1)
            tx.wait()
            console.log(`${HospitalArray[i].name} registered`)
        }


    } catch (error) {
        console.log(error);
    }
    // invoke callback
    callback();
}
