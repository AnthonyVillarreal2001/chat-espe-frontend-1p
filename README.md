# Chat ESPE - Frontend React + TypeScript + Socket.IO 🇪🇨

Frontend oficial del proyecto **Chat en Tiempo Real** desarrollado para el **1er Parcial** de la **ESPE** (Escuela Superior Politécnica del Ejército).

![React](https://img.shields.io/badge/React-18.3-blue)
![Vite](https://img.shields.io/badge/Vite-5.4-green)
![TypeScript](https://img.shields.io/badge/TypeScript-5.5-blue)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4-purple)
![Socket.IO](https://img.shields.io/badge/Socket.IO_Client-4.7-red)
![ESPE](https://img.shields.io/badge/Proyecto-ESPE_2025-success)

**Link del Backend:** https://github.com/AnthonyVillarreal2001/chat-espe-backend-1p  
**Link del Frontend (este repo):** https://github.com/AnthonyVillarreal2001/chat-espe-frontend-1p

## Características
- Login de administrador (credenciales fijas)
- Creación de salas (texto o multimedia) con PIN
- Unirse a salas con room_id + PIN + nickname
- Chat en tiempo real (mensajes y archivos)
- Vista previa de imágenes y archivos recibidos
- Lista de usuarios conectados
- Notificaciones toast (éxito/error)
- Bloqueo automático si ya estás conectado en otra pestaña
- Diseño 100% responsive (móvil y escritorio)
- Totalmente en **TypeScript** (código limpio y seguro)

## Instalación y Ejecución (2 comandos)

```bash
# 1. Clonar el repositorio
git clone https://github.com/AnthonyVillarreal2001/chat-espe-frontend-1p.git
cd chat-espe-frontend-1p

# 2. Instalar dependencias
npm install

# 3. ¡Levantar el frontend!
npm run dev