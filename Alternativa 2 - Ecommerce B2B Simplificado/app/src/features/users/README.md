# Feature: Users

Módulo responsable de la gestión de perfiles de usuarios/clientes B2B.

## Responsabilidades
- Perfil de empresa/cliente
- Gestión de direcciones de envío
- Nivel de cliente (tier) y descuentos asociados
- Administración de usuarios (admin)

## Estructura
```
users/
├── components/  → Componentes UI (UserProfile, AddressForm, etc.)
├── services/    → Lógica de negocio y llamadas a API
├── store/       → Estado global del módulo
└── styles/      → CSS Modules para los componentes de este módulo
```
