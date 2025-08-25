// Vercel Serverless Function to delete images from Cloudinary
const { v2: cloudinary } = require('cloudinary');

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// CORS helper
function cors(res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
}

module.exports = async (req, res) => {
  // Handle CORS preflight
  cors(res);
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ 
      error: 'Method not allowed',
      message: 'Only POST requests are supported' 
    });
  }

  try {
    console.log('🔍 Request received:', req.method, req.url);
    console.log('📋 Request body:', req.body);
    
    // Check Cloudinary config
    const hasConfig = !!(process.env.CLOUDINARY_CLOUD_NAME && process.env.CLOUDINARY_API_KEY && process.env.CLOUDINARY_API_SECRET);
    console.log('🔑 Cloudinary config available:', hasConfig);
    console.log('☁️  Cloud Name:', process.env.CLOUDINARY_CLOUD_NAME);
    console.log('🔑 API Key:', process.env.CLOUDINARY_API_KEY ? 'SET' : 'MISSING');
    console.log('🔐 API Secret:', process.env.CLOUDINARY_API_SECRET ? 'SET' : 'MISSING');
    
    if (!hasConfig) {
      return res.status(500).json({
        success: false,
        error: 'Missing Cloudinary configuration',
        message: 'CLOUDINARY environment variables are not set'
      });
    }

    const { public_id, folder } = req.body;

    // Validate input
    if (!public_id) {
      return res.status(400).json({ 
        error: 'Missing public_id',
        message: 'public_id is required to delete image' 
      });
    }

    // Build full public_id with folder if needed
    const fullPublicId = folder ? `${folder}/${public_id}` : public_id;

    console.log(`🗑️  Attempting to delete image: ${fullPublicId}`);
    console.log('📁 Folder:', folder);
    console.log('🆔 Public ID:', public_id);

    // Delete image from Cloudinary
    const result = await cloudinary.uploader.destroy(fullPublicId);

    console.log('✅ Deletion result:', JSON.stringify(result, null, 2));

    if (result.result === 'ok') {
      return res.status(200).json({
        success: true,
        message: 'Image deleted successfully',
        public_id: fullPublicId,
        result: result.result
      });
    } else if (result.result === 'not found') {
      return res.status(404).json({
        success: false,
        message: 'Image not found',
        public_id: fullPublicId,
        result: result.result
      });
    } else {
      return res.status(500).json({
        success: false,
        message: 'Failed to delete image',
        public_id: fullPublicId,
        result: result.result
      });
    }

  } catch (error) {
    console.error('Error deleting image:', error);
    
    return res.status(500).json({
      success: false,
      message: 'Server error occurred while deleting image',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
};
