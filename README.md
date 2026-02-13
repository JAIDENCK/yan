# YanbieVA Portfolio

A beautiful portfolio website for voice actress YanbieVA, featuring an admin panel for managing projects, voice demos, and contact messages.

## Features

- **Beautiful Design**: Pastel coral color scheme with floating decorations
- **Responsive Layout**: Works on desktop, tablet, and mobile devices
- **Admin Panel**: Manage projects, voice demos, messages, and settings
- **Voice Demo Player**: Play uploaded audio files directly on the site
- **Contact Form**: Receive messages from potential clients
- **File Upload**: Upload voice demos to the server (when running with backend)

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Install dependencies:
```bash
npm install
```

2. Build the React app:
```bash
npm run build
```

### Running the Website

#### Option 1: Static Deployment (No File Upload)

For static hosting (like GitHub Pages, Netlify, Vercel):

1. Build the app:
```bash
npm run build
```

2. Deploy the `dist` folder to your hosting provider.

3. For voice demos, manually add audio files to the `public/audio/` folder before building.

#### Option 2: With Backend Server (File Upload Enabled)

To enable file uploads for voice demos:

1. Install all dependencies (including backend):
```bash
npm install
```

2. Build the React app:
```bash
npm run build
```

3. Start the server:
```bash
npm run server
```

4. Open your browser and navigate to `http://localhost:3001`

The server will:
- Serve the built React app
- Handle file uploads to `public/audio/`
- Serve audio files from `/audio/` endpoint
- Persist data using localStorage (in the browser)

## Admin Panel

Access the admin panel by clicking the lock icon in the top right corner of the website.

**Default Password**: `yanbieva-admin`

### Admin Features

- **Projects**: Add, edit, and delete projects
- **Demo Reel**: Upload and manage voice demos
- **Messages**: View contact form submissions
- **Settings**: Toggle availability status

## File Structure

```
├── public/
│   └── audio/          # Uploaded audio files
├── src/
│   ├── components/     # React components
│   │   ├── admin/      # Admin panel components
│   │   └── ...         # Other components
│   ├── sections/       # Page sections
│   ├── data/           # Static data
│   ├── types/          # TypeScript types
│   └── ...
├── server.js           # Express server for file uploads
└── package.json
```

## Voice Demo Upload

### With Server Running

When the server is running (`npm run server`):
1. Go to Admin Panel → Demo Reel
2. Enter a title for your demo
3. Drag and drop or click to select an audio file
4. Click "Upload Demo"
5. The file will be saved to `public/audio/` and immediately available

### Without Server (Static Hosting)

For static hosting without a backend:
1. Manually copy audio files to the `public/audio/` folder
2. Rebuild and redeploy the site
3. Or use the admin panel to add demo metadata (title only), then manually add the matching audio file

## Customization

### Colors

Edit `src/index.css` to change the color scheme:

```css
--coral: #F47B6C;
--coral-light: #FF9B8E;
--cream: #FFF8F3;
--peach: #FFD4C7;
--yellow: #FFE4A1;
--mint: #A8E6CF;
```

### Content

Edit `src/data/content.ts` to update:
- Projects
- Social links
- Equipment list
- Character archetypes

## Technologies Used

- **Frontend**: React, TypeScript, Tailwind CSS, shadcn/ui
- **Backend**: Express.js, Multer (for file uploads)
- **Icons**: Lucide React
- **Fonts**: Nunito (Google Fonts)

## License

This project is created for YanbieVA. All rights reserved.
"# yan" 
