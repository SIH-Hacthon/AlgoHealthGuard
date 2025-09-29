# HealthGuard NE - Smart Health Monitoring System

A comprehensive health monitoring and disease surveillance system built with React, TypeScript, and Tailwind CSS. This application provides real-time monitoring of disease outbreaks, water quality, and health analytics for the Northeast region.

## 🚀 Features

### 📊 Dashboard
- Real-time health statistics and metrics
- Interactive disease heat map
- Live alerts and notifications
- Quick action buttons for emergency response

### 📋 Case Reports
- Comprehensive case management system
- Advanced filtering and search capabilities
- Real-time status updates
- Export functionality for reports

### 💧 Water Quality Monitoring
- IoT sensor integration for water quality data
- Real-time monitoring of pH, turbidity, chlorine, and bacteria levels
- Status-based alerts and notifications
- Water source management

### 🤖 AI Predictions
- Machine learning-powered outbreak predictions
- Risk assessment and early warning system
- Model performance monitoring
- Confidence indicators for predictions

### 🚨 Alerts & Communication
- Multi-channel alert system (SMS, Push, WhatsApp, Radio)
- Field team management
- Emergency response coordination
- Multi-language support

### 📈 Analytics
- Educational campaign management
- System performance monitoring
- Usage analytics and reporting
- Resource library management

## 🛠️ Technology Stack

- **Frontend**: React 18 with TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Build Tool**: Vite
- **Linting**: ESLint with TypeScript support

## 🏃‍♂️ Getting Started

### Prerequisites
- Node.js (version 16 or higher)
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/healthguard-ne.git
cd healthguard-ne
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

### Building for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## 📁 Project Structure

```
src/
├── components/          # React components
│   ├── Dashboard.tsx    # Main dashboard
│   ├── CaseReports.tsx  # Case management
│   ├── WaterQuality.tsx # Water monitoring
│   ├── Predictions.tsx  # AI predictions
│   ├── Alerts.tsx       # Alert management
│   ├── Analytics.tsx    # Analytics dashboard
│   ├── HeatMap.tsx      # Interactive heat map
│   ├── LiveAlerts.tsx   # Real-time alerts
│   ├── QuickActions.tsx # Emergency actions
│   └── StatCard.tsx     # Statistics display
├── hooks/               # Custom React hooks
│   └── useRealTimeData.ts # Real-time data management
├── App.tsx             # Main application component
├── main.tsx            # Application entry point
└── index.css           # Global styles
```

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🌟 Key Features Explained

### Real-Time Data Management
The application uses a custom hook (`useRealTimeData`) that simulates real-time updates for:
- Disease case reports
- Water quality measurements
- System alerts
- Health statistics

### Interactive Components
- **Heat Map**: Visual representation of disease hotspots with interactive markers
- **Case Reports**: Sortable, filterable table with inline editing
- **Water Quality**: Real-time IoT data with status indicators
- **Predictions**: AI-powered forecasting with confidence metrics

### Responsive Design
Built with mobile-first approach using Tailwind CSS, ensuring optimal viewing across all devices.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built for healthcare professionals and public health officials
- Designed with accessibility and usability in mind
- Optimized for real-world deployment scenarios

## 📞 Support

For support and questions, please open an issue in the GitHub repository or contact the development team.

---

**HealthGuard NE** - Protecting communities through smart health monitoring and early disease detection.