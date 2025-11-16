# Cineflux

Cineflux is a modern web application for browsing and discovering movies, built with React and Next.js. The application fetches movie data from The Movie Database (TMDB) API and presents it in an intuitive, user-friendly interface.

## Features

- Browse trending, popular, and top-rated movies
- Search for movies by title
- View detailed movie information
- Responsive design for all device sizes
- Static site generation for optimal performance

## Tech Stack

- **Frontend Framework**: React 19
- **Build Tool**: Next.js with static export
- **Styling**: CSS Modules
- **API**: The Movie Database (TMDB) API
- **Deployment**: Vercel (configured with vercel.json)

## Project Structure

```
src/
├── components/      # Reusable UI components
├── pages/          # Application routes and pages
├── api/            # API routes (if any)
├── App.js          # Main application component
├── App.css         # Global styles
└── index.js        # Application entry point
```

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- npm or yarn
- TMDB API key (Bearer token)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Pichikachandu/Cineflux.git
   cd Cineflux
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn
   ```

3. Create a `.env.local` file in the root directory and add your TMDB API key:
   ```
   REACT_APP_TMDB_BEARER=your_tmdb_bearer_token_here
   ```

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server (after building)
- `npm test` - Run tests

## Configuration

The application can be configured through the following files:

- `next.config.js` - Next.js configuration
- `vercel.json` - Vercel deployment settings

## Deployment

The application is configured for deployment on Vercel. To deploy:

1. Push your changes to the `main` branch
2. Vercel will automatically detect the Next.js app and deploy it

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

Made with ❤️ by [Your Name]
