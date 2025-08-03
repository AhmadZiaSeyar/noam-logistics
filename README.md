# Noam Logistics Dashboard - Home-Based Practical Challenge

A mini logistics coordination platform demonstrating role-based views for drivers and shippers, built as part of a practical coding challenge using mock data and clean UI/UX design.

## 🚀 Features

### Core Functionality

- **Role-Based Dashboard**: Switch between Driver and Shipper views with different permissions
- **Trip Management**: Create, view, and update trip statuses (Assigned → In Transit → Delivered)
- **Proof of Delivery**: Upload and view delivery confirmation images
- **Real-time Updates**: Status changes reflect immediately across the interface
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices

### Driver Features

- View assigned trips only
- Update trip status from Assigned to In Transit to Delivered
- Upload proof of delivery images for completed trips
- Track personal delivery progress

### Shipper Features

- View all trips across all drivers
- Monitor delivery statuses in real-time
- Access proof of delivery images
- Comprehensive logistics oversight

## 🛠 Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS, Shadcn/ui components
- **Backend**: Next.js API Routes
- **Database**: PostgreSQL with Prisma ORM
- **Icons**: Lucide React
- **File Upload**: Native FormData API

## 📦 Installation & Setup

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd noam-logistics
   ```

2. **Install dependencies**

   ```bash
   pnpm install
   ```

3. **Set up the database**

   ```bash
   # Start Prisma development server
   npx prisma dev

   # Run migrations
   npx prisma migrate dev --name init

   # Seed the database (optional)
   pnpm db:seed
   ```

4. **Start the development server**

   ```bash
   pnpm dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3001](http://localhost:3001)

## 🗄 Database Schema

The application uses a PostgreSQL database with the following models:

- **User**: Stores user information and roles (Driver/Shipper)
- **Trip**: Contains trip details, status, and assignments
- **ProofOfDelivery**: Manages uploaded delivery confirmation images

## 🎯 Usage

### Role Switching

Use the toggle switch in the top-right corner to switch between Driver and Shipper roles. This simulates different user types accessing the system.

### Driver Workflow

1. View your assigned trips
2. Click "Start Trip" to change status to In Transit
3. Click "Mark Delivered" when delivery is complete
4. Upload proof of delivery image

### Shipper Workflow

1. View all trips across the organization
2. Monitor real-time status updates
3. Click "View POD" to see delivery confirmations

## 🤖 AI Usage Documentation

This project was developed with significant AI assistance, which proved invaluable in several areas:

### Where AI Helped

1. **Database Schema Design**: AI helped design the Prisma schema with proper relationships and constraints
2. **API Route Structure**: Generated RESTful API endpoints with proper error handling
3. **TypeScript Interfaces**: Created comprehensive type definitions for type safety
4. **UI Component Architecture**: Structured reusable components with proper prop types
5. **Responsive Design**: Implemented mobile-first responsive layouts
6. **Error Handling**: Added comprehensive fallback mechanisms for API failures

### What Was Useful

- **Code Generation**: Rapid prototyping of components and API routes
- **Best Practices**: Ensured proper Next.js patterns and React hooks usage
- **Documentation**: Generated comprehensive inline comments and documentation
- **Problem Solving**: Helped debug complex state management issues

### How I Avoided Copying Blindly

- **Understanding First**: Reviewed and understood each generated code block before implementation
- **Customization**: Modified AI suggestions to fit specific project requirements
- **Testing**: Manually tested all functionality to ensure proper behavior
- **Code Review**: Analyzed generated code for potential improvements and optimizations
- **Integration**: Ensured all AI-generated components worked cohesively together

## 🏗 Architecture Decisions

### Frontend Architecture

- **Component-Based**: Modular, reusable UI components
- **State Management**: React hooks for local state, API calls for data persistence
- **Error Boundaries**: Graceful fallback to mock data when API fails
- **Loading States**: User feedback during async operations

### Backend Architecture

- **API-First Design**: RESTful endpoints for all data operations
- **Database-First**: Prisma schema drives the data model
- **File Handling**: Secure file upload with validation
- **Error Handling**: Comprehensive error responses with proper HTTP status codes

### UX/UI Decisions

- **Role-Based Views**: Clear visual distinction between user types
- **Progressive Enhancement**: Works with mock data even if database is unavailable
- **Responsive Design**: Mobile-first approach with breakpoint optimization
- **Visual Feedback**: Loading states, success/error indicators, and smooth transitions

## 🧪 Testing

The application includes comprehensive error handling and fallback mechanisms:

- **API Fallbacks**: Mock data is used when API calls fail
- **File Upload Fallbacks**: Local preview when server upload fails
- **Loading States**: Visual feedback during all async operations
- **Error Boundaries**: Graceful degradation for unexpected errors

## 🚀 Deployment

The application is ready for deployment on platforms like Vercel, Netlify, or any Node.js hosting service:

1. Set up environment variables for production
2. Configure PostgreSQL database
3. Run build command: `pnpm build`
4. Deploy the built application

## 📝 Future Enhancements

- **Authentication**: Implement proper user authentication with NextAuth.js
- **Real-time Updates**: Add WebSocket support for live status updates
- **Advanced Filtering**: Trip filtering by date, status, driver, etc.
- **Analytics Dashboard**: Trip completion metrics and performance analytics
- **Mobile App**: React Native companion app for drivers
- **Notifications**: Email/SMS notifications for status changes

## 🤝 Contributing

This project demonstrates modern full-stack development practices and is open for improvements and suggestions.

## 📄 License

This project is created for demonstration purposes as part of a technical interview challenge.
