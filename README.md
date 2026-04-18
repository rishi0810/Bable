# Bable: Frontend  

Bable is a React frontend for the Bable blogging platform.
The backend is now the Spring Boot service at:

- `https://api.rishiapps.com/bable-sb-app/`

## Features  

### Currently Implemented:
- JWT-based authentication (`Authorization: Bearer <token>`)
- Sign up and login flows
- Create blog posts
- Save/remove saved blogs
- User profile with written/saved stories

### Upcoming Features:  
- **Comment section** for interactive discussions  
- **Upvotes and downvotes** to rank blogs  
- **Sorting based on popularity**  
- **Profile picture upload and management**  

## Tech Stack
- **Frontend:** React + Vite
- **Backend:** Spring Boot
- **Authentication:** JWT (Bearer token)

## Installation and Setup  

1. **Clone the repository**  
   ```sh
   git clone https://github.com/rishi0810/Bable.git
   cd Bable
   ```

2. **Install Bun**  
   Follow the official installation guide: https://bun.sh/docs/installation

3. **Install dependencies**  
   ```sh
   bun install
   ```

4. **Set API URL (optional; defaults to production API)**  
   ```sh
   # .env
   VITE_API_BASE_URL=https://api.rishiapps.com/bable-sb-app/
   ```

5. **Run the development server**  
   ```sh
   bun run dev
   ```

6. **Create a production build**  
   ```sh
   bun run build
   ```

Vite remains the frontend bundler for this project. Bun is used for dependency installation and package script execution.

## Screenshots

### Landing Page
![Landing Page](https://i.ibb.co/S7MvTtDN/Screenshot-2025-06-16-at-8-22-04-PM.jpg)
*The Bable landing page welcomes users with a clean, modern interface and easy access to sign up or log in.*

### Blogs Page
![Blogs Page](https://i.ibb.co/QSn5vsT/Screenshot-2025-06-16-at-8-22-50-PM.jpg)
*The Blogs page displays a curated list of blog posts, allowing users to explore, read, and interact with content from the community.*
