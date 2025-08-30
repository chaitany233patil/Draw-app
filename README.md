# DrawSync - Collaborative Whiteboard Application

A real-time collaborative whiteboard application that enables multiple users to draw, design, and collaborate seamlessly. Built with modern web technologies for optimal performance and user experience.

## 📸 Screenshots

### Homepage - Manage Your Whiteboards
![DrawSync Homepage](https://github.com/user-attachments/assets/3aa218aa-5526-473e-9381-abf3d7fe2db8)

### Canvas Interface - Collaborative Drawing
![DrawSync Canvas](https://github.com/user-attachments/assets/80e5d084-65f7-45f2-bb6a-fdc59a4d912e)

## ✨ Features

- **🎨 Real-time Collaboration**: Multiple users can draw and edit simultaneously
- **🛠️ Rich Drawing Tools**:
  - Cursor and pan tools for navigation
  - Shape tools: circles, rectangles, lines
  - Freehand drawing with customizable pen
  - Text tool for annotations
- **🎨 Customization Options**:
  - Multiple colors and stroke widths
  - Different stroke styles (solid, dashed)
  - Scalable canvas with zoom controls
- **🏠 Room Management**: Create and join drawing rooms with unique IDs
- **⚡ WebSocket Integration**: Real-time synchronization across all connected users
- **🔐 User Authentication**: Secure user management with Firebase
- **💾 Persistent Storage**: Save drawings to PostgreSQL database

## 🏗️ Architecture

This application follows a modern microservices architecture:

```
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│   Frontend      │    │   HTTP Backend   │    │  WebSocket      │
│   (Next.js)     │◄──►│   (Express.js)   │    │  Backend        │
│                 │    │                  │    │  (Real-time)    │
└─────────────────┘    └──────────────────┘    └─────────────────┘
         │                        │                       │
         │                        └───────┬───────────────┘
         │                                │
         └────────────────────────────────▼
                            ┌─────────────────┐
                            │   PostgreSQL    │
                            │   Database      │
                            │   (Prisma ORM)  │
                            └─────────────────┘
```

## 🚀 Tech Stack

### Frontend

- **[Next.js 15](https://nextjs.org/)** - React framework with App Router
- **[TypeScript](https://www.typescriptlang.org/)** - Type-safe JavaScript
- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first CSS framework
- **[Framer Motion](https://www.framer.com/motion/)** - Animation library
- **[Lucide React](https://lucide.dev/)** - Beautiful icons

### Backend

- **[Express.js](https://expressjs.com/)** - HTTP server and REST API
- **[WebSocket (ws)](https://github.com/websockets/ws)** - Real-time communication
- **[Prisma](https://www.prisma.io/)** - Type-safe database ORM
- **[PostgreSQL](https://www.postgresql.org/)** - Robust relational database
- **[Firebase Admin](https://firebase.google.com/docs/admin/setup)** - Authentication

### Development Tools

- **[Turborepo](https://turborepo.com/)** - High-performance build system
- **[ESLint](https://eslint.org/)** - Code linting and quality
- **[Prettier](https://prettier.io/)** - Code formatting
- **[pnpm](https://pnpm.io/)** - Fast, disk space efficient package manager

## 📦 Project Structure

```
draw-app/
├── apps/
│   ├── web/                 # Next.js frontend application
│   ├── http-backend/        # Express.js REST API server
│   └── ws-backend/          # WebSocket server for real-time features
├── packages/
│   ├── database/            # Prisma schema and database utilities
│   ├── ui/                  # Shared UI components
│   ├── eslint-config/       # Shared ESLint configurations
│   ├── typescript-config/   # Shared TypeScript configurations
│   └── common-backend/      # Shared backend utilities
└── package.json             # Root package configuration
```

## 🛠️ Installation & Setup

### Prerequisites

- **Node.js** 20.x or higher
- **pnpm** 8.x (will be installed automatically)
- **PostgreSQL** database
- **Firebase** project for authentication

### 1. Clone the Repository

```bash
git clone https://github.com/chaitany233patil/Draw-app.git
cd Draw-app
```

### 2. Install Dependencies

```bash
npm install -g pnpm
pnpm install
```

### 3. Environment Setup

Create environment files for your services:

#### Frontend (`apps/web/.env.local`)

```env
NEXT_PUBLIC_WS_BACKEND=ws://localhost:8080
NEXT_PUBLIC_HTTP_BACKEND=http://localhost:3001
NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_firebase_project_id
# Add other Firebase config...
```

#### Database (`packages/database/.env`)

```env
DATABASE_URL=postgresql://username:password@localhost:5432/drawsync_db
```

#### Backend Services

Configure environment variables for both HTTP and WebSocket backends as needed.

### 4. Database Setup

```bash
# Generate Prisma client
cd packages/database
pnpm prisma generate

# Run database migrations
pnpm prisma migrate dev
```

### 5. Start Development Servers

```bash
# Start all services in development mode
pnpm dev
```

This will start:

- Frontend: http://localhost:3000
- HTTP Backend: http://localhost:3001
- WebSocket Backend: ws://localhost:8080

## 🎮 Usage

### Creating a Room

1. Open the application in your browser
2. Click "New" to create a new whiteboard room
3. Enter a room name and click "Create"
4. Start drawing and share the room ID with collaborators

### Joining a Room

1. Click "Join" on the homepage
2. Enter the room ID provided by the room creator
3. Click "Join" to enter the collaborative session

### Drawing Tools

- **Cursor**: Select and move objects
- **Pan**: Navigate around the canvas
- **Shapes**: Draw circles, rectangles, and lines
- **Pen**: Freehand drawing
- **Text**: Add text annotations

### Customization

- Choose from multiple colors
- Adjust stroke width
- Select different stroke styles (solid, dashed)
- Zoom in/out using the scale controls

## 🔧 Development

### Building the Project

```bash
# Build all packages and applications
pnpm build
```

> **Note**: If you encounter build errors related to database imports, ensure the database package is built first by running `cd packages/database && pnpm prisma generate`.

### Linting and Formatting

```bash
# Lint all packages
pnpm lint

# Format code
pnpm format

# Type checking
pnpm check-types
```

### Database Operations

```bash
# View database in Prisma Studio
cd packages/database
pnpm prisma studio

# Reset database
pnpm prisma migrate reset

# Deploy migrations to production
pnpm prisma migrate deploy
```

## 🚀 Deployment

### Frontend (Vercel)

1. Connect your repository to Vercel
2. Configure environment variables
3. Deploy with automatic builds on push

### Backend Services

Deploy HTTP and WebSocket backends to your preferred hosting platform:

- [Railway](https://railway.app/)
- [Render](https://render.com/)
- [DigitalOcean](https://www.digitalocean.com/)
- [AWS](https://aws.amazon.com/)/[GCP](https://cloud.google.com/)/[Azure](https://azure.microsoft.com/)

### Database

Set up PostgreSQL on:

- [Vercel Postgres](https://vercel.com/docs/storage/vercel-postgres)
- [Railway](https://railway.app/)
- [Supabase](https://supabase.com/)
- [PlanetScale](https://planetscale.com/) (MySQL alternative)

## ❗ Troubleshooting

### Common Issues

**Build Errors with Database Imports**
```bash
# Generate Prisma client first
cd packages/database
pnpm prisma generate
cd ../..
pnpm build
```

**WebSocket Connection Failed**
- Ensure the WebSocket backend is running on port 8080
- Check that the `WS_BACKEND` environment variable is correctly set
- Verify firewall settings allow WebSocket connections

**Frontend Build Issues with Google Fonts**
- This is expected in environments without internet access
- The app will still function with fallback fonts
- In production, ensure network access to `fonts.googleapis.com`

**Database Connection Issues**
```bash
# Check database connection
cd packages/database
pnpm prisma db push
```

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Make your changes and commit: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

### Development Guidelines

- Follow the existing code style and conventions
- Write meaningful commit messages
- Add tests for new features
- Update documentation as needed

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with [Turborepo](https://turborepo.com/) for optimal monorepo management
- UI components inspired by modern design systems
- Real-time features powered by WebSocket technology

## 📧 Contact

**Author**: Chaitanya Patil  
**GitHub**: [@chaitany233patil](https://github.com/chaitany233patil)

---

<p align="center">
  <strong>🎨 Happy Drawing! 🎨</strong>
</p>
