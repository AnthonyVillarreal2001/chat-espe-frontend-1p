# 🚀 Chat Seguro ESPE - Frontend

## 📋 Informe del Proyecto

**Fecha:** 17 de Noviembre, 2025  
**Versión:** 1.0.0  
**Desarrollador:** Estudiante ESPE  
**Materia:** Aplicaciones Distribuidas - Primer Parcial  

---

## 🎯 Descripción del Proyecto

**Chat Seguro ESPE** es una aplicación de chat en tiempo real que permite a los usuarios crear y unirse a salas de conversación seguras. El sistema está dividido en dos componentes principales: un frontend desarrollado en React + TypeScript y un backend en Python con Flask-SocketIO.

### 🌟 Características Principales

- ✅ **Salas de Chat Seguras** - Sistema de PIN para acceso controlado
- ✅ **Comunicación en Tiempo Real** - WebSockets con Socket.IO
- ✅ **Panel de Administración** - Gestión completa de salas
- ✅ **Soporte Multimedia** - Envío de archivos en salas multimedia
- ✅ **Interfaz Responsive** - Diseño adaptable a dispositivos móviles
- ✅ **Dockerización Completa** - Despliegue containerizado
- ✅ **Testing Robusto** - 82% de cobertura de código

---

## 🏗️ Arquitectura del Sistema

### Frontend (React + TypeScript)
```
src/
├── components/          # Componentes reutilizables
│   ├── AdminLogin.tsx   # Login de administrador
│   ├── ChatRoom.tsx     # Sala de chat principal
│   └── CreateRoom.tsx   # Formulario crear sala
├── pages/               # Páginas principales
│   ├── Home.tsx         # Página de inicio
│   ├── AdminPanel.tsx   # Panel administrativo
│   └── UserJoin.tsx     # Unirse a sala
├── types/               # Definiciones TypeScript
│   └── index.ts         # Interfaces de datos
├── test/                # Configuración testing
└── socket.ts            # Configuración Socket.IO
```

### Tecnologías Utilizadas
- **React 19.1.1** - Librería UI moderna
- **TypeScript 5.9.3** - Tipado estático
- **Vite 7.1.7** - Build tool rápido
- **Socket.IO Client 4.8.1** - WebSockets
- **React Router 7.9.6** - Enrutamiento SPA
- **Axios 1.13.1** - Cliente HTTP
- **Tailwind CSS 4.1.16** - Framework CSS

---

## 🧪 Sistema de Testing

### Cobertura de Código: **82.03%** 🎉

| Categoría  | Cobertura | Mejora |
|------------|-----------|---------|
| Statements | 82.03%    | +22.07% |
| Branches   | 93.13%    | +2.23%  |
| Functions  | 81.48%    | +16.48% |
| Lines      | 82.03%    | +22.07% |

### Frameworks de Testing
- **Vitest 2.1.5** - Test runner moderno
- **@testing-library/react** - Testing utilities
- **@vitest/coverage-v8** - Reporte de cobertura
- **jsdom** - Entorno DOM para tests

### Tests Implementados
- ✅ **36 tests pasando** (0 fallando)
- ✅ **8 archivos de test** cubriendo componentes críticos
- ✅ **Mocks robustos** para Socket.IO y APIs
- ✅ **Testing de interacciones** de usuario

---

## 🐳 Configuración Docker

### Estructura de Contenedores
```yaml
services:
  mongo:     # Base de datos MongoDB
  redis:     # Cache y sesiones  
  backend:   # API Flask-SocketIO
  frontend:  # Aplicación React
```

### Variables de Entorno
```env
# Frontend (.env)
VITE_BACKEND_URL=http://localhost:5000

# Backend (.env)
MONGO_HOST=mongo
REDIS_HOST=redis
SECRET_KEY=supersecreto2025
CORS_ORIGINS=http://localhost:5173
```

---

## 🚀 Instalación y Despliegue

### Prerrequisitos
- Node.js 18+
- Docker & Docker Compose
- Git

### Desarrollo Local

