pipeline {
    agent any

    environment {
        IMAGE_NAME = 'chat'
        IMAGE_TAG = ''
        KUBE_NAMESPACE = 'default'
        DEPLOYMENT_NAME = 'real-time-node-app'
    }

    stages {
        stage('Checkout') {
            steps {
              git branch: 'main',
            credentialsId: 'Github-ID',
            url: 'https://github.com/NeetGupta/Docker.git'
            }
        }

        stage('Set Image Tag') {
            steps {
                script {
                    IMAGE_TAG = env.BUILD_NUMBER
                }
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    docker.build("${IMAGE_NAME}:${IMAGE_TAG}")
                }
            }
        }

        stage('Push Image') {
            steps {
                script {
                    docker.withRegistry('https://registry.hub.docker.com', 'docker-cred') {
                        docker.image("${IMAGE_NAME}:${IMAGE_TAG}").push()
                    }
                }
            }
        }

        /*
        stage('Deploy to Kubernetes') {
            steps {
                script {
                    sh """
                    kubectl set image deployment/${DEPLOYMENT_NAME} ${DEPLOYMENT_NAME}=${IMAGE_NAME}:${IMAGE_TAG} -n ${KUBE_NAMESPACE} || \
                    kubectl create deployment ${DEPLOYMENT_NAME} --image=${IMAGE_NAME}:${IMAGE_TAG} -n ${KUBE_NAMESPACE}
                    """

                    sh """
                    kubectl expose deployment ${DEPLOYMENT_NAME} --type=LoadBalancer --port=3000 --target-port=3000 -n ${KUBE_NAMESPACE} --dry-run=client -o yaml | kubectl apply -f -
                    """

                    sh "kubectl rollout status deployment/${DEPLOYMENT_NAME} -n ${KUBE_NAMESPACE}"
                }
            }
        }
        */
    }

    post {
        failure {
            echo 'Deployment failed!'
        }
    }
}
