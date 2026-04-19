# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Common Commands

### Development & Testing
- **Start development server**: `docker-compose up --build` (builds and runs all services)
- **Run backend tests**: `cd backend && python -m pytest test_backend.py -v`
- **Run frontend linting**: `cd frontend && npx eslint src/**/*.{js,jsx}`
- **Format frontend code**: `cd frontend && npx prettier --write src/**/*.{js,jsx,css}`
- **Build frontend for production**: `cd frontend && npm run build`
- **Preview production build**: `cd frontend && npm run preview`

### Backend Specific
- **Start backend only**: `cd backend && uvicorn app.main:app --reload --host 0.0.0.0 --port 8000`
- **Run ML model tests**: `cd backend && python -c "from app.ml_model import predictor; print('Model loaded:', predictor.model is not None)"`

### Infrastructure
- **Validate Terraform**: `cd infra && terraform validate && terraform plan`
- **Apply Terraform**: `cd infra && terraform apply -auto-approve`
- **Destroy infrastructure**: `cd infra && terraform destroy -auto-approve`

### Docker
- **Rebuild all images**: `docker-compose build`
- **Start services detached**: `docker-compose up -d`
- **View logs**: `docker-compose logs -f`
- **Stop and remove containers**: `docker-compose down`

## Architecture Overview

### Backend (FastAPI)
- **Entry point**: `backend/app/main.py` - Defines API endpoints, CORS, Prometheus metrics
- **ML Model**: `backend/app/ml_model.py` - Handles burnout prediction using scikit-learn
- **Data Schemas**: `backend/app/schemas.py` - Pydantic models for request/response validation
- **Data Models**: `backend/app/models.py` - SQLAlchemy models (currently commented out, using in-memory storage)
- **Sample Data**: `backend/sample_data.csv` - CSV file used for model training
- **Trained Model**: `backend/burnout_model.pkl` - Pickled scikit-learn model

### Frontend (React + Vite)
- **Entry point**: `frontend/src/main.jsx` - React application bootstrap
- **Root Component**: `frontend/src/App.jsx` - Main app layout with routing
- **Components**:
  - `Navbar.jsx` - Navigation header
  - `HomePage.jsx` - Landing page with survey form
  - `SurveyPage.jsx` - Detailed survey implementation
  - `ResultsPage.jsx` - Displays prediction results and recommendations
  - `Dashboard.jsx` - Visualizes historical data and trends
- **Styles**: 
  - Global CSS: `frontend/src/index.css`
  - Theme: `frontend/src/styles/theme.js` (MUI theme customization)
  - Component-specific: `frontend/src/styles/App.css`
- **Configuration**: `frontend/vite.config.js` - Vite build configuration
- **Dependencies**: Managed via `package.json` with MUI, Axios, Recharts for charts

### Infrastructure
- **Container Orchestration**: `docker-compose.yml` - Defines backend, frontend, and network services
- **CI/CD**: `Jenkinsfile` - Jenkins pipeline for building, testing, and deploying
- **Infrastructure as Code**: 
  - `infra/main.tf` - Terraform configuration for AWS resources
  - `infra/terraform.tfstate` - Terraform state file
  - `ansible/` - Ansible playbooks for server provisioning (`setup.yml`) and inventory (`inventory.ini`)

### Key Features
1. **Burnout Prediction**: ML model predicts burnout score (0-100) based on survey responses
2. **Risk Categorization**: Scores mapped to Low/Medium/High/Severe risk levels
3. **Personalized Recommendations**: Based on survey responses and prediction score
4. **Historical Tracking**: Stores last 10 predictions for trend analysis (in-memory, would use DB in production)
5. **RESTful API**: Endpoints for prediction, historical data, trend analysis, and health checks
6. **Responsive UI**: Built with Material-UI components for consistent user experience
7. **Monitoring**: Prometheus metrics exposed via `/metrics` endpoint
8. **CORS Enabled**: Allow cross-origin requests for frontend-backend communication

### Development Guidelines
- **Environment Variables**: Configure via `.env` files (not checked into repo) for secrets
- **Database**: Currently using in-memory storage; for production, configure PostgreSQL via SQLAlchemy
- **ML Model Retraining**: Update `sample_data.csv` and retrain model using scripts in ml_model.py
- **API Documentation**: Auto-generated Swagger UI available at `/docs` when backend is running
- **Testing**: Backend uses pytest; frontend testing setup can be added with Jest/Vitest
- **Code Formatting**: Backend follows PEP 8; frontend uses ESLint and Prettier configs

### Deployment
- **Local Development**: `docker-compose up --build`
- **Production**: Build Docker images and deploy via Kubernetes or ECS (Terraform templates available)
- **Monitoring**: Prometheus metrics scraped from `/metrics` endpoint
- **Logging**: Standard output logging; configure log levels in application settings

## Important Notes
1. The ML model expects specific feature order matching the training data in sample_data.csv
2. Frontend communicates with backend via Axios instance configured in service files (check component files for API URLs)
3. Survey questions and scoring logic are defined in the ML model and frontend form components
4. For production deployment, replace in-memory storage with persistent database
5. Environment-specific configurations should be managed via Docker Compose overrides or Kubernetes ConfigMaps