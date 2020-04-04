pipeline {
    agent any
    environment {
        CI = 'true'
        REGISTRY_NAME = 'ece4222020wt1'
    }
    stages {
        stage('Build') {
            steps {
                dir('./frontend'){
                    // sh 'npm install'
                    // withCredentials([usernamePassword(credentialsId: '5c6659ff-00c2-4429-a1bb-7e7c4392c35b', passwordVariable: 'DOCKER_PASS', usernameVariable: 'DOCKER_USER')]) {
                    // // some block
                    // }
                    echo '${REGISTRY_NAME}'
                    sh 'docker build --tag ${REGISTRY_NAME}/youcanbenefit-frontend:latest .' 
                }
                input message: 'Finished using the web site? (Click "Proceed" to continue)'
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
}
