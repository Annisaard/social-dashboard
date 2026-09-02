# Social Dashboard

A simple social dashboard built as a frontend technical test.

## Features

* View users
* View user's posts
* View user's albums
* View post details and comments
* View album photos
* View photo details
* Create, edit, and delete posts
* Create, edit, and delete comments

## Tech Stack

* React + TypeScript
* Vite
* React Router
* TanStack Query
* Axios
* Formik + Yup
* Tailwind CSS
* shadcn/ui
* Vitest + React Testing Library

I use **shadcn/ui** to speed up the development process and keep the UI components consistent.

## API

This project uses [JSONPlaceholder](https://jsonplaceholder.typicode.com/) as the API.

Main endpoints:

* `/users`
* `/posts`
* `/albums`
* `/photos`
* `/comments`

## Getting Started

### Requirements

* Node.js 18+
* npm

### Installation

```bash
git clone <repository-url>
cd social-dashboard
npm install
npm run dev
```

Then open the local URL shown in the terminal.

## Environment Variables

Create a `.env` file:

```env
VITE_API_BASE_URL=https://jsonplaceholder.typicode.com
```

## Testing

Run tests with:

```bash
npm run test
```

## Notes

* JSONPlaceholder is a mock API, so created/updated/deleted data is not permanently stored.
* No authentication is implemented because it is not required by the assessment.
* The application uses client-side routing with React Router.
