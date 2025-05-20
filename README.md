# Bordify Frontend

Це фронтенд частина вебзастосунку **Bordify** — канбан-системи для планування та відстеження завдань. Застосунок реалізовано з використанням React, Redux та повністю адаптовано під десктопи, планшети й мобільні пристрої.

Фронтенд і бекенд повністю розгорнуті на платформі [Render](https://render.com).

## 🌐 Додаткові посилання
- Backend репозиторій доступний за адресою: [https://github.com/qboww/bordify-backend](https://github.com/qboww/bordify-backend)
- Фронтенд live: [https://bordify-frontend.onrender.com](https://bordify-frontend.onrender.com)
- Бекенд API: [https://bordify-backend.onrender.com](https://bordify-backend.onrender.com)
- Uptime Robot: [![Backend Uptime](https://img.shields.io/uptimerobot/status/m800575843-6d54d4dbb3b8823b35a679ac)](https://stats.uptimerobot.com/3H4vuDHzkP)

## 🛠 Стек технологій

- **React** — побудова інтерфейсу користувача
- **Redux Toolkit** — управління глобальним станом
- **React Router v6** — маршрутизація
- **Vite** — збірка та запуск
- **CSS Modules** — стилізація
- **Google OAuth** — автентифікація
- **Firebase Analytics** — аналітика

---

## 🚀 Запуск проєкту локально

### 1. Клонування репозиторію
```bash
git clone https://github.com/your-username/bordify-frontend.git
cd bordify-frontend
```

### 2. Встановлення залежностей
```bash
npm install
```

### 3. Налаштування змінних середовища
Створи файл `.env` на основі прикладу і заповни:
```env
VITE_BASE_URL=http://localhost:3000
VITE_FRONTEND_URL=http://localhost:5173
```

### 4. Запуск проєкту
```bash
npm run dev
```

Застосунок буде доступний за адресою:
```
http://localhost:5173
```

---

## 📁 Структура проєкту
```
📦 src
├── assets/          # Іконки, зображення
├── components/      # Універсальні UI-компоненти
├── hooks/           # Кастомні хуки
├── layouts/         # Layout-компоненти
├── pages/           # Сторінки застосунку
├── redux/           # Redux slices, selectors, operations
├── routes/          # PublicRoute / PrivateRoute
├── services/        # Axios-запити
├── styles/          # CSS-модулі
├── App.tsx          # Головний компонент
├── main.tsx         # Точка входу
```

---

## 🔐 Основні функції
- 🔑 Реєстрація та логін користувача
- 📧 Верифікація пошти (SMTP)
- 🔐 Google OAuth авторизація
- 💡 Створення/редагування/видалення дощок, колонок, задач
- 🎨 Темна тема, адаптивний дизайн

---

## 📄 Ліцензія
Цей проєкт ліцензовано під MIT License.
