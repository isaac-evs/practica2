pipeline {
    agent any

    environment {
        PATH = "/usr/local/bin:/usr/bin:/bin:${env.PATH}"
    }

    stages {
        stage('Verify Docker Access') {
            steps {
                sh 'which docker || echo "Docker not found"'
                sh 'docker --version || echo "Docker version not available"'
                sh 'which docker-compose || echo "Docker Compose not found"'
                sh 'docker-compose --version || echo "Docker Compose version not available"'
            }
        }

        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Build') {
            steps {
                sh 'docker-compose build'
            }
        }

        stage('Run') {
            steps {
                sh 'docker-compose up -d'
            }
        }

        stage('Test') {
            steps {
                // Increase the sleep time if necessary
                sh 'sleep 20'
                // Test the /api/dummy endpoint
                sh '''
                    echo "Testing backend endpoint..."
                    RESPONSE=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:8001/api/dummy)
                    if [ "$RESPONSE" -ne 200 ]; then
                        echo "Unexpected HTTP response code: $RESPONSE"
                        exit 1
                    else
                        echo "Backend test successful. HTTP response code: $RESPONSE"
                    fi
                '''
            }
        }

        stage('Teardown') {
            steps {
                sh 'docker-compose down'
            }
        }
    }

    post {
        always {
            // Clean up dangling images and containers
            sh 'docker system prune -f'
        }
    }
}
