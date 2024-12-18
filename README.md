# MedManager Portal

A comprehensive medical prescription management system built with React, TypeScript, and Firebase.

## Features

- 🏥 Patient Management
- 💊 Prescription Tracking
- 📊 Analytics Dashboard
- 🔒 Secure Authentication
- 📱 Responsive Design

## Tech Stack

- React 18
- TypeScript
- Vite
- Firebase
- TailwindCSS
- Lucide Icons

## Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/drunkonjava/medmanager-portal.git
   cd medmanager-portal
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   - Copy `.env.example` to `.env`
   - Fill in your Firebase configuration values

4. Start development server:
   ```bash
   npm run dev
   ```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run test` - Run tests
- `npm run test:e2e` - Run end-to-end tests
- `npm run lint` - Run ESLint

## Project Structure

```
src/
  ├── components/     # Reusable UI components
  ├── features/       # Feature-specific components and logic
  ├── hooks/          # Custom React hooks
  ├── services/       # API and service layer
  ├── types/          # TypeScript type definitions
  └── utils/          # Utility functions
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.