import { Server } from "socket.io"; // Socket.IO Server'ı içe aktarıyor.
import http from "http"; // HTTP modülünü içe aktarıyor.
import express from "express"; // Express çerçevesini içe aktarıyor.
import dotenv from "dotenv";
// Express uygulaması oluşturuluyor.
const app = express();
dotenv.config();

// Socket.IO için yeni bir HTTP sunucusu oluşturuluyor.
const server = http.createServer(app);

// Socket.IO sunucusu başlatılıyor ve CORS ayarları yapılandırılıyor.
const io = new Server(server, {
  cors: {
    origin: process.env.FRONTEND_URL, // İzin verilen frontend URL'si
    methods: ["GET", "POST"], // İzin verilen HTTP yöntemleri
    credentials: true, // Kimlik bilgilerine izin veriliyor
  },
});

//real time message

export const getReceiverSocketId = (receiverId) => {
  return users[receiverId];
};

const users = {}; // Online kullanıcıların saklandığı bir nesne.

// Socket.IO bağlantı olayı dinleniyor.
io.on("connection", (socket) => {
  // Kullanıcı ID'si socket bağlantısındaki query'den alınıyor.
  const userId = socket.handshake.query.userId;

  // Eğer userId mevcutsa, bu kullanıcı ID'sini socket ID'si ile ilişkilendiriyor.
  if (userId) {
    users[userId] = socket.id;
  }

  // Tüm online kullanıcıların listesi, bağlı olan istemcilere gönderiliyor.
  io.emit("getOnlineUsers", Object.keys(users));

  // İstemci bağlantısı kesildiğinde olay dinleniyor.
  socket.on("disconnect", () => {
    // Kesilen bağlantının kullanıcı ID'sini users nesnesinden kaldırıyor.
    delete users[userId];

    // Güncellenmiş online kullanıcı listesini tüm bağlı istemcilere gönderiyor.
    io.emit("getonline", Object.keys(users));
  });
});

// Uygulama, Socket.IO ve HTTP sunucusu dışa aktarılıyor.
export { app, io, server };
