# Job Search Application

A modern, mobile-responsive job search website built with Next.js 14, React, TypeScript, and Tailwind CSS. Optimized for mobile H5 view with a clean, intuitive interface for searching and browsing job listings.

## Features

- 🔍 **Advanced Search** - Search jobs by title, company, description, or location
- 🎯 **Smart Filtering** - Filter by job type (Full-time, Part-time, Contract, Remote) and location
- 📱 **Mobile-First Design** - Fully optimized for mobile H5 view with responsive breakpoints
- 💼 **Job Details** - View comprehensive job details in a modal overlay
- ⚡ **Next.js 14** - Built with the latest Next.js App Router for optimal performance
- 🎨 **Modern UI** - Beautiful, clean interface using Tailwind CSS
- 🔒 **Type-Safe** - Built with TypeScript for better developer experience
- 🚀 **Server Components** - Leverages Next.js server and client components

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser and navigate to [http://localhost:3000](http://localhost:3000)

### Build for Production

To create a production build:

```bash
npm run build
```

To start the production server:

```bash
npm start
```

## Project Structure

```
.
├── app/
│   ├── layout.tsx          # Root layout with metadata
│   ├── page.tsx            # Home page (main job search interface)
│   └── globals.css         # Global styles with Tailwind directives
├── components/
│   ├── JobCard.tsx         # Job listing card component
│   ├── JobDetails.tsx      # Job details modal component
│   ├── SearchBar.tsx       # Search input component
│   └── FilterBar.tsx       # Filter controls component
├── data/
│   └── mockJobs.ts         # Mock job data
├── types.ts                # TypeScript type definitions
├── next.config.js          # Next.js configuration
├── tailwind.config.js      # Tailwind CSS configuration
├── tsconfig.json           # TypeScript configuration
└── package.json            # Dependencies and scripts
```

## Mobile Optimization

This application is designed with mobile-first principles:

- ✅ Responsive breakpoints for various screen sizes (sm, md, lg)
- ✅ Touch-friendly interactive elements with proper tap targets
- ✅ Optimized font sizes for mobile readability (14px base on mobile)
- ✅ Smooth animations and transitions
- ✅ Viewport meta tags for proper mobile rendering
- ✅ Sticky header for easy navigation while scrolling
- ✅ Modal overlays optimized for mobile viewing
- ✅ Proper spacing and padding for mobile devices

## Features in Detail

### Search Functionality
- Real-time search across job titles, company names, descriptions, and locations
- Case-insensitive search for better user experience

### Filtering System
- Filter by job type: All, Full-time, Part-time, Contract, Remote
- Filter by location with a dropdown selector
- Dynamic location list extracted from available jobs

### Job Listings
- Card-based layout with hover effects
- Displays job title, company, location, salary, type, and description preview
- Click any job card to view full details

### Job Details Modal
- Full-screen modal on mobile, centered modal on desktop
- Complete job description and requirements
- Apply button and close functionality
- Smooth animations and transitions

## Technologies Used

- **Next.js 14** - React framework with App Router
- **React 18** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first CSS framework
- **PostCSS** - CSS processing

## Next.js App Router

This project uses the Next.js 14 App Router, which provides:

- Server Components by default for better performance
- Client Components with `'use client'` directive for interactivity
- Improved routing and navigation
- Built-in optimizations for images, fonts, and scripts
- API Routes support (if needed in the future)

## Customization

### Adding More Jobs
Edit `data/mockJobs.ts` to add or modify job listings. Follow the `Job` interface defined in `types.ts`.

### Styling
Modify `tailwind.config.js` to customize colors, fonts, and other design tokens. The app uses Tailwind's utility classes for all styling.

### Components
All components are modular and can be easily customized or extended in the `components/` directory. Client components are marked with `'use client'` directive.

## Deployment

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new) from the creators of Next.js.

Check out the [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

## License

MIT
