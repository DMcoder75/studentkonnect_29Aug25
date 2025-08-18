# StudentKonnect - Global Education Platform

A comprehensive platform connecting students with educational counselors worldwide, facilitating university applications and career guidance.

## 🌟 Live Demo

**Production URL:** https://studentkonnect-working.surge.sh

- **Main Website:** Complete university finder and pathway builder
- **Admin Portal:** https://studentkonnect-working.surge.sh/admin
- **Admin Credentials:** admin@yourunipathway.com / admin123

## 🚀 Features

### Main Website
- **University Finder:** Search through 866+ universities across 8+ countries
- **Course Discovery:** Browse 1000+ courses and programs
- **Counselor Matching:** Connect with experienced education counselors
- **Career Pathways:** Explore Medicine, Engineering, Business, and Law pathways
- **Scholarship Assistance:** Find financial aid opportunities
- **GTE Visa Statement Builder:** Complete visa statement creation tool
- **Reference Letter Toolkit:** Professional reference letter management
- **FAQ with StudentKonnect Branding:** Updated FAQ reflecting 8-country coverage
- **Consistent Purple Gradient Branding:** Professional visual identity throughout
- **Professional Design:** Modern, responsive interface

### Admin Portal
- **Dashboard:** Complete statistics and system health monitoring
- **Consular-Student Engagement:** Manage student counselor requests with fixed menu behavior
- **Counselor Management:** Full CRUD operations with real database integration
- **Student Management:** Comprehensive student administration
- **Analytics & Reports:** Performance metrics and insights
- **Content Management:** University and course database management

## 🎯 Key Improvements

### Fixed Menu Behavior ✨
- **Parent menus stay expanded** when submenu items are clicked
- **Multiple parent menus** can be expanded simultaneously
- **Better navigation flow** - no more collapsing interruptions
- **Auto-expansion** - parent menus automatically expand when navigating to submenu pages

### Database Integration
- **Real-time data** from Supabase database
- **Live counselor profiles** with ratings, experience, and success rates
- **Dynamic statistics** calculated from actual data
- **Professional data management** with search and filtering

## 🚀 Technology Stack

- **Frontend**: React 18 with Vite
- **Styling**: Tailwind CSS with shadcn/ui components
- **Database**: Supabase (PostgreSQL)
- **Icons**: Lucide React
- **Authentication**: Custom admin authentication system
- **State Management**: React Context API
- **Routing**: React Router DOM
- **Build Tool**: Vite
- **Deployment**: Manus.space hosting

## 📦 Installation

1. Clone the repository:
```bash
git clone https://github.com/DMcoder75/studentkonnect_17Aug25.git
cd studentkonnect_17Aug25
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
```
Update the `.env` file with your Supabase credentials.

4. Build the project:
```bash
npm run build
```

5. Start the development server:
```bash
python3 spa_server.py
```

## 🔐 Demo Credentials

### Admin Account
- **Email**: admin@yourunipathway.com
- **Password**: admin123

### Database Integration
- **Live Supabase Database**: Real counselor and student data
- **Dynamic Statistics**: Calculated from actual database records
- **Professional Profiles**: 10 active counselors with ratings and success rates

## 🏗️ Project Structure

```
src/
├── components/           # React components
│   ├── ui/              # Reusable UI components
│   ├── HomePage.jsx     # Landing page
│   ├── StudentProfile.jsx # Student profile management
│   ├── CounselorDashboard.jsx # Counselor dashboard
│   ├── ResumeBuilder.jsx # Resume creation tool
│   └── ...
├── contexts/            # React contexts
│   └── AuthContext.jsx  # Authentication context
├── services/            # API services
│   └── authService.js   # Authentication service
├── lib/                 # Utility libraries
└── styles/              # CSS styles
```

## 🌍 Key Pages

- **Homepage**: Landing page with university search and counselor discovery
- **Student Profile**: Comprehensive student profile with full-width hero section
- **Counselor Dashboard**: Professional counselor interface with student management
- **Resume Builder**: 10-step resume creation with AI assistance
- **SOP Builder**: Statement of Purpose creation tool
- **University Browser**: Search and filter universities globally
- **Course Explorer**: Discover courses and programs

## 🎨 Design Features

- **Responsive Design**: Mobile-first approach with desktop optimization
- **Modern UI**: Clean, professional interface with gradient backgrounds
- **Role-based Navigation**: Dynamic sidebar based on user role
- **Full-width Hero Sections**: Consistent layout across student and counselor areas
- **Interactive Components**: Hover effects, animations, and smooth transitions

## 🔧 Configuration

The application uses environment-based configuration for different deployment environments. Key configuration areas include:

- Authentication endpoints
- API base URLs
- Feature flags
- Theme customization

## 📱 Mobile Support

The platform is fully responsive and optimized for:
- Desktop (1920px+)
- Laptop (1024px+)
- Tablet (768px+)
- Mobile (320px+)

## 🚀 Deployment

The application is deployed and accessible at production URLs. Build artifacts are optimized for performance with code splitting and lazy loading.

## 🤝 Contributing

This is a complete, production-ready educational platform. The codebase includes:

- Comprehensive component library
- Authentication system
- Role-based access control
- Professional UI/UX design
- Mobile responsiveness
- Performance optimizations

## 📄 License

This project is proprietary software developed for StudentKonnect platform.

## 📞 Support

For technical support or questions about the platform, please contact the development team.

---

**StudentKonnect** - Connecting Students to Global Education Opportunities 🎓