```bash
# 1. Clonar repositorio
git clone <repository-url>
cd chat-espe-frontend-main

# 2. Instalar dependencias
npm install

# 3. Desarrollo
npm run dev                # Servidor desarrollo
npm run test              # Ejecutar tests
npm run test:coverage     # Tests con cobertura
npm run build            # Build producción
```

### Despliegue con Docker

```bash
# En la raíz del proyecto
docker-compose up --build

# Servicios disponibles:
# - Frontend: http://localhost:5173
# - Backend: http://localhost:5000
# - MongoDB: localhost:27017
# - Redis: localhost:6379
```

---

## 📊 Resultados de Testing

### Componentes con 100% Cobertura
- ✅ `AdminLogin.tsx` - Login administrativo
- ✅ `CreateRoom.tsx` - Creación de salas
- ✅ `AdminPanel.tsx` - Panel administración
- ✅ `UserJoin.tsx` - Unirse a salas
- ✅ `App.tsx` - Componente principal
- ✅ `socket.ts` - Configuración WebSockets

### Tests por Componente
```
AdminLogin.test.tsx    - 6 tests (login, validación, errores)
CreateRoom.test.tsx    - 6 tests (formulario, API, errores)
AdminPanel.test.tsx    - 5 tests (navegación, UI, estilos)
UserJoin.test.tsx      - 5 tests (formulario, validación)
ChatRoom.test.tsx      - 4 tests (configuración, mocks)
App.test.tsx          - 2 tests (renderizado, routing)
socket.test.ts        - 2 tests (configuración)
types/index.test.ts   - 6 tests (interfaces TypeScript)
```

---

## 🔧 Scripts Disponibles

| Comando | Descripción |
|---------|-------------|
| `npm run dev` | Inicia servidor desarrollo |
| `npm run build` | Build para producción |
| `npm run preview` | Preview build local |
| `npm run test` | Ejecuta todos los tests |
| `npm run test:coverage` | Tests + reporte cobertura |
| `npm run test:ui` | Interfaz gráfica testing |
| `npm run lint` | Análisis código ESLint |

---

## 📈 Métricas del Proyecto

### Líneas de Código
- **Componentes React:** ~800 líneas
- **Tests:** ~600 líneas
- **Configuración:** ~200 líneas
- **Total:** ~1,600 líneas

### Funcionalidades Implementadas
- 🔐 **Autenticación** - Sistema admin/usuario
- 💬 **Chat Tiempo Real** - Mensajes instantáneos
- 📁 **Envío Archivos** - Soporte multimedia
- 🏠 **Gestión Salas** - CRUD completo
- 📱 **Responsive Design** - Mobile-first
- 🧪 **Testing Completo** - 82% cobertura

---

## 🌐 Flujo de Usuario

### Usuario Regular
1. **Inicio** → Página principal con opciones
2. **Unirse** → Ingresar Room ID, PIN, nickname
3. **Chat** → Comunicación tiempo real
4. **Archivos** → Envío en salas multimedia

### Administrador
1. **Login** → Credenciales admin (admin/espe2025)
2. **Panel** → Vista administración
3. **Crear Sala** → Configurar nombre, PIN, tipo
4. **Gestión** → Monitoreo salas activas

---

## 🔮 Mejoras Futuras

- [ ] **Notificaciones Push** - Alertas navegador
- [ ] **Historial Persistente** - Almacenamiento mensajes
- [ ] **Salas Privadas** - Invitaciones por link
- [ ] **Moderación** - Herramientas admin avanzadas
- [ ] **Themes** - Personalización interfaz
- [ ] **PWA** - Aplicación web progresiva

---

## 📞 Contacto y Soporte

**Desarrollador:** Estudiante ESPE  
**Institución:** Escuela Politécnica del Ejército  
**Materia:** Aplicaciones Distribuidas  
**Periodo:** Primer Parcial 2025  

---

## 📄 Licencia

Este proyecto fue desarrollado con fines académicos para la materia de Aplicaciones Distribuidas en la Universidad ESPE.

---

*Informe generado automáticamente - Noviembre 2025* 🚀
