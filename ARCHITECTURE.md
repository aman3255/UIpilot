# 🏗️ UIpilot Architecture Diagram

## System Overview

UIpilot is a full-stack web application with a modern microservices-inspired architecture that separates concerns between frontend, backend, and external services.

```mermaid
graph TB
    subgraph "🌐 Client Layer"
        A[User Browser]
        B[Mobile Device]
        C[Desktop App]
    end

    subgraph "🎨 Frontend (React/TypeScript)"
        D[React App]
        E[Code Editor]
        F[Live Preview]
        G[Chat Interface]
    end

    subgraph "⚙️ Backend (Node.js/Express)"
        H[API Gateway]
        I[Auth Controller]
        J[AI Controller]
        K[Session Controller]
        L[Message Controller]
    end

    subgraph "🗄️ Database Layer"
        M[(MongoDB)]
        N[Users Collection]
        O[Chat Sessions]
        P[Messages]
    end

    subgraph "🤖 External Services"
        Q[Google Gemini AI]
        R[CodeSandbox Sandpack]
        S[JWT Token Service]
    end

    %% Client to Frontend
    A --> D
    B --> D
    C --> D

    %% Frontend Components
    D --> E
    D --> F
    D --> G

    %% Frontend to Backend
    E --> H
    F --> H
    G --> H

    %% Backend Controllers
    H --> I
    H --> J
    H --> K
    H --> L

    %% Backend to Database
    I --> M
    J --> M
    K --> M
    L --> M

    %% Database Collections
    M --> N
    M --> O
    M --> P

    %% External Integrations
    J --> Q
    F --> R
    I --> S

    classDef frontend fill:#61DAFB,stroke:#333,stroke-width:2px,color:#000
    classDef backend fill:#339933,stroke:#333,stroke-width:2px,color:#fff
    classDef database fill:#47A248,stroke:#333,stroke-width:2px,color:#fff
    classDef external fill:#4285F4,stroke:#333,stroke-width:2px,color:#fff
    classDef client fill:#FF6B6B,stroke:#333,stroke-width:2px,color:#fff

    class D,E,F,G frontend
    class H,I,J,K,L backend
    class M,N,O,P database
    class Q,R,S external
    class A,B,C client
```

## 📊 Detailed Component Architecture

### Frontend Architecture

```mermaid
graph LR
    subgraph "🎨 React Frontend"
        A[App.tsx]
        B[Router]
        C[AuthProvider]
        
        subgraph "📄 Pages"
            D[Home Page]
            E[Code Editor Page]
            F[About Page]
            G[Blog Page]
        end
        
        subgraph "🧩 Components"
            H[Navbar]
            I[CodeGenerator]
            J[ReactCodeEditor]
            K[ChatSessions]
            L[AuthModal]
            M[Hero]
            N[Footer]
        end
        
        subgraph "🎣 Custom Hooks"
            O[useAuth]
            P[useAI]
        end
        
        subgraph "📦 External Libraries"
            Q[Sandpack]
            R[CodeMirror]
            S[React Router]
            T[Tailwind CSS]
        end
    end

    A --> B
    A --> C
    B --> D
    B --> E
    B --> F
    B --> G
    
    E --> I
    I --> J
    I --> K
    A --> H
    A --> L
    D --> M
    A --> N
    
    I --> O
    I --> P
    J --> Q
    J --> R
    B --> S
    A --> T

    classDef pages fill:#FFD93D,stroke:#333,stroke-width:2px
    classDef components fill:#6BCF7F,stroke:#333,stroke-width:2px
    classDef hooks fill:#4D96FF,stroke:#333,stroke-width:2px
    classDef libs fill:#FF6B9D,stroke:#333,stroke-width:2px

    class D,E,F,G pages
    class H,I,J,K,L,M,N components
    class O,P hooks
    class Q,R,S,T libs
```

### Backend Architecture

