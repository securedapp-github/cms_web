# 🎯 Secure CMS - Premium React Web Application# React + TypeScript + Vite



> A production-ready, premium React web application built for Fiduciary and Admin users with JWT authentication. Designed for the elite 0.001% - banking/fintech grade quality.This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.



## ✨ FeaturesCurrently, two official plugins are available:



### 🔐 Complete Authentication Flow- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh

- ✅ **User Registration** with email verification (4-digit OTP)- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

- ✅ **Role-based Login** (Fiduciary/Admin)

- ✅ **Password Reset** flow with 6-digit verification code## React Compiler

- ✅ **JWT Token** authentication with auto-logout on expiry

- ✅ **Remember Me** functionalityThe React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

- ✅ **Protected Routes** with authentication guards

## Expanding the ESLint configuration

### 🎨 Premium UI/UX

- ✨ **Glassmorphism** effects and smooth animationsIf you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

- 📊 **Password Strength Meter** with real-time validation

- ✔️ **Form Validation** using React Hook Form + Zod```js

- 🔔 **Toast Notifications** for user feedbackexport default defineConfig([

- 📱 **Responsive Design** - perfect on all devices  globalIgnores(['dist']),

- ♿ **Accessibility** compliant (WCAG AA)  {

    files: ['**/*.{ts,tsx}'],

### 🛠️ Tech Stack    extends: [

- React 19 + TypeScript      // Other configs...

- React Router v6

- Axios + JWT Decode      // Remove tseslint.configs.recommended and replace with this

- React Hook Form + Zod      tseslint.configs.recommendedTypeChecked,

- TailwindCSS v4      // Alternatively, use this for stricter rules

- Framer Motion      tseslint.configs.strictTypeChecked,

- React Hot Toast      // Optionally, add this for stylistic rules

- Lucide React Icons      tseslint.configs.stylisticTypeChecked,



## 🚀 Quick Start      // Other configs...

    ],

### Installation    languageOptions: {

```bash      parserOptions: {

npm install        project: ['./tsconfig.node.json', './tsconfig.app.json'],

```        tsconfigRootDir: import.meta.dirname,

      },

### Environment Setup      // other options...

Create `.env` file:    },

```env  },

VITE_API_BASE_URL=http://localhost:3000/api/auth])

VITE_APP_NAME=Secure CMS```

VITE_TOKEN_KEY=auth_token

```You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:



### Run Development Server```js

```bash// eslint.config.js

npm run devimport reactX from 'eslint-plugin-react-x'

```import reactDom from 'eslint-plugin-react-dom'



App runs at `http://localhost:5173`export default defineConfig([

  globalIgnores(['dist']),

### Build for Production  {

```bash    files: ['**/*.{ts,tsx}'],

npm run build    extends: [

```      // Other configs...

      // Enable lint rules for React

## 📁 Project Structure      reactX.configs['recommended-typescript'],

      // Enable lint rules for React DOM

```      reactDom.configs.recommended,

src/    ],

├── components/    languageOptions: {

│   ├── common/          # Button, Input, Loader, Logo, etc.      parserOptions: {

│   └── layout/          # AuthLayout, DashboardLayout        project: ['./tsconfig.node.json', './tsconfig.app.json'],

├── pages/               # Landing, Login, Signup, Dashboard, etc.        tsconfigRootDir: import.meta.dirname,

├── services/            # API client & auth service      },

├── contexts/            # AuthContext      // other options...

├── hooks/               # useAuth    },

├── types/               # TypeScript definitions  },

├── utils/               # Constants, validation, storage])

└── App.tsx              # Main app with routing```

```

## 🔌 API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/register` | POST | Register user |
| `/verify-email` | POST | Verify email OTP |
| `/login` | POST | User login |
| `/forgot-password` | POST | Request reset code |
| `/verify-reset-token` | POST | Verify reset code |
| `/reset-password` | POST | Reset password |

All endpoints return:
```typescript
{
  success: boolean;
  data: any;
  message: string;
  status: number;
}
```

## 🎯 User Flows

### Registration → Login
1. Fill registration form with validation
2. Receive 4-digit OTP via email
3. Enter OTP to verify email
4. Login with credentials + role

### Password Reset
1. Enter email on forgot password page
2. Receive 6-digit code via email
3. Verify code
4. Set new password
5. Login with new credentials

## 🎨 Design System

### Colors
- Primary: `#0F172A` (Deep Navy)
- Secondary: `#F59E0B` (Amber)
- Success: `#10B981` (Emerald)
- Error: `#EF4444` (Rose)

### Typography
- Headings: Poppins Bold
- Body: Inter Regular

## 🔒 Security

- JWT token management
- Secure localStorage
- XSS protection
- Password strength requirements
- Auto-logout on token expiry
- Role-based access control

## 📦 Scripts

```bash
npm run dev      # Start dev server
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Run ESLint
```

## 🎯 What's Implemented

✅ Landing page with features  
✅ Signup with password strength meter  
✅ OTP verification with auto-focus  
✅ Login with role selector  
✅ Forgot password flow  
✅ Reset password flow  
✅ Protected dashboard  
✅ JWT authentication  
✅ Error handling  
✅ Loading states  
✅ Responsive design  
✅ Form validation  
✅ Toast notifications  

## 📝 Important Notes

1. **Node Version**: Requires Node.js 20.19+ or 22.12+ (current: 20.17.0 - upgrade recommended)
2. **Backend**: Currently configured for `http://localhost:3000/api/auth` - update `.env` for your backend
3. **Styling**: Using TailwindCSS v4 - syntax differs from v3
4. **Authentication**: JWT tokens stored in localStorage (or sessionStorage if "Remember Me" unchecked)

## 🚀 Deployment

1. Update `.env` with production API URL
2. Run `npm run build`
3. Deploy `dist/` folder to your hosting service
4. Ensure HTTPS is enforced
5. Configure CORS on backend

## 📚 Documentation

- [React Hook Form](https://react-hook-form.com/)
- [Zod Validation](https://zod.dev/)
- [TailwindCSS v4](https://tailwindcss.com/)
- [React Router](https://reactrouter.com/)
- [Axios](https://axios-http.com/)

---

**Built for the elite 0.001%. Nothing less than perfection.** 🚀
