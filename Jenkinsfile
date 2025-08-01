pipeline {
    agent any

    environment {
        BACKEND_IMAGE = 'yourdockerhub/backend'
        FRONTEND_IMAGE = 'yourdockerhub/frontend'
        TAG = "${BUILD_NUMBER}"
    }

    stages {
        stage('Checkout') {
            steps {
                git credentialsId: 'Github-ID', url: 'https://github.com/NeetGupta/Docker.git', branch: 'main'
            }
        }

        stage('Build & Push Backend') {
            steps {
                script {
                    sh "docker build -t ${env.BACKEND_IMAGE}:${env.TAG} -f backend/Dockerfile backend/"
                    withDockerRegistry([credentialsId: 'docker-cred', url: '']) {
                        sh "docker push ${env.BACKEND_IMAGE}:${env.TAG}"
                    }
                }
            }
        }

        stage('Build & Push Frontend') {
            steps {
                script {
                    sh "docker build -t ${env.FRONTEND_IMAGE}:${env.TAG} -f frontend/Dockerfile frontend/"
                    withDockerRegistry([credentialsId: 'docker-cred', url: '']) {
                        sh "docker push ${env.FRONTEND_IMAGE}:${env.TAG}"
                    }
                }
            }
        }
    }

    post {
        failure {
            echo 'Build or Push Failed!'
        }
    }
}
