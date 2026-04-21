pipeline {
    agent any
    options {
        timestamps()
        timeout(time: 15, unit: 'MINUTES')
        disableConcurrentBuilds()
    }

    // This creates a checkbox in Jenkins so you can choose to deploy monitoring or save RAM
    parameters {
        booleanParam(name: 'DEPLOY_MONITORING', defaultValue: false, description: 'Start Prometheus+Grafana (check only if you have enough RAM).')
    }

    stages {
        stage('Checkout SCM') {
            steps {
                checkout scm
                sh 'git config --global --add safe.directory "$WORKSPACE" || true'
            }
        }

        stage('Clean Environment') {
            steps {
                // Bulletproof cleanup to prevent the "Port already allocated" error
                sh '''
                echo "Tearing down old containers..."
                docker compose -f docker-compose.yml down || true
                docker compose -f docker-compose.monitoring.yml down || true
                docker network prune -f || true
                docker system prune -f || true
                '''
            }
        }

        stage('Build App Images') {
            steps {
                sh '''
                echo "Building fresh Docker images..."
                DOCKER_BUILDKIT=1 docker compose -f docker-compose.yml build
                '''
            }
        }

        stage('Deploy Application') {
            steps {
                sh '''
                echo "Starting Frontend and Backend..."
                docker compose -f docker-compose.yml up -d --remove-orphans
                '''
            }
        }

        stage('Health Verification') {
            steps {
                // A fail-safe loop that pings the backend until it wakes up (Fixed for Jenkins shell compatibility)
                sh '''
                echo "Waiting for FastAPI to initialize..."
                for i in $(seq 1 30); do
                    if curl -sS -f http://localhost:8000/health > /dev/null; then
                        echo "Backend is healthy!"
                        exit 0
                    fi
                    echo "Waiting for backend... attempt $i"
                    sleep 3
                done
                echo "Health check failed after 90 seconds."
                exit 1
                '''
            }
        }

        stage('Deploy Monitoring Stack') {
            // This stage ONLY runs if you checked the box in Jenkins!
            when {
                expression { return params.DEPLOY_MONITORING }
            }
            steps {
                sh '''
                echo "Starting Monitoring Stack..."
                docker compose -f docker-compose.monitoring.yml up -d --remove-orphans
                '''
            }
        }

        stage('Verify Deployment') {
            steps {
                sh """
                  docker ps
                  curl -fsS http://localhost:8000/health || true
                  curl -fsS http://localhost:8000/metrics | head -n 5 || true
                  if [ "${params.DEPLOY_MONITORING}" = "true" ]; then
                    curl -fsS http://localhost:9090/-/ready || true
                  fi
                """
            }
        }
    }

    post {
        always {
            // Keep your AWS server clean
            sh 'docker image prune -af || true'
        }
        success {
            echo "DEPLOYMENT SUCCESSFUL! The NeuroBalance system is live."
        }
        failure {
            echo "DEPLOYMENT FAILED! Please check the stage logs above."
        }
    }
}
