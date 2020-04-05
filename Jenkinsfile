pipeline {
    agent none
    stages {
        stage('Build and Test') {
            agent {
                docker 'node:10-alpine'
            }
            stages {
                stage('Build') {
                    steps {
                        dir('./backend') {
                            sh 'npm install'
                        }
                        dir('./frontend') {
                            sh 'npm install'
                        }
                    }
                }
                stage('Test') {
                    steps {
                        dir('./backend') {
                            sh 'npm run unit-test'
                        }
                    }
                }
            }
        }
        stage('Deliver') {
            agent any
            environment {
                REGISTRY_NAME = 'ece4222020wt1'
            }
            steps {
                sh 'docker build --tag ${REGISTRY_NAME}/youcanbenefit-backend:latest ./backend'
                sh 'docker build --tag ${REGISTRY_NAME}/youcanbenefit-frontend:latest ./frontend'

                withCredentials([usernamePassword(credentialsId: '5c6659ff-00c2-4429-a1bb-7e7c4392c35b', passwordVariable: 'DOCKER_PASS', usernameVariable: 'DOCKER_USER')]) {
                    sh 'docker login -u ${DOCKER_USER} -p ${DOCKER_PASS}'
                    sh 'docker push ${REGISTRY_NAME}/youcanbenefit-backend:latest'
                    sh 'docker push ${REGISTRY_NAME}/youcanbenefit-frontend:latest'
                }
            }   
        }
    }
}
