# DU Digital Admin Backend API

A comprehensive backend for managing DU Digital's website content through an admin panel.

## Features

- **Home Content Management** - Manage slider banners and promotional content
- **Navigation Management** - Edit navbar items and structure
- **Footer Management** - Update footer content, socials, links, and copyright
- **Contact Management** - Manage office information and contact sections
- **Office Locations** - Handle multiple office locations globally
- **User Query Management** - Receive, track, and respond to customer queries

## Prerequisites

- Node.js 16+ installed
- MongoDB running locally or connection string available
- npm or yarn package manager

## Installation

1. Clone the repository
2. Navigate to the backend folder:

   ```bash
   cd backend
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Create a `.env` file (copy from `.env.example`):

   ```bash
   cp .env.example .env
   ```

5. Configure your MongoDB connection in `.env`:
   ```
   MONGODB_URI=mongodb://localhost:27017/dudigital
   PORT=5000
   NODE_ENV=development
   ```

## Running the Server

### Development Mode (with auto-reload)

```bash
npm run dev
```

### Production Build

```bash
npm run build
npm start
```

### Watch Mode

```bash
npm run watch
```

## Seeding Database

To populate the database with initial data from seeders:

```bash
npm run seed
```

## API Endpoints

### Home Management

- `GET /api/home` - Get home content
- `PUT /api/home` - Update home content
- `POST /api/home/slides` - Add new slide
- `PUT /api/home/slides/:slideIndex` - Update specific slide
- `DELETE /api/home/slides/:slideIndex` - Delete slide

### Navigation Management

- `GET /api/nav` - Get navigation
- `PUT /api/nav` - Update navigation
- `POST /api/nav/items` - Add nav item
- `PUT /api/nav/items/:itemIndex` - Update nav item
- `DELETE /api/nav/items/:itemIndex` - Delete nav item

### Footer Management

- `GET /api/footer` - Get footer content
- `PUT /api/footer` - Update footer
- `PUT /api/footer/newsletter` - Update newsletter section
- `PUT /api/footer/socials` - Update social links
- `PUT /api/footer/links` - Update footer links
- `PUT /api/footer/copyright` - Update copyright

### Contact Management

- `GET /api/contact` - Get contact information
- `PUT /api/contact` - Update contact info
- `PUT /api/contact/hero` - Update hero section
- `POST /api/contact/offices` - Add office
- `PUT /api/contact/offices/:officeIndex` - Update office
- `DELETE /api/contact/offices/:officeIndex` - Delete office

### Office Locations Management

- `GET /api/office-locations` - Get all locations
- `PUT /api/office-locations` - Update locations
- `PUT /api/office-locations/background` - Update background image
- `POST /api/office-locations/locations` - Add location
- `PUT /api/office-locations/locations/:locationIndex` - Update location
- `DELETE /api/office-locations/locations/:locationIndex` - Delete location

### User Query Management

- `POST /api/user-queries` - Submit new query
- `GET /api/user-queries` - Get all queries (supports ?status filter)
- `GET /api/user-queries/stats` - Get query statistics
- `GET /api/user-queries/:queryId` - Get specific query
- `PUT /api/user-queries/:queryId/reply` - Reply to query
- `PUT /api/user-queries/:queryId/status` - Update query status
- `DELETE /api/user-queries/:queryId` - Delete query

## Database Models

### Home

```typescript
{
  slider: {
    autoplay: boolean,
    interval: number,
    slides: Array<Slide>
  }
}
```

### Nav

```typescript
{
  navbar: {
    logo: { src, alt, link },
    items: Array<NavItem>
  }
}
```

### Footer

```typescript
{
  logo: { src, alt },
  newsletter: { text, placeholder, submitIcon },
  socials: { title, items },
  links: Array<{ title, links }>,
  copyright: string
}
```

### Contact

```typescript
{
  hero: { title, backgroundImage },
  offices: Array<Office>,
  form: { title, subtitle }
}
```

### OfficeLocations

```typescript
{
  bgImage: string,
  locations: Array<Location>
}
```

### UserQuery

```typescript
{
  name: string,
  email: string,
  phone?: string,
  subject: string,
  message: string,
  status: 'new' | 'replied' | 'closed',
  response?: string,
  respondedBy?: string,
  respondedAt?: Date
}
```

## Project Structure

```
backend/
├── src/
│   ├── config/
│   │   └── database.ts
│   ├── controllers/
│   │   ├── homeController.ts
│   │   ├── navController.ts
│   │   ├── footerController.ts
│   │   ├── contactController.ts
│   │   ├── officeLocationsController.ts
│   │   └── userQueryController.ts
│   ├── models/
│   │   ├── Home.ts
│   │   ├── Nav.ts
│   │   ├── Footer.ts
│   │   ├── Contact.ts
│   │   ├── OfficeLocation.ts
│   │   └── UserQuery.ts
│   ├── routes/
│   │   ├── homeRoutes.ts
│   │   ├── navRoutes.ts
│   │   ├── footerRoutes.ts
│   │   ├── contactRoutes.ts
│   │   ├── officeLocationsRoutes.ts
│   │   └── userQueryRoutes.ts
│   ├── seeders/
│   │   └── seed.ts
│   └── index.ts
├── dist/
├── .env.example
├── package.json
└── tsconfig.json
```

## Environment Variables

Create a `.env` file with the following variables:

```
MONGODB_URI=mongodb://localhost:27017/dudigital
PORT=5000
NODE_ENV=development
JWT_SECRET=your_jwt_secret_key_here
ADMIN_EMAIL=admin@dudigitalglobal.com
ADMIN_PASSWORD=admin@123456
```

## Next Steps

1. **Frontend Integration** - Create a React/Next.js admin panel frontend
2. **Authentication** - Implement JWT-based authentication
3. **File Upload** - Add file upload support for images
4. **Validation** - Add request validation middleware
5. **Logging** - Implement comprehensive logging system

## Development

To add a new feature:

1. Create a model in `src/models/`
2. Create a controller in `src/controllers/`
3. Create routes in `src/routes/`
4. Import and use in `src/index.ts`

## Support

For issues or questions, contact: info@dudigitalglobal.com
