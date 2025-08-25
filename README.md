# 🚀 PasteShare - Auto-Expiring Image Links

Ứng dụng chia sẻ ảnh với link tự động hết hạn sau 5 phút và xóa ảnh khỏi server.

## ✨ Tính Năng

- 📸 **Paste & Share**: Chụp màn hình → Ctrl+V → Nhận link ngay
- ⏰ **Auto-Expiry**: Link tự động hết hạn sau 5 phút  
- 🗑️ **Auto-Delete**: Ảnh tự động xóa khỏi Cloudinary server
- 📱 **Responsive**: Hoạt động tốt trên mọi thiết bị
- 🔒 **Secure**: Sử dụng serverless backend an toàn

## 🛠️ Tech Stack

- **Frontend**: Vanilla JavaScript, HTML5, CSS3
- **Backend**: Node.js Serverless Functions (Vercel)
- **Storage**: Cloudinary API
- **Hosting**: Vercel (free tier)

## 🚀 Deploy Lên GitHub + Vercel

### Bước 1: Setup Cloudinary

1. Đăng ký tài khoản [Cloudinary](https://cloudinary.com) (miễn phí)
2. Vào **Settings** → **Upload** → **Add upload preset**
3. Tạo preset **Unsigned** với tên bất kỳ (ví dụ: `Picture`)
4. Lưu lại:
   - `Cloud Name` 
   - `API Key`
   - `API Secret` (từ Settings → Security)

### Bước 2: Tạo GitHub Repository

```bash
# Clone hoặc tạo repo mới
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/YOURUSERNAME/pasteshare.git
git push -u origin main
```

### Bước 3: Deploy với Vercel

1. Truy cập [vercel.com](https://vercel.com) và đăng nhập bằng GitHub
2. Click **"New Project"** → Chọn repository `pasteshare`
3. **Environment Variables** → Thêm:
   ```
   CLOUDINARY_CLOUD_NAME = your_cloud_name
   CLOUDINARY_API_KEY = your_api_key  
   CLOUDINARY_API_SECRET = your_api_secret
   ```
4. Click **"Deploy"**

### Bước 4: Cập Nhật Config

Sau khi deploy, cập nhật file `index.html`:

```javascript
// Thay thế với cloud name thực của bạn
const CLOUD_NAME = "your_actual_cloud_name";
const UPLOAD_PRESET = "your_actual_preset_name";
```

## 🔧 Development Local

```bash
# Cài đặt dependencies
npm install

# Chạy local development server
npm run dev
```

**Environment Variables Local**: Tạo file `.env.local`:
```
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

## 📁 Cấu Trúc Project

```
pasteshare/
├── api/
│   └── delete-image.js     # Serverless function xóa ảnh
├── index.html              # Frontend app
├── package.json            # Dependencies
├── vercel.json            # Vercel configuration
├── environment.example     # Environment variables example
└── README.md              # Documentation
```

## 🔐 Bảo Mật

- ✅ **API Secret** chỉ được lưu trên server (Vercel Environment Variables)
- ✅ **CORS** được configure để cho phép requests từ frontend
- ✅ **Input validation** cho tất cả API endpoints
- ✅ **Rate limiting** tự động bởi Vercel
- ✅ **Error handling** không expose sensitive information

## 🌐 API Endpoints

### `POST /api/delete-image`

Xóa ảnh khỏi Cloudinary server.

**Request Body:**
```json
{
  "public_id": "image_id",
  "folder": "pastes"
}
```

**Response (Success):**
```json
{
  "success": true,
  "message": "Image deleted successfully",
  "public_id": "pastes/image_id"
}
```

## ⚠️ Giới Hạn

- **Vercel Free Tier**: 100GB bandwidth/tháng
- **Cloudinary Free Tier**: 25GB storage, 25GB bandwidth/tháng
- **File Size**: Tối đa 10MB per image (có thể config)
- **Request Rate**: 100 requests/phút per IP

## 🐛 Troubleshooting

### Lỗi "Method not allowed"
- Đảm bảo sử dụng POST request cho `/api/delete-image`

### Lỗi "Missing public_id"  
- Kiểm tra request body có chứa `public_id`

### Ảnh không bị xóa
- Verify environment variables trên Vercel
- Check Console logs trong browser DevTools
- Kiểm tra folder name và public_id format

### CORS Errors
- Vercel tự động handle CORS, nhưng có thể cần redeploy

## 📞 Support

- 📧 **Issues**: Tạo issue trên GitHub repository
- 📖 **Documentation**: [Vercel Docs](https://vercel.com/docs)
- 🌐 **Cloudinary Docs**: [Cloudinary API](https://cloudinary.com/documentation)

## 📄 License

MIT License - Sử dụng tự do cho mục đích cá nhân và thương mại.
