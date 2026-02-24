# App Semillas Financieras Rural

A comprehensive mobile financial education platform designed to improve financial literacy in rural communities through interactive learning modules, assessments, and personalized certificates.

## 📱 Overview

**App Semillas Financieras Rural** is a mobile-first educational application that guides users through a structured financial literacy journey. The app measures knowledge improvement through pre/post assessments and rewards completion with a personalized PDF certificate delivered via email.

## 🎯 User Journey

### 1. Initial Assessment
When users first enter the application, they must complete an **initial assessment** (quiz) to evaluate their baseline financial knowledge. This pre-assessment:
- Measures current understanding of financial concepts
- Establishes a baseline for knowledge improvement tracking
- Unlocks access to the learning modules upon completion

### 2. Learning Modules
After completing the initial assessment, users gain access to **10 interactive learning modules**:

1. **Salud Económica** (Economic Health)
2. **Yo llevo mis cuentas** (I Keep My Accounts)
3. **Yo ahorro** (I Save)
4. **Deudas Sanas** (Healthy Debts)
5. **Tentaciones** (Temptations)
6. **Yo me aseguro** (I Insure Myself)
7. **Servicios Financieros** (Financial Services)
8. **Trabajo en Comunidad** (Community Work)
9. **Cajero Automático** (ATM Operations)
10. **Recomendaciones de Seguridad** (Security Recommendations)

Each module includes:
- **Educational videos** explaining key financial concepts
- **Interactive activities** to reinforce learning
- **Immediate feedback** on performance
- **Rewards** upon successful completion

### 3. Final Assessment
Once all modules are completed, users must take the **final assessment** (post-assessment). This evaluation:
- Measures knowledge gained throughout the learning journey
- Compares results with the initial assessment
- Determines overall improvement in financial literacy

### 4. Certificate Generation
The final module, **Mi Aprendizaje** (My Learning), generates a **personalized PDF certificate** that:
- Summarizes the user's learning achievements
- Displays knowledge improvement metrics
- Is automatically sent to the user's email address
- Serves as proof of course completion

## 🛠️ Technical Stack

### Frontend
- **React 19** - UI library
- **TypeScript** - Type-safe development
- **Vite** - Fast build tool and dev server
- **Tailwind CSS 4** - Utility-first styling
- **React Router 7** - Client-side routing

### Mobile
- **Capacitor 7** - Native mobile deployment (Android)

### State Management & Data Fetching
- **React Context API** - Global state management
- **TanStack Query (React Query)** - Server state management
- **React Hook Form** - Form handling
- **Zod** - Schema validation

### Backend & Services
- **Firebase**
  - **Firestore** - NoSQL database for user progress and assessments
  - **Authentication** - User authentication and authorization

### UI Components
- **Headless UI** - Accessible component primitives
- **Lucide React** - Icon library
- **Sonner** - Toast notifications
- **React Day Picker** - Date selection

## 📁 Project Structure

```
src/
├── features/
│   ├── auth/              # Authentication system
│   ├── assessment/        # Pre/post assessment logic
│   ├── modules/           # 10 learning modules
│   │   ├── 1-salud-economica/
│   │   ├── 2-yo-llevo-mis-cuentas/
│   │   └── ...
│   ├── home/              # Home page with module slider
│   └── users/             # User profile management
├── shared/                # Shared components and utilities
├── layouts/               # Layout components
├── router/                # Route configuration
├── lib/                   # Third-party library configurations
├── config/                # App configuration
└── styles/                # Global styles
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- pnpm (recommended) or npm
- Android Studio (for Android builds)

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd App-Semillas-Financieras-Rural
```

2. Install dependencies:
```bash
pnpm install
```

3. Set up environment variables:
```bash
cp .env.example .env
```
Edit `.env` and add your Firebase configuration.

4. Start the development server:
```bash
pnpm dev
```

### Database Setup

```bash
# Clear database
pnpm db:clear

# Seed database with initial data
pnpm db:seed

# Reset database (clear + seed)
pnpm db:reset
```

## 📱 Android Build

### Development Build
```bash
pnpm android:run
```

### Generate APK
```bash
pnpm android:apk
```

The APK will be generated in `android/app/build/outputs/apk/debug/`.

For detailed Android setup instructions, see [ANDROID_SETUP.md](./ANDROID_SETUP.md) and [ANDROID_BUILD.md](./ANDROID_BUILD.md).

## 🗄️ Database Schema

### Collections

#### `module_progress`
Tracks user progress through learning modules:
```typescript
{
  userId: string;
  moduleId: string;
  startedAt: Date;
  completedAt?: Date;
  isComplete: boolean;
  progress: number;
  data?: {
    score?: number;
    correctAnswers?: number;
    totalQuestions?: number;
    attempts?: number;
  }
}
```

#### `assessments`
Stores pre and post assessment results:
```typescript
{
  userId: string;
  preAssessment?: {
    answers: Record<string, string>; // questionId: answerId
    completedAt: Date;
  };
  postAssessment?: {
    answers: Record<string, string>;
    completedAt: Date;
  };
  createdAt: Date;
  updatedAt: Date;
}
```

## 🔧 Available Scripts

| Script | Description |
|--------|-------------|
| `pnpm dev` | Start development server |
| `pnpm build` | Build for production |
| `pnpm preview` | Preview production build |
| `pnpm lint` | Run ESLint |
| `pnpm db:clear` | Clear database |
| `pnpm db:seed` | Seed database |
| `pnpm db:reset` | Reset database |
| `pnpm android:run` | Build and run on Android |
| `pnpm android:apk` | Generate Android APK |

## 🔒 Firestore Security Rules

The application uses the following Firestore security rules. Update these in the Firebase Console under **Firestore Database > Rules**.

### Development Rules (Current)

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users collection
    match /users/{userId} {
      allow read, write: if true;
    }
    
    // Learning progress
    match /learning_progress/{userId} {
      allow read, write: if true;
    }
    
    // Assessment results
    match /assessments/{userId} {
      allow read, write: if true;
    }
    
    // Settings (assessment configuration, etc.)
    match /settings/{document} {
      allow read: if true;
      allow write: if true;  // For seeding
    }
    
    // Deny everything else
    match /{document=**} {
      allow read, write: if false;
    }
  }
}
```

### Production Rules (Recommended)

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users collection - authenticated users only
    match /users/{userId} {
      allow read: if request.auth != null;
      allow write: if request.auth != null && request.auth.uid == userId;
    }
    
    // Learning progress - users can only access their own
    match /learning_progress/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    
    // Assessment results - users can only access their own
    match /assessments/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    
    // Settings - everyone can read, only admins can write
    match /settings/{document} {
      allow read: if true;
      allow write: if false;  // Use Firebase Admin SDK for updates
    }
    
    // Deny everything else
    match /{document=**} {
      allow read, write: if false;
    }
  }
}
```


## 🎨 Key Features

- ✅ **Progressive Learning Path** - Structured module progression
- ✅ **Knowledge Assessment** - Pre/post evaluation system
- ✅ **Progress Tracking** - Real-time progress monitoring
- ✅ **Interactive Content** - Videos and hands-on activities
- ✅ **Immediate Feedback** - Instant performance feedback
- ✅ **Gamification** - Rewards and achievements
- ✅ **Certificate Generation** - PDF certificates via email
- ✅ **Mobile-First Design** - Optimized for mobile devices
- ✅ **Offline-Ready** - Capacitor native capabilities
- ✅ **Type-Safe** - Full TypeScript implementation

## 📄 License

[Add your license information here]

## 👥 Contributors

[Add contributor information here]

## 📞 Support

[Add support contact information here]
