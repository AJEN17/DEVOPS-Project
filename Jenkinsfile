pipeline {
    agent any
    options {
        timestamps()
        disableConcurrentBuilds()
    }

    parameters {
        booleanParam(name: 'DEPLOY_MONITORING', defaultValue: false, description: 'Start Prometheus+Grafana (uses extra RAM).')
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
                sh 'git config --global --add safe.directory "$WORKSPACE"'
            }
        }
        
        stage('Cleanup Docker Cache') {
            steps {
                sh 'docker system prune -f || true'
            }
        }

        stage('Build Docker Images') {
            steps {
                sh 'DOCKER_BUILDKIT=1 docker compose build'
            }
        }

        stage('Deploy App') {
            steps {
                sh 'docker compose up -d --remove-orphans'
            }
        }

        stage('Wait For App (Avoid RAM Spike)') {
            steps {
                sh '''
                  set -e
                  for i in $(seq 1 60); do
                    if curl -fsS http://localhost:8000/health >/dev/null; then
                      echo "Backend is healthy"
                      exit 0
                    fi
                    sleep 2
                  done
                  echo "Backend did not become healthy in time"
                  exit 1
                '''
            }
        }

        stage('Deploy Monitoring (Optional)') {
            when {
                expression { return params.DEPLOY_MONITORING }
            }
            steps {
                sh 'docker compose -f docker-compose.monitoring.yml up -d --remove-orphans'
            }
        }
        
        stage('Verify Deployment') {
            steps {
                sh 'docker ps'
                sh 'curl -fsS http://localhost:8000/health || true'
                sh 'curl -fsS http://localhost:8000/metrics | head -n 5 || true'
            }
        }
    }

    post {
        always {
            sh 'docker image prune -f || true'
        }
    }
}