```mermaid
graph TB
    subgraph "⚙️ Node.js Backend"
        A[server.js]
        B[Express App]
        C[CORS Middleware]
        D[Request Logger]
        
        subgraph "🛣️ API Routes"
            E[v1 Router]
            F[Auth Router]
            G[AI Router]
        end
        
        subgraph "🎮 Controllers"
            H[Auth Controller]
            I[AI Controller]
            J[Chat Session Controller]
            K[Message Controller]
            L[Code Preview Controller]
        end
        
        subgraph "🔧 Middlewares"
            M[Auth Middleware]
            N[Request Logger]
            O[Error Handler]
        end
        
        subgraph "📊 Models"
            P[User Model]
            Q[Chat Session Model]
            R[Message Model]
        end
        
        subgraph "🗄️ Database"
            S[Mongoose ODM]
            T[MongoDB Connection]
        end
        
        subgraph "🤖 External APIs"
            U[Google Gemini AI]
            V[JWT Service]
        end
    end

    A --> B
    B --> C
    B --> D
    B --> E
    
    E --> F
    E --> G
    
    F --> H
    G --> I
    G --> J
    G --> K
    G --> L
    
    H --> M
    I --> M
    J --> M
    K --> M
    L --> M
    
    H --> P
    I --> Q
    I --> R
    J --> Q
    K --> R
    L --> R
    
    P --> S
    Q --> S
    R --> S
    S --> T
    
    I --> U
    H --> V

    classDef routes fill:#FF9F43,stroke:#333,stroke-width:2px
    classDef controllers fill:#54A0FF,stroke:#333,stroke-width:2px
    classDef middlewares fill:#5F27CD,stroke:#333,stroke-width:2px
    classDef models fill:#00D2D3,stroke:#333,stroke-width:2px
    classDef external fill:#FF6B6B,stroke:#333,stroke-width:2px

    class E,F,G routes
    class H,I,J,K,L controllers
    class M,N,O middlewares
    class P,Q,R models
    class U,V external
```

## 🔄 Data Flow Architecture

### User Authentication Flow

```mermaid
sequenceDiagram
    participant U as User
    participant F as Frontend
    participant B as Backend
    participant DB as MongoDB
    participant JWT as JWT Service

    U->>F: Click Login/Signup
    F->>B: POST /api/v1/auth/login
    B->>DB: Query User Collection
    DB-->>B: User Data
    B->>B: Verify Password (bcrypt)
    B->>JWT: Generate JWT Token
    JWT-->>B: JWT Token
    B-->>F: Success Response + Token
    F->>F: Store Token (localStorage)
    F-->>U: Redirect to Code Editor
```

### AI Code Generation Flow

```mermaid
sequenceDiagram
    participant U as User
    participant F as Frontend
    participant B as Backend
    participant DB as MongoDB
    participant AI as Google Gemini
    participant S as Sandpack

    U->>F: Enter Code Prompt
    F->>B: POST /api/v1/ai/generate
    B->>DB: Create/Update Chat Session
    B->>DB: Save User Message
    B->>AI: Send Enhanced Prompt
    AI-->>B: Generated Code Response
    B->>B: Extract & Clean Code
    B->>DB: Save AI Message + Code
    B-->>F: Return Generated Code
    F->>F: Update Chat Interface
    F->>S: Send Code to Sandpack
    S-->>F: Live Preview
    F-->>U: Display Code + Preview
```

### Chat Session Management Flow

```mermaid
sequenceDiagram
    participant U as User
    participant F as Frontend
    participant B as Backend
    participant DB as MongoDB

    U->>F: Create New Session
    F->>B: POST /api/v1/ai/sessions?action=create
    B->>DB: Create Chat Session
    DB-->>B: Session Created
    B-->>F: Session Data
    F->>F: Update Session List
    F-->>U: Show New Session

    U->>F: Select Session
    F->>B: GET /api/v1/ai/messages?sessionId={uuid}
    B->>DB: Query Messages
    DB-->>B: Messages Array
    B-->>F: Messages Data
    F->>F: Load Chat History
    F-->>U: Display Messages
```

