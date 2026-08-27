# Rock Bridge Frontend

Rock Bridge Frontend is a modern web application built with **Next.js**, providing a professional interface for users to explore services and request quotes, as well as an administrative dashboard for managing content.

## 🚀 Tech Stack

- **Framework**: Next.js (App Router)
- **Styling**: Tailwind CSS
- **Language**: JavaScript / JSX
- **API Integration**: Integration with Rock Bridge Node.js Backend

## 📁 Project Structure

```text
frontend/
├── src/
│   └── app/
│       ├── layout.jsx         # Root layout and global providers
│       ├── page.jsx           # Landing page (Home)
│       ├── globals.css        # Global styles and Tailwind directives
│       ├── dashboard/         # Admin/Management dashboard routes
│       ├── get-offer/         # Service offer request pages
│       ├── resetpassword/     # Password recovery and reset pages
│       ├── components/        # Reusable UI components
│       ├── context/           # React Context for state management (e.g., Auth)
│       ├── lib/               # Utility functions and API clients
│       └── providers/         # Wrapper components for global providers
└── public/                    # Static assets (images, icons, etc.)
```

## 🗺️ Application Routes

### Public Routes
- `/` : Landing page displaying services and company information.
- `/get-offer` : Page for users to request specific service offers.
- `/resetpassword` : Password reset flow for registered users.

### Protected Routes
- `/dashboard` : Admin area for managing services, media, and viewing quote requests.

## 🛠️ Development Setup

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Run the development server**:
   ```bash
   npm run dev
   ```

3. **Access the app**:
   Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🔗 Backend Connection
The frontend connects to the Rock Bridge Backend API. Ensure the backend is running and the base URL is correctly configured in the frontend's environment variables (e.g., `.env.local`).