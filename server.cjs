const express = require('express');
const multer = require('multer');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3001;

// Enable CORS
app.use(cors());
app.use(express.json());

// Create audio directory if it doesn't exist
const audioDir = path.join(__dirname, 'public', 'audio');
if (!fs.existsSync(audioDir)) {
  fs.mkdirSync(audioDir, { recursive: true });
}

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, audioDir);
  },
  filename: (req, file, cb) => {
    // Generate unique filename
    const timestamp = Date.now();
    const originalName = file.originalname.replace(/[^a-zA-Z0-9.-]/g, '_');
    const filename = `${timestamp}-${originalName}`;
    cb(null, filename);
  },
});

const upload = multer({
  storage,
  limits: {
    fileSize: 50 * 1024 * 1024, // 50MB max file size
  },
  fileFilter: (req, file, cb) => {
    // Accept only audio files
    const allowedTypes = ['audio/mpeg', 'audio/wav', 'audio/ogg', 'audio/mp4', 'audio/x-m4a'];
    if (allowedTypes.includes(file.mimetype) || file.originalname.match(/\.(mp3|wav|ogg|m4a)$/i)) {
      cb(null, true);
    } else {
      cb(new Error('Only audio files are allowed (MP3, WAV, OGG, M4A)'));
    }
  },
});

// API endpoint for audio upload
app.post('/api/upload-audio', upload.single('audio'), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    res.json({
      success: true,
      filename: req.file.filename,
      originalName: req.file.originalname,
      size: req.file.size,
    });
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ error: 'Upload failed' });
  }
});

// Get list of uploaded files
app.get('/api/audio-files', (req, res) => {
  try {
    const files = fs.readdirSync(audioDir);
    res.json({ files });
  } catch (error) {
    console.error('Error reading audio directory:', error);
    res.status(500).json({ error: 'Failed to read audio files' });
  }
});

// Delete audio file
app.delete('/api/audio-files/:filename', (req, res) => {
  try {
    const filename = req.params.filename;
    const filePath = path.join(audioDir, filename);
    
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
      res.json({ success: true });
    } else {
      res.status(404).json({ error: 'File not found' });
    }
  } catch (error) {
    console.error('Delete error:', error);
    res.status(500).json({ error: 'Failed to delete file' });
  }
});

// Serve static files from the dist directory
app.use(express.static(path.join(__dirname, 'dist')));

// Serve audio files
app.use('/audio', express.static(audioDir));

// Handle all other routes by serving index.html (for SPA)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

// Error handling middleware
app.use((error, req, res, next) => {
  console.error('Server error:', error);
  res.status(500).json({ error: error.message || 'Internal server error' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Audio files will be saved to: ${audioDir}`);
});