## 🗄️ Database Schema Architecture

```mermaid
erDiagram
    USER {
        ObjectId _id PK
        String fullName
        String email UK
        String password
        Date createdAt
        Date updatedAt
    }

    CHAT_SESSION {
        ObjectId _id PK
        String uuid UK
        String title
        ObjectId user FK
        String latestMessage
        Date createdAt
        Date updatedAt
    }

    MESSAGE {
        ObjectId _id PK
        ObjectId chatSession FK
        String sender
        String content
        String code
        String htmlPreview
        Date createdAt
        Date updatedAt
    }

    USER ||--o{ CHAT_SESSION : "has many"
    CHAT_SESSION ||--o{ MESSAGE : "has many"
```

## 🔐 Security Architecture

```mermaid
graph TB
    subgraph "🔒 Security Layers"
        A[Client-Side Security]
        B[Network Security]
        C[Application Security]
        D[Database Security]
    end

    subgraph "🛡️ Security Measures"
        A1[Input Validation]
        A2[XSS Prevention]
        A3[CSRF Protection]
        
        B1[HTTPS/SSL]
        B2[CORS Configuration]
        B3[Rate Limiting]
        
        C1[JWT Authentication]
        C2[Password Hashing]
        C3[Request Validation]
        
        D1[Data Encryption]
        D2[Access Control]
        D3[Backup Strategy]
    end

    A --> A1
    A --> A2
    A --> A3
    
    B --> B1
    B --> B2
    B --> B3
    
    C --> C1
    C --> C2
    C --> C3
    
    D --> D1
    D --> D2
    D --> D3

    classDef security fill:#FF6B6B,stroke:#333,stroke-width:2px,color:#fff
    classDef measures fill:#4ECDC4,stroke:#333,stroke-width:2px

    class A,B,C,D security
    class A1,A2,A3,B1,B2,B3,C1,C2,C3,D1,D2,D3 measures
```

## 🚀 Deployment Architecture

```mermaid
graph TB
    subgraph "🌐 Production Environment"
        A[Load Balancer]
        B[CDN]
        
        subgraph "🎨 Frontend Deployment"
            C[Vercel/Netlify]
            D[React Build]
            E[Static Assets]
        end
        
        subgraph "⚙️ Backend Deployment"
            F[Heroku/Railway/Render]
            G[Node.js Server]
            H[Express API]
        end
        
        subgraph "🗄️ Database"
            I[MongoDB Atlas]
            J[Database Cluster]
        end
        
        subgraph "🤖 External Services"
            K[Google Gemini API]
            L[CodeSandbox API]
        end
    end

    A --> B
    B --> C
    C --> D
    D --> E
    
    A --> F
    F --> G
    G --> H
    
    H --> I
    I --> J
    
    H --> K
    D --> L

    classDef deployment fill:#FF9F43,stroke:#333,stroke-width:2px
    classDef service fill:#54A0FF,stroke:#333,stroke-width:2px

    class A,B,C,F,I deployment
    class D,E,G,H,J,K,L service
```

## 📊 Performance Architecture

### Caching Strategy

```mermaid
graph LR
    subgraph "⚡ Performance Layers"
        A[Browser Cache]
        B[CDN Cache]
        C[Application Cache]
        D[Database Cache]
    end

    subgraph "💾 Cache Types"
        A1[Static Assets]
        A2[API Responses]
        A3[User Sessions]
        A4[Code Previews]
    end

    A --> A1
    B --> A1
    B --> A2
    C --> A3
    C --> A4
    D --> A2

    classDef cache fill:#A8E6CF,stroke:#333,stroke-width:2px
    classDef types fill:#FFB3BA,stroke:#333,stroke-width:2px

    class A,B,C,D cache
    class A1,A2,A3,A4 types
```

