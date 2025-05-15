# Chore Chart App - Architecture Diagram

## System Architecture Overview

```mermaid
graph TB
    subgraph Frontend["Frontend Layer"]
        React["React 19"]
        TanStackQuery["TanStack Query"]
        TanStackRouter["TanStack Router"]
        ShadCN["ShadCN/Origin"]
        Tailwind["Tailwind CSS"]

        React --> TanStackQuery
        React --> TanStackRouter
        React --> ShadCN
        ShadCN --> Tailwind
    end

    subgraph Backend["Backend Layer"]
        NodeJS["Node.js"]
        ExpressHono["Express/Hono"]
        Drizzle["Drizzle ORM"]
        JWT["JWT Auth"]

        NodeJS --> ExpressHono
        ExpressHono --> JWT
        ExpressHono --> Drizzle
    end

    subgraph Database["Database Layer"]
        PostgreSQL["PostgreSQL"]
    end

    subgraph Container["Container Layer"]
        Docker["Docker"]
    end

    %% Frontend to Backend Communication
    TanStackQuery -->|HTTP/REST| ExpressHono
    TanStackRouter -->|Client-side Routing| React

    %% Backend to Database Communication
    Drizzle -->|ORM| PostgreSQL

    %% Containerization
    Docker -->|Containerizes| Frontend
    Docker -->|Containerizes| Backend

    %% Styling Dependencies
    classDef frontend fill:#e1f5fe,stroke:#01579b
    classDef backend fill:#f3e5f5,stroke:#4a148c
    classDef database fill:#e8f5e9,stroke:#1b5e20
    classDef container fill:#fff3e0,stroke:#e65100

    class Frontend frontend
    class Backend backend
    class Database database
    class Container container
```

## Component Descriptions

### Frontend Layer

- **React 19**: Core UI framework
- **TanStack Query**: Data fetching and state management
- **TanStack Router**: Client-side routing solution
- **ShadCN/Origin**: UI component library
- **Tailwind CSS**: Utility-first CSS framework

### Backend Layer

- **Node.js**: Runtime environment
- **Express/Hono**: Web framework
- **Drizzle ORM**: Database ORM
- **JWT Auth**: Authentication system

### Database Layer

- **PostgreSQL**: Production-grade relational database

### Container Layer

- **Docker**: Containerization platform

## Data Flow

1. Frontend makes HTTP requests through TanStack Query
2. Backend processes requests through Express/Hono
3. Drizzle ORM handles database operations
4. JWT handles authentication/authorization
5. Data flows back to frontend through REST API
