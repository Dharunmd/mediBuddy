import { configDotenv } from "dotenv";
import authRoute from "./routes/auth.routes.js";
import medicalRoute from "./routes/medical.routes.js";

import connectToMongoDB from "./db/connectToMongodb.js";
import MongoStore from "connect-mongo";
import session from "express-session";
import cookieParser from "cookie-parser";
import express from "express";
import cors from "cors"; // Import cors
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import { Client } from 'whatsapp-web.js';
import qrcode from "qrcode-terminal";
import { MongoMemoryServer } from 'mongodb-memory-server';

const clientWhatsapp = new Client();

clientWhatsapp.on("qr", (qr) => {
  qrcode.generate(qr, { small: true });
  console.log("Scan the QR code above to log in to WhatsApp Web.");
});

clientWhatsapp.on("ready", () => {
  console.log("Client is ready!");
});

clientWhatsapp.initialize();

configDotenv();

const startServer = async () => {
  const mongod = await MongoMemoryServer.create();
  const mongoUri = mongod.getUri();
  console.log("In-memory MongoDB started at", mongoUri);

  const app = express();

  app.use(cors({ origin: '*' }))

  app.use(express.json());
  app.use(cookieParser());

  app.use(
    session({
      name: "AuthCookie",
      secret: "secret", // Replaced process.env.COOKIE_SECRET
      resave: false,
      saveUninitialized: false,
      store: MongoStore.create({
        mongoUrl: mongoUri, // dynamically generated from memory server
        collectionName: "sessions",
      }),
      cookie: {
        httpOnly: true,
        secure: false, // Replaced process.env.NODE_ENV === "PRODUCTION" ? true : false
        maxAge: 15 * 24 * 60 * 60 * 1000, // 15 day
      },
    })
  );

app.use("/api/auth", authRoute);
app.use("/api/medical", medicalRoute);  // Add the medical routes
// app.use("/api/profile", profileRoute);

// Add default route to check if server is running
app.get("/", (req, res) => {
  res.status(200).json({ 
    message: "Server is running successfully", 
    environment: process.env.NODE_ENV || "development",
    timestamp: new Date().toISOString()
  });
});

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
app.use("/api/uploads", express.static(path.join(__dirname, "../uploads")));

  app.listen(4000, () => { // Replaced process.env.PORT
    connectToMongoDB(mongoUri);
    console.log(`Server running on http://localhost:4000`);
  });
};

startServer();