## 🔧 Technology Stack Architecture

```mermaid
graph TB
    subgraph "🎨 Frontend Stack"
        A[React 18]
        B[TypeScript]
        C[Vite]
        D[Tailwind CSS]
        E[React Router]
        F[Lucide React]
    end

    subgraph "⚙️ Backend Stack"
        G[Node.js]
        H[Express.js]
        I[MongoDB]
        J[Mongoose]
        K[JWT]
        L[bcrypt]
    end

    subgraph "🤖 AI & Code"
        M[Google Gemini]
        N[Sandpack]
        O[CodeMirror]
        P[Monaco Editor]
    end

    subgraph "🛠️ Development"
        Q[ESLint]
        R[Prettier]
        S[Nodemon]
        T[Git]
    end

    A --> B
    B --> C
    C --> D
    D --> E
    E --> F
    
    G --> H
    H --> I
    I --> J
    J --> K
    K --> L
    
    M --> N
    N --> O
    O --> P
    
    Q --> R
    R --> S
    S --> T

    classDef frontend fill:#61DAFB,stroke:#333,stroke-width:2px
    classDef backend fill:#339933,stroke:#333,stroke-width:2px,color:#fff
    classDef ai fill:#4285F4,stroke:#333,stroke-width:2px,color:#fff
    classDef dev fill:#FF6B6B,stroke:#333,stroke-width:2px,color:#fff

    class A,B,C,D,E,F frontend
    class G,H,I,J,K,L backend
    class M,N,O,P ai
    class Q,R,S,T dev
```

## 📈 Scalability Architecture

```mermaid
graph TB
    subgraph "📈 Scalability Strategy"
        A[Horizontal Scaling]
        B[Vertical Scaling]
        C[Load Balancing]
        D[Database Sharding]
    end

    subgraph "🔄 Scaling Components"
        A1[Multiple API Instances]
        A2[CDN Distribution]
        A3[Database Replicas]
        A4[Cache Clusters]
        
        B1[Server Resources]
        B2[Database Resources]
        B3[Memory Optimization]
        B4[CPU Optimization]
        
        C1[Round Robin]
        C2[Least Connections]
        C3[Health Checks]
        C4[Failover]
        
        D1[User-based Sharding]
        D2[Session-based Sharding]
        D3[Geographic Sharding]
        D4[Time-based Sharding]
    end

    A --> A1
    A --> A2
    A --> A3
    A --> A4
    
    B --> B1
    B --> B2
    B --> B3
    B --> B4
    
    C --> C1
    C --> C2
    C --> C3
    C --> C4
    
    D --> D1
    D --> D2
    D --> D3
    D --> D4

    classDef strategy fill:#FF9F43,stroke:#333,stroke-width:2px
    classDef components fill:#54A0FF,stroke:#333,stroke-width:2px

    class A,B,C,D strategy
    class A1,A2,A3,A4,B1,B2,B3,B4,C1,C2,C3,C4,D1,D2,D3,D4 components
```

---

## 🎯 Architecture Principles

### 1. **Separation of Concerns**
- Frontend handles UI/UX and user interactions
- Backend manages business logic and data persistence
- External services provide specialized functionality

### 2. **Scalability**
- Stateless API design for horizontal scaling
- Database indexing for performance optimization
- Caching strategies for frequently accessed data

### 3. **Security**
- JWT-based authentication with secure token management
- Input validation and sanitization at all layers
- HTTPS enforcement and CORS configuration

### 4. **Maintainability**
- Modular component architecture
- Clear API documentation and type safety
- Consistent coding standards and linting

### 5. **Performance**
- Lazy loading and code splitting
- Optimized database queries
- CDN integration for static assets

---

*This architecture diagram provides a comprehensive view of the UIpilot system, showing how all components interact to create a seamless AI-powered code generation experience.* 