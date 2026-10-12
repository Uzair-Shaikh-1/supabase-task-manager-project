# Supabase Task Manager CRUD

A simple Task Manager application built with **React, TypeScript, and Supabase**. This project demonstrates basic CRUD operations, user session integration, and image uploads using Supabase Storage.

## Features

- **Create:** Add tasks with a title, description, and optional image.
- **Read:** Fetch and display tasks from the Supabase database.
- **Update:** Edit task descriptions.
- **Delete:** Remove tasks.
- **Image Upload:** Upload task images to Supabase Storage.
- **Database Integration:** Store and manage tasks using Supabase.

## Tech Stack

- React
- TypeScript
- Supabase
- Supabase Storage
- Vite

## Getting Started

### 1. Clone the repository

```bash
git clone <your-repository-url>
cd <project-folder>
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env` file in the project root and add your Supabase project credentials:

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_PUBLISHABLE_KEY=your_supabase_publishable_key
```

Get these values from your Supabase project settings.

**Important:** Never commit your `.env` file or expose your Supabase secret or `service_role` keys.

### 4. Configure Supabase

Before running the application, make sure your Supabase project has:

- A `task tabe` database table with the required columns: `id`, `title`, `description`, `email`, `image_url`, and `created_at`.
- A Storage bucket named `tasks-images` for uploaded images.
- Appropriate database permissions and Storage policies.

The `image_url` column should support `NULL` values if tasks can be created without an image.

### 5. Start the development server

```bash
npm run dev
```

Open the local URL provided by Vite in your terminal to use the application.

## Environment Variables

| Variable | Description |
|---|---|
| `VITE_SUPABASE_URL` | Your Supabase project URL |
| `VITE_SUPABASE_PUBLISHABLE_KEY` | Your Supabase publishable key |

## Notes

- You need your own Supabase project and must configure the required database table, Storage bucket, and access policies.
- The application will not work fully until the Supabase backend is configured correctly.
- For production use, enable Row Level Security (RLS) and configure policies to protect user data.

## License

This project is available for learning and educational purposes.
