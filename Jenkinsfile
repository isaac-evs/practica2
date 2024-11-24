pipeline {
    agent any

    environment {
        GIT_CREDENTIALS_ID = '8aa54b10-9071-4cd8-af01-8ff2785c8bf8'
        GIT_BRANCH = 'main'  // Branch to push changes to
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Build and Test') {
            steps {
                script {
                    def buildResult = sh(script: 'docker-compose up --build --abort-on-container-exit', returnStatus: true)

                    if (buildResult != 0) {
                        error("Build or Tests Failed!")
                    }
                }
            }
        }

        stage('Commit and Push Changes') {
            when {
                expression { currentBuild.result == null }
            }
            steps {
                script {
                    sh '''
                    git add .
                    git commit -m "Automated commit: build successful"
                    git push origin ${GIT_BRANCH}
                    '''
                }
            }
        }
    }

    post {
        failure {
            echo "Build failed. No changes pushed."
        }
    }
}
