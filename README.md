# CasaQuant 🏠

**An intelligent web platform for estimating real estate prices across Tunisia**

CasaQuant helps you get accurate property price estimates instantly using advanced machine learning. Whether you're buying, selling, or simply curious about property values in Tunisia, our tool provides data-driven insights powered by a 600-tree Random Forest model.

![Made with React](https://img.shields.io/badge/React-19.1.0-61dafb?style=flat-square&logo=react)
![Machine Learning](https://img.shields.io/badge/ML-Random%20Forest-green?style=flat-square)
![No Backend Required](https://img.shields.io/badge/Backend-None-orange?style=flat-square)

## ✨ What Makes CasaQuant Special

### ⚡ Lightning-Fast Predictions
Get instant property estimates without waiting for server responses. Our machine learning model runs entirely in your browser, delivering predictions in under 60 milliseconds.

### 🎯 Accurate Estimates
Built on a robust Random Forest model trained on Tunisian real estate data, analyzing 7 key factors:
- Property type (Apartment, Villa, House, Studio, Land)
- Transaction type (Sale or Rent)
- Location (24 governorates, 2000+ regions)
- Size (in square meters)
- Number of rooms and bathrooms

### 🎨 Beautiful User Experience
- Smooth, interactive animations powered by Framer Motion
- Multi-step form that guides you through the process
- Responsive design that works on any device
- Modern UI with dynamic background effects

### 🔒 Privacy-First
All predictions happen locally in your browser. Your property details never leave your device, ensuring complete privacy.

## 🚀 Try It Out

**Live Demo**: [Coming Soon]

Or run it locally:

```bash
# Clone the repository
git clone https://github.com/yourusername/CasaQuant.git

# Navigate to frontend
cd CasaQuant/frontend

# Install dependencies
npm install

# Start the development server
npm start
```

Visit `http://localhost:3000` to start estimating property prices!

## 📱 How to Use

1. **Select Property Type** - Choose whether you're estimating for sale or rent
2. **Choose Category** - Pick from Apartment, Villa, House, Studio, or Land
3. **Set Location** - Select the governorate and specific region
4. **Enter Details** - Specify number of rooms, bathrooms, and total size
5. **Get Your Estimate** - Receive an instant, AI-powered price prediction

## 🛠️ Technical Highlights

### Client-Side Machine Learning
Unlike traditional web apps that rely on backend servers, CasaQuant brings the ML model directly to your browser:
- **No API calls** = Zero latency, Zero server costs
- **600 decision trees** running in pure JavaScript
- **24.76 MB model** loads once, predicts forever

### Modern React Architecture
- React 19.1.0 with functional components and hooks
- Framer Motion for buttery-smooth animations
- Custom UI components (ResizableNavbar, BentoGrid, GlowingOrb)
- Optimized for performance (CLS < 0.1, INP < 200ms)

### Built for Tunisia
- Coverage of all 24 governorates
- Over 2000 regions supported
- Trained on local market data
- Prices in Tunisian Dinars (TND)

## 📊 Model Performance

- **Prediction Speed**: 40-60ms per estimate
- **Accuracy**: Trained on comprehensive Tunisia real estate dataset
- **Model Type**: Random Forest Regressor (ensemble of 600 trees)
- **Key Features**: Type has 92% importance, followed by size (4%) and category (1%)

## 🤝 Contributing

Found a bug or have a feature suggestion? We'd love to hear from you!

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is private and all rights are reserved.

## 🙏 Acknowledgments

- Built with ❤️ for the Tunisian real estate market
- Powered by React, Framer Motion, and scikit-learn
- Special thanks to the open-source community

---

**Made in Tunisia 🇹🇳 | © 2026 CasaQuant**
