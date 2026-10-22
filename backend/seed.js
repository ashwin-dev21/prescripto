import mongoose from 'mongoose'
import 'dotenv/config'
import doctorModel from './models/doctorModel.js'
import appointmentModel from './models/appointmentModel.js'

const connectDB = async () => {
    try {
        const uri = process.env.MONGODB_URI.endsWith('/')
            ? `${process.env.MONGODB_URI}prescripto`
            : `${process.env.MONGODB_URI}/prescripto`

        await mongoose.connect(uri)
        console.log("Database Connected Successfully")
    } catch (error) {
        console.error("DB Connection Error:", error.message)
        process.exit(1)
    }
}
const doctorsData = [
    {
        _id: "doc1",
        name: "Dr. Richard James",
        email: "richard@prescripto.com",
        password: "hashedpassword123",
        image: "https://raw.githubusercontent.com/avinashdm/gs-prescripto/main/frontend/src/assets/doc1.png",
        speciality: "General Physician",
        degree: "MBBS",
        experience: "4 Years",
        about: "Dr. Richard James has a strong commitment to delivering comprehensive medical care.",
        fees: 50,
        address: { line1: "17th Cross, Richmond", line2: "Circle, Ring Road, London" },
        available: true,
        date: Date.now()
    },
    {
        _id: "doc2",
        name: "Dr. Emily Larson",
        email: "emily@prescripto.com",
        password: "hashedpassword123",
        image: "https://raw.githubusercontent.com/avinashdm/gs-prescripto/main/frontend/src/assets/doc2.png",
        speciality: "Gastroenterologist",
        degree: "MBBS",
        experience: "3 Years",
        about: "Dr. Emily Larson has a strong commitment to delivering comprehensive medical care.",
        fees: 60,
        address: { line1: "27th Cross, Richmond", line2: "Circle, Ring Road, London" },
        available: true,
        date: Date.now()
    },
    {
        _id: "doc3",
        name: "Dr. Sarah Patel",
        email: "sarah@prescripto.com",
        password: "hashedpassword123",
        image: "https://raw.githubusercontent.com/avinashdm/gs-prescripto/main/frontend/src/assets/doc3.png",
        speciality: "Dermatologist",
        degree: "MBBS",
        experience: "1 Years",
        about: "Dr. Sarah Patel has a strong commitment to delivering comprehensive medical care.",
        fees: 30,
        address: { line1: "37th Cross, Richmond", line2: "Circle, Ring Road, London" },
        available: true,
        date: Date.now()
    },
    {
        _id: "doc4",
        name: "Dr. Christopher Lee",
        email: "christopher@prescripto.com",
        password: "hashedpassword123",
        image: "https://raw.githubusercontent.com/avinashdm/gs-prescripto/main/frontend/src/assets/doc4.png",
        speciality: "Pediatricians",
        degree: "MBBS",
        experience: "2 Years",
        about: "Dr. Christopher Lee has a strong commitment to delivering comprehensive medical care.",
        fees: 40,
        address: { line1: "47th Cross, Richmond", line2: "Circle, Ring Road, London" },
        available: true,
        date: Date.now()
    },
    {
        _id: "doc5",
        name: "Dr. Jennifer Garcia",
        email: "jennifer@prescripto.com",
        password: "hashedpassword123",
        image: "https://raw.githubusercontent.com/avinashdm/gs-prescripto/main/frontend/src/assets/doc5.png",
        speciality: "Neurologist",
        degree: "MBBS",
        experience: "4 Years",
        about: "Dr. Jennifer Garcia has a strong commitment to delivering comprehensive medical care.",
        fees: 50,
        address: { line1: "57th Cross, Richmond", line2: "Circle, Ring Road, London" },
        available: true,
        date: Date.now()
    },
    {
        _id: "doc6",
        name: "Dr. Andrew Williams",
        email: "andrew@prescripto.com",
        password: "hashedpassword123",
        image: "https://raw.githubusercontent.com/avinashdm/gs-prescripto/main/frontend/src/assets/doc6.png",
        speciality: "Gynecologist",
        degree: "MBBS",
        experience: "4 Years",
        about: "Dr. Andrew Williams has a strong commitment to delivering comprehensive medical care.",
        fees: 50,
        address: { line1: "57th Cross, Richmond", line2: "Circle, Ring Road, London" },
        available: true,
        date: Date.now()
    },
    {
        _id: "doc7",
        name: "Dr. Christopher Davis",
        email: "davis@prescripto.com",
        password: "hashedpassword123",
        image: "https://raw.githubusercontent.com/avinashdm/gs-prescripto/main/frontend/src/assets/doc7.png",
        speciality: "General Physician",
        degree: "MBBS",
        experience: "4 Years",
        about: "Dr. Christopher Davis has a strong commitment to delivering comprehensive medical care.",
        fees: 50,
        address: { line1: "17th Cross, Richmond", line2: "Circle, Ring Road, London" },
        available: true,
        date: Date.now()
    },
    {
        _id: "doc8",
        name: "Dr. Timothy White",
        email: "timothy@prescripto.com",
        password: "hashedpassword123",
        image: "https://raw.githubusercontent.com/avinashdm/gs-prescripto/main/frontend/src/assets/doc8.png",
        speciality: "Gynecologist",
        degree: "MBBS",
        experience: "3 Years",
        about: "Dr. Timothy White has a strong commitment to delivering comprehensive medical care.",
        fees: 60,
        address: { line1: "27th Cross, Richmond", line2: "Circle, Ring Road, London" },
        available: true,
        date: Date.now()
    },
    {
        _id: "doc9",
        name: "Dr. Ava Mitchell",
        email: "ava@prescripto.com",
        password: "hashedpassword123",
        image: "https://raw.githubusercontent.com/avinashdm/gs-prescripto/main/frontend/src/assets/doc9.png",
        speciality: "Dermatologist",
        degree: "MBBS",
        experience: "1 Years",
        about: "Dr. Ava Mitchell has a strong commitment to delivering comprehensive medical care.",
        fees: 30,
        address: { line1: "37th Cross, Richmond", line2: "Circle, Ring Road, London" },
        available: true,
        date: Date.now()
    },
    {
        _id: "doc10",
        name: "Dr. Jeffrey King",
        email: "jeffrey@prescripto.com",
        password: "hashedpassword123",
        image: "https://raw.githubusercontent.com/avinashdm/gs-prescripto/main/frontend/src/assets/doc10.png",
        speciality: "Pediatricians",
        degree: "MBBS",
        experience: "2 Years",
        about: "Dr. Jeffrey King has a strong commitment to delivering comprehensive medical care.",
        fees: 40,
        address: { line1: "47th Cross, Richmond", line2: "Circle, Ring Road, London" },
        available: true,
        date: Date.now()
    },
    {
        _id: "doc11",
        name: "Dr. Zoe Kelly",
        email: "zoe@prescripto.com",
        password: "hashedpassword123",
        image: "https://raw.githubusercontent.com/avinashdm/gs-prescripto/main/frontend/src/assets/doc11.png",
        speciality: "Neurologist",
        degree: "MBBS",
        experience: "4 Years",
        about: "Dr. Zoe Kelly has a strong commitment to delivering comprehensive medical care.",
        fees: 50,
        address: { line1: "57th Cross, Richmond", line2: "Circle, Ring Road, London" },
        available: true,
        date: Date.now()
    },
    {
        _id: "doc12",
        name: "Dr. Patrick Harris",
        email: "patrick@prescripto.com",
        password: "hashedpassword123",
        image: "https://raw.githubusercontent.com/avinashdm/gs-prescripto/main/frontend/src/assets/doc12.png",
        speciality: "Gastroenterologist",
        degree: "MBBS",
        experience: "4 Years",
        about: "Dr. Patrick Harris has a strong commitment to delivering comprehensive medical care.",
        fees: 50,
        address: { line1: "57th Cross, Richmond", line2: "Circle, Ring Road, London" },
        available: true,
        date: Date.now()
    },
    {
        _id: "doc13",
        name: "Dr. Chloe Evans",
        email: "chloe@prescripto.com",
        password: "hashedpassword123",
        image: "https://raw.githubusercontent.com/avinashdm/gs-prescripto/main/frontend/src/assets/doc13.png",
        speciality: "General Physician",
        degree: "MBBS",
        experience: "2 Years",
        about: "Dr. Chloe Evans has a strong commitment to delivering comprehensive medical care.",
        fees: 50,
        address: { line1: "17th Cross, Richmond", line2: "Circle, Ring Road, London" },
        available: true,
        date: Date.now()
    },
    {
        _id: "doc14",
        name: "Dr. Ryan Martinez",
        email: "ryan@prescripto.com",
        password: "hashedpassword123",
        image: "https://raw.githubusercontent.com/avinashdm/gs-prescripto/main/frontend/src/assets/doc14.png",
        speciality: "Dermatologist",
        degree: "MBBS",
        experience: "3 Years",
        about: "Dr. Ryan Martinez has a strong commitment to delivering comprehensive medical care.",
        fees: 60,
        address: { line1: "27th Cross, Richmond", line2: "Circle, Ring Road, London" },
        available: true,
        date: Date.now()
    },
    {
        _id: "doc15",
        name: "Dr. Amelia Hill",
        email: "amelia@prescripto.com",
        password: "hashedpassword123",
        image: "https://raw.githubusercontent.com/avinashdm/gs-prescripto/main/frontend/src/assets/doc15.png",
        speciality: "Dermatologist",
        degree: "MBBS",
        experience: "1 Years",
        about: "Dr. Amelia Hill has a strong commitment to delivering comprehensive medical care.",
        fees: 30,
        address: { line1: "37th Cross, Richmond", line2: "Circle, Ring Road, London" },
        available: true,
        date: Date.now()
    }
]

const seedDB = async () => {
    await connectDB()
    try {
        await doctorModel.deleteMany({})
        await appointmentModel.deleteMany({}) // Clears stale broken appointment documents
        console.log("Cleared old doctor and appointment records...")

        await doctorModel.insertMany(doctorsData)
        console.log("Database seeded successfully with all 15 doctors!")

        process.exit()
    } catch (error) {
        console.error("Error seeding database:", error.message)
        process.exit(1)
    }
}

seedDB()