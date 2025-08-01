pipeline {
    agent any

    environment {
        BACKEND_IMAGE = 'neetupgu/backend'
        FRONTEND_IMAGE = 'neetupgu/frontend'
        TAG = "${BUILD_NUMBER}"
    }

    stages {
        stage('Checkout') {
            steps {
                git credentialsId: 'Github-ID', url: 'https://github.com/NeetGupta/Docker.git', branch: 'main'
            }
        }

        stage('Build & Push Server') {
            steps {
                script {
                    sh "docker build -t ${env.BACKEND_IMAGE}:${env.TAG} -f Server/Dockerfile Server/"
                    withDockerRegistry([credentialsId: 'docker-cred', url: '']) {
                        sh "docker push ${env.BACKEND_IMAGE}:${env.TAG}"
                    }
                }
            }
        }

        stage('Build & Push client') {
            steps {
                script {
                    sh "docker build -t ${env.FRONTEND_IMAGE}:${env.TAG} -f client/Dockerfile client/"
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
