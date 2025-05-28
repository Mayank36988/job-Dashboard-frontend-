# README for Client-Side of Job Board Application

## Overview
This is the client-side of the Mini Job Board Application built with React. The application allows users to view job listings, add new jobs, and view individual job details.

## Getting Started

### Prerequisites
- Node.js (version 14 or higher)
- npm (Node Package Manager)

### Installation
1. Clone the repository:
   ```
   git clone <repository-url>
   ```
2. Navigate to the client directory:
   ```
   cd job-board/client
   ```
3. Install the dependencies:
   ```
   npm install
   ```

### Running the Application
To start the development server, run:
```
npm start
```
This will start the application on `http://localhost:3000`.

### Folder Structure
- `src/`: Contains the source code for the application.
  - `components/`: Contains reusable components like `JobCard`, `JobForm`, and `JobDetails`.
  - `pages/`: Contains page components like `Home`, `AddJob`, and `JobView`.
  - `App.jsx`: Main application component that sets up routing.
  - `index.js`: Entry point of the application.

### Features
- View all job listings on the homepage.
- Add new job listings via a form.
- View detailed information about individual jobs.

### Deployment
For deployment instructions, please refer to the server-side README.

## Contributing
Contributions are welcome! Please submit a pull request or open an issue for any suggestions or improvements.

## License
This project is licensed under the MIT License.