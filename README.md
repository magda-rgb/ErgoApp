# ErgoApp

Simple 3-tier web application developed as a presentation of skills. Frontend is written in React using TypeScript and Bootstrap for CSS. Additionally there's a small backend API for risk calculation, written using FastAPI.

The application allows users to calculate the risk level of the insurance they want to get. First, the user provides personal details, then chooses what insurance is required. After submitting all the information, the user receives feedback whether the risk of the insurance is Low, Medium or High. At every stage the user can go back to previous steps and change the details.

## Architecture

### Frontend

- Built using React with TypeScript
    - Two reusable components: `FormField` for form inputs and `PageLayout` for page layout
    - Four pages: one welcome page and three pages for each step; the user can go back to any page to change details
    - State is kept between pages using props lifted to a parent component
    - Shared types are kept in a separate `types.ts`
- Layout is built using Bootstrap CSS, customized with Sass (indigo theme)
- Code quality checked with ESLint
- Simple error logging handled by `logger.ts`
- Backend URL is kept in `.env` file

### Backend

- Small API written using FastAPI with one endpoint for risk calculation
- CORS is used for communication between frontend and backend
- Once the user submits the form, the API calculates risk level and returns it as a response

### Docker and GitHub Actions

- Two Dockerfiles and one Docker Compose file to simplify running the application
- During PR creation, the workflow runs three checks:
    - Frontend lint (ESLint) and build
    - Backend lint (Ruff)
    - Docker images build

## Installation

1. Clone the repository:
```bash
git clone https://github.com/magda-rgb/ErgoApp.git
cd ErgoApp
```

2. Run with Docker:
```bash
docker compose up --build
```

3. Open the page:

Frontend: http://localhost:5173 | API: http://localhost:8000


## Possible development

Given extra time and budget, the application could be expanded in the following ways:

1. **More detailed car insurance** — when car is chosen, add fields for car brand, model and mileage to make the risk calculation more accurate
2. **User accounts and history** — add registration and login so users can save and review their past insurance calculations
3. **Smarter risk calculation** — use the user's previous insurance history as an additional factor in risk calculation for more accurate and personalized results
4. **Database integration** — store submitted forms and results in a database instead of calculating on the fly
5. **Unit and integration tests** — add frontend tests (Vitest) and backend tests (pytest) and run them in the workflow
6. **UI/UX improvements** — enhance the visual side with animations, add progress bar showing current form step and responsive design for mobile devices
7. **Production deployment** — replace the Vite dev server in Docker with Nginx for production build, add HTTPS and deploy to a cloud provider
