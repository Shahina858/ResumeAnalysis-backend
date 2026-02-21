// server/socket.js
import { Server } from "socket.io";

export const initSocket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: "https://magical-melba-48b87a.netlify.app",
      methods: ["GET", "POST"],
      credentials: true,
    },
  });

  io.on("connection", (socket) => {
    console.log("🔌 Socket connected:", socket.id);

    socket.on("join", ({ userId, role }) => {
      socket.userId = userId;
      socket.role = role;

      if (role === "admin") {
        socket.join("admins");
        console.log("👑 Admin joined admin room");
      } else {
        socket.join(userId);
        console.log("👤 User joined:", userId);
      }
    });

    // ✅ USER → ADMIN
    socket.on("voice-message", ({ fromUserId, audio }) => {
      console.log("🎤 Voice received from user:", fromUserId);
      io.to("admins").emit("voice-message", {
        fromUserId,
        audio,
        timestamp: Date.now(),
      });
    });

    // ✅ ADMIN → USER
    socket.on("admin-voice-reply", ({ toUserId, audio }) => {
      console.log("🎧 Admin replied to:", toUserId);
      io.to(toUserId).emit("admin-voice-reply", {
        audio,
        timestamp: Date.now(),
      });
    });

    socket.on("disconnect", () => {
      console.log("❌ Socket disconnected:", socket.id);
    });
  });

  return io;
};