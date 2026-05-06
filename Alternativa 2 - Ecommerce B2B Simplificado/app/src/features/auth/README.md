# Feature: Auth

Módulo responsable de la autenticación y autorización B2B.

## Responsabilidades
- Login / Logout
- Registro de nuevos clientes (con aprobación manual)
- Gestión de sesiones (JWT)
- Protección de rutas
- Roles: `admin`, `client`

## Estructura
```
auth/
├── components/  → Componentes UI (LoginForm, RegisterForm, etc.)
└── services/    → Lógica de autenticación y manejo de tokens
```
