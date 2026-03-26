# Music App Backend

Backend API for a music platform with authentication, role-based access, music uploads, and album management.

## Features

- User registration, login, and logout
- JWT-based authentication with cookie support
- Role-based authorization (`user`, `artist`)
- Music upload endpoint for artists (multipart/form-data)
- Album creation for artists
- Public/authenticated fetch endpoints for musics and albums
- MongoDB persistence with Mongoose models

## Tech Stack

- Node.js
- Express.js
- MongoDB + Mongoose
- JWT (`jsonwebtoken`)
- Password hashing (`bcryptjs`)
- File upload handling (`multer`)
- Media storage integration (`@imagekit/nodejs`)

## Project Structure

```text
spotify_project/
├─ server.js
├─ package.json
└─ src/
	 ├─ app.js
	 ├─ .env
	 ├─ db/
	 │  └─ db.js
	 ├─ models/
	 │  ├─ user.model.js
	 │  ├─ music.model.js
	 │  └─ album.model.js
	 ├─ middlewares/
	 │  └─ auth.middleware.js
	 ├─ controller/
	 │  ├─ auth.controller.js
	 │  └─ music.controller.js
	 ├─ routes/
	 │  ├─ auth.route.js
	 │  └─ music.route.js
	 └─ services/
			└─ storage.service.js
```

## Environment Variables

Create `src/.env` and add:

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
IMAGEKIT_PRIVATE_KEY=your_imagekit_private_key
```

## Installation & Run

```bash
npm install
npm run dev
```

For production run:

```bash
npm start
```

Default server port in current code: `3000`

## Authentication Flow

- On register/login, server sets a `token` cookie.
- Protected routes read JWT from cookie via middleware.
- Roles:
	- `artist`: can upload music and create albums
	- `user` / `artist`: can fetch music/albums

## API Endpoints

Base URL: `http://localhost:3000`

### Auth Routes (`/api/auth`)

- `POST /register` — Register user
- `POST /login` — Login user
- `POST /logout` — Logout user (clears token cookie)

### Music/Album Routes (`/api/music`)

- `POST /uploadMusic` (artist only)
	- Content-Type: `multipart/form-data`
	- File: any single file field (route uses `upload.any()`)
	- Body field: `title`
- `POST /uploadAlbum` (artist only)
	- Body: `{ "title": "...", "musics": ["musicObjectId1", "musicObjectId2"] }`
- `GET /` (user/artist)
	- Returns music list (currently limited to 2 in controller)
- `GET /albums` (user/artist)
	- Returns all albums
- `GET /albums/:albumId` (user/artist)
	- Returns album by ID
	- Returns `404` if album not found

## Data Models

- `User`
	- `username` (unique)
	- `email` (unique)
	- `password` (hashed)
	- `role` (`user` | `artist`)
- `Music`
	- `uri`
	- `title`
	- `artist` (ref: `users`)
- `Album`
	- `title`
	- `musics` (array of refs: `musics`)
	- `artist` (ref: `users`)

## Notes

- Ensure MongoDB and env values are valid before starting.
- Use tools like Postman/Insomnia to test cookie-based auth flows.
- Keep `JWT_SECRET` and DB credentials private.