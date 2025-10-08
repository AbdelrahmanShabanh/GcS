# GC School - Programming Education Platform

A modern web application for teaching programming to children aged 6-18, built with Next.js and MongoDB Atlas.

## Features

- **Multi-language Support**: Arabic and English interface
- **Admin Dashboard**: Manage courses, projects, FAQs, and testimonials
- **Responsive Design**: Works on desktop, tablet, and mobile devices
- **Modern Tech Stack**: Next.js 14, TypeScript, Tailwind CSS, MongoDB Atlas

## Tech Stack

- **Frontend**: Next.js 14, React 18, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes, MongoDB Atlas
- **Authentication**: JWT tokens with bcrypt password hashing
- **Database**: MongoDB Atlas (cloud-hosted)

## Prerequisites

- Node.js 18+ 
- MongoDB Atlas account
- Git

## Setup Instructions

### 1. Clone the Repository

```bash
git clone <repository-url>
cd gcschool
```

### 2. Install Dependencies

   ```bash
   npm install
   ```

### 3. Environment Configuration

Create a `.env.local` file in the root directory:

```env
# MongoDB Atlas Connection String
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/gcschool?retryWrites=true&w=majority

# JWT Secret for authentication
JWT_SECRET=your-super-secret-jwt-key-here

# Next.js Environment
NODE_ENV=development
```

### 4. MongoDB Atlas Setup

1. Create a MongoDB Atlas account at [mongodb.com](https://www.mongodb.com/atlas)
2. Create a new cluster
3. Create a database user with read/write permissions
4. Whitelist your IP address (or use 0.0.0.0/0 for development)
5. Get your connection string and update `MONGODB_URI` in `.env.local`

### 5. Initialize Database

```bash
npm run init-db
```

This will create the necessary collections and seed them with default data.

### 6. Start Development Server

   ```bash
   npm run dev
   ```

The application will be available at `http://localhost:3000`

## Default Admin Credentials

- **Email**: admin@gcschool.tech
- **Password**: admin123

## Project Structure

```
gcschool/
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   │   ├── auth/          # Authentication endpoints
│   │   ├── courses/       # Course management
│   │   ├── faq/          # FAQ management
│   │   ├── hero/         # Hero section
│   │   ├── leaders/      # Testimonials/leaders
│   │   └── projects/     # Project showcase
│   ├── admin/            # Admin dashboard
│   └── globals.css       # Global styles
├── components/           # React components
│   ├── admin/           # Admin-specific components
│   ├── auth/            # Authentication components
│   ├── sections/        # Main page sections
│   └── ui/              # Reusable UI components
├── contexts/            # React contexts
├── lib/                 # Utility libraries
│   ├── mongodb.ts       # Database connection
│   ├── models.ts        # TypeScript interfaces
│   └── seed.ts          # Database seeding
├── public/              # Static assets
├── scripts/             # Utility scripts
└── utils/               # Helper functions
```

## API Endpoints

### Authentication
- `POST /api/auth/login` - Admin login

### Content Management
- `GET /api/hero` - Get hero section data
- `POST /api/hero` - Update hero section
- `GET /api/courses` - Get all courses
- `POST /api/courses` - Update courses
- `GET /api/projects` - Get all projects
- `POST /api/projects` - Update projects
- `GET /api/leaders` - Get testimonials
- `POST /api/leaders` - Update testimonials
- `GET /api/faq` - Get FAQs
- `POST /api/faq` - Update FAQs

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy

### Other Platforms

The application can be deployed to any platform that supports Next.js:
- Netlify
- Railway
- DigitalOcean App Platform
- AWS Amplify

## Development

### Adding New Features

1. Create API routes in `app/api/`
2. Add TypeScript interfaces in `lib/models.ts`
3. Update the API client in `utils/api.ts`
4. Create/update React components

### Database Schema

The application uses the following MongoDB collections:
- `admin_users` - Admin user accounts
- `hero_data` - Hero section content
- `courses` - Learning path courses
- `projects` - Student project showcases
- `leaders` - Testimonials and success stories
- `faqs` - Frequently asked questions

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support, email support@gcschool.tech or create an issue in the repository.