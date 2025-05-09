# Chore Chart App - User Flows

## 1. Authentication Flows

### 1.1 Parent Registration

```mermaid
graph TD
    A[Landing Page] --> B[Click Register]
    B --> C[Enter Email & Password]
    C --> D[Verify Email]
    D --> E[Create Parent Profile]
    E --> F[Parent Dashboard]
```

### 1.2 Parent Login

```mermaid
graph TD
    A[Landing Page] --> B[Click Login]
    B --> C[Enter Credentials]
    C --> D{Valid?}
    D -->|Yes| E[Parent Dashboard]
    D -->|No| F[Show Error]
    F --> B
```

### 1.3 Child Login

```mermaid
graph TD
    A[Landing Page] --> B[Click Child Login]
    B --> C[Enter Username & Password]
    C --> D{Valid?}
    D -->|Yes| E[Child Dashboard]
    D -->|No| F[Show Error]
    F --> B
```

## 2. Parent Dashboard Flows

### 2.1 Child Profile Management

```mermaid
graph TD
    A[Dashboard] --> B[Click Manage Children]
    B --> C[Add New Child]
    C --> D[Enter Child Details]
    D --> E[Upload Avatar]
    E --> F[Set Base Allowance]
    F --> G[Save Profile]
    G --> H[Return to Dashboard]
```

### 2.2 Chore Management

```mermaid
graph TD
    A[Dashboard] --> B[Click Manage Chores]
    B --> C[Select Child]
    C --> D[Add New Chore]
    D --> E[Set Chore Details]
    E --> F[Assign Dollar Amount]
    F --> G[Set Frequency]
    G --> H[Save Chore]
    H --> I[Return to Dashboard]
```

### 2.3 Chore Verification

```mermaid
graph TD
    A[Dashboard] --> B[View Pending Verifications]
    B --> C[Select Chore]
    C --> D{Approve?}
    D -->|Yes| E[Update Allowance]
    D -->|No| F[Add Feedback]
    E --> G[Return to Dashboard]
    F --> G
```

## 3. Child Dashboard Flows

### 3.1 View Chores

```mermaid
graph TD
    A[My Chores Page] --> B[View Current Week Chores]
    B --> C[Filter by Status]
    C --> D[Sort by Amount]
    D --> E[View Chore Details]
    E --> F[Complete Chore]
    F --> G[Return to My Chores]
```

### 3.2 Complete Chore

```mermaid
graph TD
    A[My Chores Page] --> B[Select Chore]
    B --> C[Click Complete]
    C --> D[Add Completion Notes]
    D --> E[Submit for Verification]
    E --> F[Return to My Chores]
```

### 3.3 Track Progress

```mermaid
graph TD
    A[Dashboard Page] --> B[View Historical Data]
    B --> C[View Past Chores]
    C --> D[View Achievement History]
    D --> E[View Allowance History]
```

## 4. Error Handling Flows

### 4.1 Authentication Errors

```mermaid
graph TD
    A[Login Attempt] --> B{Valid Credentials?}
    B -->|No| C[Show Error Message]
    C --> D[Clear Password Field]
    D --> E[Return to Login]
    B -->|Yes| F[Proceed to Dashboard]
```

### 4.2 Chore Completion Errors

```mermaid
graph TD
    A[Submit Chore] --> B{Valid Submission?}
    B -->|No| C[Show Error Message]
    C --> D[Highlight Required Fields]
    D --> E[Return to Form]
    B -->|Yes| F[Proceed to Verification]
```

## 5. Navigation Structure

### 5.1 Parent Navigation

- Dashboard
  - Overview of All Children
  - Pending Verifications
  - Recent Activity
  - Quick Actions
- Children
  - Child Profiles
  - Individual Progress
  - Allowance Management
  - Achievement Tracking
- Chores
  - Chore Templates
  - Active Chores
  - Chore History
  - Performance Analytics
- Settings
  - Account Management
  - Notification Preferences
  - Display Settings
  - System Configuration

### 5.2 Child Navigation

- My Chores
  - Current Week View
  - Active Chores
  - Progress Overview
  - Recent Achievements
- Dashboard
  - Historical Chores
  - Achievement History
  - Allowance History
  - Performance Trends
- Settings
  - Profile Customization
  - Notification Preferences
  - Display Preferences

## 6. State Transitions

### 6.1 Chore States

```mermaid
stateDiagram-v2
    [*] --> Assigned
    Assigned --> InProgress
    InProgress --> Completed
    Completed --> Verified
    Completed --> Rejected
    Rejected --> InProgress
    Verified --> [*]
```

### 6.2 Allowance States

```mermaid
stateDiagram-v2
    [*] --> Pending
    Pending --> Approved
    Pending --> Rejected
    Approved --> Paid
    Rejected --> Pending
    Paid --> [*]
```

## 7. Data Flow

### 7.1 Chore Completion

1. Child marks chore complete
2. System updates chore status
3. Parent receives verification request
4. Parent verifies completion
5. System updates allowance balance
6. Dashboard refreshes with new data

### 7.2 Allowance Updates

1. Parent sets base allowance
2. System calculates potential earnings
3. Child completes chores
4. System updates running total
5. Parent verifies completion
6. System finalizes allowance amount
