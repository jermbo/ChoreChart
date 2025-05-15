# Chore Chart App

### Overview

The Chore Chart app is an innovative solution designed to help parents manage their children's allowance money by assigning daily/weekly chores, tracking completion status, and rewarding good behavior. This application aims to create a fun and engaging way for kids to earn their allowance while promoting responsibility and learning valuable life skills.

## Features

### Parent Features

- Create an account with unique login credentials
- Add children's profiles with customizable names and avatars
- Assign daily/weekly chores with corresponding dollar amounts
  - Choose from a pre-defined list of tasks or create custom ones
  - Set the frequency (daily, weekly) and duration for each chore
- Track progress: view completed tasks, earned allowance money, and child performance

### Child Features

- Log in to their account using their unique username and password
- View assigned chores with corresponding dollar amounts
  - Sort by task type (e.g., household, academic)
  - Filter by frequency (daily, weekly) or duration
- Mark completed tasks: earn allowance money for each finished chore
  - Track progress towards the base allowance amount

### Reward System

- Earn extra money for completing tasks above and beyond the minimum requirements
- Visual representation of earned allowance money (e.g., a virtual piggy bank)

## Technical Requirements

### Frontend

- Built using React 19 with TanStack Query for data fetching and manipulation
  - Utilize TanStack Router for client-side routing
  - Integrate ShadCN/Origin/Tailwind CSS for a consistent design aesthetic across the application
- Dockerized containerization ensures portability and seamless deployment

### Backend

- Built using Node.js (newish) with Express/Hono (newish)
  - RESTful API architecture for efficient data exchange between client-side and server-side components
  - Drizzle ORM with PostgreSQL for robust data persistence and scalability

## Authentication

- Optional integration of JWT auth to secure user accounts and prevent unauthorized access

### Future Features

---

- Push notifications: parents receive updates when children complete or miss assignments
  - Out-of-scope for MVP, but planned for future development
- Multi-level chore hierarchy: ability to create sub-chores and categorize tasks
  - Planned for future development to enhance the application's functionality

## Getting Started

To get started with this project, please ensure you have:

1. Node.js (newish) installed on your machine
2. Docker installed and running in the background
3. PostgreSQL installed and configured

Clone the repository using `git clone https://github.com/your-username/chore-chart-app.git` or download it from GitHub.

## Acknowledgments

We appreciate any contributions, feedback, or suggestions that can help improve this application!
