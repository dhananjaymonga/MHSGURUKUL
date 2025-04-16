const express = require('express');
const cors = require('cors');
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const UploadedData = require('./models/users'); // Import the model
require('dotenv').config();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Admin = require('./models/Admin');
const mongoose = require('mongoose');
const adminRoutes = require('./routes/admin');
const Blog = require("./models/blog"); // ✅ Use consistent naming

// const bcrypt = require('bcryptjs');

const mongoURI = "mongodb://localhost:27017/mydatabase"; 
const JWT_SECRET = 'dhananjay'; // Replace with .env in production

// Connect to MongoDB
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('MongoDB connected successfully');
}).catch(err => {
  console.log('MongoDB connection error:', err);
});

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());  // Only express.json() is required for JSON requests
// app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Cloudinary config
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const pdfStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'pdfs',
    resource_type: 'raw',
    format: async () => 'pdf',
    public_id: (req, file) => `${Date.now()}_${file.originalname}`,
  },
});
const imageStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'blogs',
    resource_type: 'image',
    public_id: (req, file) => `${Date.now()}_${file.originalname}`,
  },
});
const uploadPdf = multer({ storage: pdfStorage });
const uploadImage = multer({ storage: imageStorage });

app.get('/test', (req, res) => {
  console.log("hii");
  res.send('Admin route is working!');
});
// app.use('/admin', adminRoutes);
// Admin Login Route
app.post('/admin/login', async (req, res) => {
  const { email, password } = req.body;
  console.log('Login request:', req.body);

  try {
    const admin = await Admin.findOne({ email });
    if (!admin) {
      console.log('Admin not found for email:', email);
      return res.status(400).json({ success: false, message: 'Invalid email or password' });
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      console.log('Password mismatch for email:', email);
      return res.status(400).json({ success: false, message: 'Invalid email or password' });
    }

    const token = jwt.sign({ id: admin._id }, JWT_SECRET, { expiresIn: '7d' });

    res.json({ success: true, token });
  } catch (err) {
    console.error('Admin login error:', err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

console.log(adminRoutes);
// POST route for form submission
app.post('/upload', uploadPdf.single('file'), async (req, res) => {
  console.log('Received Body:', JSON.stringify(req.body, null, 2));
console.log('Received File:', JSON.stringify(req.file, null, 2));

const { class: className, subject, title } = req.body;
const fileUrl = req.file ? req.file.path : '';  // Make sure fileUrl is only used if file is present

// Log any issues with missing or undefined fields
if (!className || !subject || !title || !fileUrl) {
  console.log('Missing fields in form data');
  return res.status(400).json({ message: 'Missing required fields' });
}

const newEntry = new UploadedData({
  class: className,
  subject,
  title,
  pdfUrl: fileUrl,
});

try {
  // Save data to MongoDB
  await newEntry.save();
  res.json({
    message: 'File uploaded successfully!',
    data: newEntry,
  });
} catch (err) {
  console.error('Error saving to MongoDB:', err);
  res.status(500).json({ message: 'Error saving data to database' });
}
});
app.get('/uploads', async (req, res) => {
try {
  const uploads = await UploadedData.find(); // Fetch all data from MongoDB
  res.json(uploads);
} catch (err) {
  console.error('Error fetching uploads:', err);
  res.status(500).json({ message: 'Error fetching data from database' });
}
});
app.put('/uploads/:id', async (req, res) => {
try {
  const updated = await UploadedData.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  if (!updated) return res.status(404).json({ message: 'Upload not found' });
  res.json(updated);
} catch (err) {
  res.status(400).json({ error: err.message });
}
});
app.delete('/uploads/:id', async (req, res) => {
try {
  const deleted = await UploadedData.findByIdAndDelete(req.params.id);
  if (!deleted) return res.status(404).json({ message: 'Upload not found' });
  res.json({ message: 'Upload deleted successfully' });
} catch (err) {
  res.status(500).json({ error: err.message });
}
});

// blh
app.post('/blogs', uploadImage.single('image'), async (req, res) => {
const { title, content } = req.body;
const imageUrl = req.file ? req.file.path : '';

if (!title || !content) {
  return res.status(400).json({ message: 'Title and content are required' });
}

const newBlog = new Blog({ title, content, imageUrl });

try {
  await newBlog.save();
  res.json({ message: 'Blog created successfully', blog: newBlog });
} catch (err) {
  res.status(500).json({ message: 'Failed to save blog', error: err.message });
}
});
app.get('/blogs', async (req, res) => {
try {
  const blogs = await Blog.find().sort({ createdAt: -1 });
  res.json(blogs);
} catch (err) {
  res.status(500).json({ message: 'Failed to fetch blogs' });
}
});
// backend route
app.get('/blogs/:id', async (req, res) => {
try {
  const blog = await Blog.findById(req.params.id);
  res.json(blog);
} catch (err) {
  res.status(404).json({ error: 'Blog not found' });
}
});

app.put('/blogs/:id', uploadImage.single('image'), async (req, res) => {
const { title, content } = req.body;
const updateData = { title, content };

if (req.file) updateData.imageUrl = req.file.path;

try {
  const updated = await Blog.findByIdAndUpdate(req.params.id, updateData, { new: true });
  if (!updated) return res.status(404).json({ message: 'Blog not found' });
  res.json(updated);
} catch (err) {
  res.status(500).json({ message: 'Failed to update blog', error: err.message });
}
});
app.put('/blogs/:id', uploadImage.single('image'), async (req, res) => {
const { title, content } = req.body;
const updateData = { title, content };

if (req.file) updateData.imageUrl = req.file.path;

try {
  const updated = await Blog.findByIdAndUpdate(req.params.id, updateData, { new: true });
  if (!updated) return res.status(404).json({ message: 'Blog not found' });
  res.json(updated);
} catch (err) {
  res.status(500).json({ message: 'Failed to update blog', error: err.message });
}
});
app.delete('/blogs/:id', async (req, res) => {
try {
  const deleted = await Blog.findByIdAndDelete(req.params.id);
  if (!deleted) return res.status(404).json({ message: 'Blog not found' });
  res.json({ message: 'Blog deleted successfully' });
} catch (err) {
  res.status(500).json({ message: 'Failed to delete blog' });
}
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server is running at http://localhost:${PORT}`);
});