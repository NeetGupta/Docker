pipeline {
    agent any

    environment {
        IMAGE_NAME = 'your-dockerhub-username/real-time-node-app'
        IMAGE_TAG = "${env.BUILD_NUMBER}"
        KUBE_NAMESPACE = 'default'
        DEPLOYMENT_NAME = 'real-time-node-app'
    }

    stages {
        stage('Checkout') {
            steps {
                git 'https://github.com/your-repo/real-time-node-app.git'
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    docker.build("${env.IMAGE_NAME}:${env.IMAGE_TAG}")
                }
            }
        }

        stage('Push Image') {
            steps {
                script {
                    docker.withRegistry('https://registry.hub.docker.com', 'dockerhub-credentials-id') {
                        docker.image("${env.IMAGE_NAME}:${env.IMAGE_TAG}").push()
                    }
                }
            }
        }

        /*stage('Deploy to Kubernetes') {
            steps {
                script {
                    // Create or update deployment.yaml dynamically or keep it in repo
                    sh """
                    kubectl set image deployment/${DEPLOYMENT_NAME} ${DEPLOYMENT_NAME}=${IMAGE_NAME}:${IMAGE_TAG} -n ${KUBE_NAMESPACE} || \
                    kubectl create deployment ${DEPLOYMENT_NAME} --image=${IMAGE_NAME}:${IMAGE_TAG} -n ${KUBE_NAMESPACE}
                    """

                    // Optional: expose service if not already exposed
                    sh """
                    kubectl expose deployment ${DEPLOYMENT_NAME} --type=LoadBalancer --port=3000 --target-port=3000 -n ${KUBE_NAMESPACE} --dry-run=client -o yaml | kubectl apply -f -
                    """

                    // Optional: rollout status check
                    sh "kubectl rollout status deployment/${DEPLOYMENT_NAME} -n ${KUBE_NAMESPACE}"
                }
            }
        }
    }

    post {
        failure {
            echo 'Deployment failed!'
        }
    }
}*/

