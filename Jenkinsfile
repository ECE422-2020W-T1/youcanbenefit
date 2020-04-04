pipeline {
    agent any
    environment {
        CI = 'true'
        REGISTRY_NAME = 'ece4222020wt1'
    }
    stages {
        stage('Deliver') {
            steps {
                sh 'docker build --tag ${REGISTRY_NAME}/youcanbenefit-frontend:latest ./frontend'
                sh 'docker build --tag ${REGISTRY_NAME}/youcanbenefit-backend:latest ./backend'

                withCredentials([usernamePassword(credentialsId: '5c6659ff-00c2-4429-a1bb-7e7c4392c35b', passwordVariable: 'DOCKER_PASS', usernameVariable: 'DOCKER_USER')]) {
                    sh 'docker login -u ${DOCKER_USER} -p ${DOCKER_PASS}'
                    sh 'docker push ${REGISTRY_NAME}/youcanbenefit-frontend:latest'
                    sh 'docker push ${REGISTRY_NAME}/youcanbenefit-backend:latest'
                }
            }   
        }
    }

        // stage('Deliver') {
        //     steps {
        //         dir('./frontend'){
        //             sh '../scripts/deliver.sh'
        //         }
        //         input message: 'Finished using the web site? (Click "Proceed" to continue)'
        //         dir('./frontend'){
        //             sh '../scripts/kill.sh'
        //         }
        //     }
        // }
}
