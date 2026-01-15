pipeline {
    agent any

    environment {
        DOCKERHUB_CREDS = credentials('test-dockerhubpassword')
        BACKEND_IMAGE = "thisandaprasanjana/backend:latest"
        FRONTEND_IMAGE = "thisandaprasanjana/frontend:latest"
    }

    stages {

        stage('Clone Repository') {
            steps {
                git branch: 'main', url: 'https://github.com/thixxa/Jenkins-Docker-Pipeline-For-MERN-Application.git'
            }
        }

        stage('Build Backend Image') {
            steps {
                dir('backend') {
                    bat "docker build -t $BACKEND_IMAGE ."
                }
            }
        }

        stage('Build Frontend Image') {
            steps {
                dir('frontend') {
                    bat "docker build -t $FRONTEND_IMAGE ."
                }
            }
        }

        stage('Login to Docker Hub') {
            steps {
                bat '''
                echo $DOCKERHUB_CREDS_PSW | docker login -u $DOCKERHUB_CREDS_USR --password-stdin
                '''
            }
        }

        stage('Push Images') {
            steps {
                bat '''
                docker push $BACKEND_IMAGE
                docker push $FRONTEND_IMAGE
                '''
            }
        }
    }
}
