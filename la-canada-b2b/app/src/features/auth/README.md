# Feature: Auth

Module responsible for B2B authentication and authorization.

## Responsibilities
- Login / Logout
- New client registration (with manual approval)
- Session management (JWT)
- Route protection
- Roles: `admin`, `client`

## Structure
```
auth/
├── components/  → UI Components (LoginForm, RegisterForm, etc.)
└── services/    → Authentication logic and token handling
```
