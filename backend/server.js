import express from "express"
import cors from 'cors'
import 'dotenv/config'
import connectDB from "./config/mongodb.js"
import connectCloudinary from "./config/cloudinary.js"
import userRouter from "./routes/userRoute.js"
import doctorRouter from "./routes/doctorRoute.js"
import adminRouter from "./routes/adminRoute.js"
import doctorModel from "./models/doctorModel.js"
// import { doctors } from "./assets/assets.js" 

// app config
const app = express()
const port = process.env.PORT || 4000
connectDB()
connectCloudinary()

// // 🚀 AUTO-SEED FUNCTION: Inserts mock doctors into MongoDB if collection is empty
const seedDatabase = async () => {
    try {
        const count = await doctorModel.countDocuments()
        if (count === 0 && doctors && doctors.length > 0) {
            console.log('Database is empty. Seeding mock doctors...')
            // Remove string IDs (like "doc1") so MongoDB auto-generates 24-character ObjectIds
            const formattedDoctors = doctors.map(doc => {
                const { _id, ...rest } = doc
                return rest
            })
            await doctorModel.insertMany(formattedDoctors)
            console.log('Mock doctors seeded successfully!')
        }
    } catch (error) {
        console.log('Error seeding database:', error.message)
    }
}

// Run seed check after DB connection settles
// setTimeout(seedDatabase, 3000)

// middlewares
app.use(express.json())
app.use(cors({
  origin: ['http://localhost:5173', 'https://prescripto-omega-puce.vercel.app', 'https://prescripto-pjwd.onrender.com'],
  credentials: true
}))

// api endpoints
app.use("/api/user", userRouter)
app.use("/api/admin", adminRouter)
app.use("/api/doctor", doctorRouter)

app.get("/", (req, res) => {
  res.send("API Working")
});

if (!process.env.VERCEL && !process.env.NETLIFY) {
  app.listen(port, () => console.log(`Server started on PORT:${port}`))
}

export default app