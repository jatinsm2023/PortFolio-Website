import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";

export async function registerRoutes(app: Express): Promise<Server> {
  // put application routes here
  // prefix all routes with /api

  // use storage to perform CRUD operations on the storage interface
  // e.g. storage.insertUser(user) or storage.getUserByUsername(username)

  // Spotify Route
  app.get("/api/spotify/now-playing", async (req, res) => {
    try {
      const { getNowPlaying } = await import("./spotify");
      const data = await getNowPlaying();
      res.json(data || { isPlaying: false });
    } catch (error) {
      console.error("Spotify API Error:", error);
      res.status(500).json({ isPlaying: false });
    }
  });

  // Contact Route
  app.post("/api/contact", async (req, res) => {
    try {
      const multer = await import("multer");
      const upload = multer.default({ storage: multer.memoryStorage() }).array('attachments');

      upload(req, res, async (err) => {
        if (err) {
          console.error("Multer Error:", err);
          return res.status(500).json({ message: "File upload failed" });
        }

        const { to, from, subject, body } = req.body;
        const files = req.files as Express.Multer.File[];
        console.log(req.body);
        // Basic validation
        if (!to || !from || !subject || !body) {
          return res.status(400).json({ message: "Missing required fields" });
        }

        const nodemailer = await import("nodemailer");

        // Create transporter (using environment variables)
        const transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
          }
        });

        await transporter.sendMail({
          from: from,
          to: to,
          subject: `Portfolio Contact: ${subject}`,
          text: `From: ${from}\n\n${body}`,
          html: `<p><strong>From:</strong> ${from}</p><div>${body}</div>`, // Body is now HTML
          attachments: files?.map(file => ({
            filename: file.originalname,
            content: file.buffer
          }))
        });

        res.json({ message: "Email sent successfully" });
      });
    } catch (error) {
      console.error("Email Error:", error);
      res.status(500).json({ message: "Failed to send email" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}


