import VoiceMessage from "../models/VoiceMessage.js";

export const sendVoice = async (req, res) => {
  try {
    const { to } = req.body;

    const voice = await VoiceMessage.create({
      from: req.user.id,
      to,
      role: req.user.role,
      audioUrl: `/uploads/voice/${req.file.filename}`,
    });

    req.io.to(to).emit("new-voice", voice); // 🔥 realtime

    res.status(201).json(voice);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getConversation = async (req, res) => {
  const { userId } = req.params;

  const messages = await VoiceMessage.find({
    $or: [
      { from: req.user.id, to: userId },
      { from: userId, to: req.user.id },
    ],
  }).sort({ createdAt: 1 });

  res.json(messages);
};