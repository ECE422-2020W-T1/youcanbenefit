pipeline {
    agent none
    stages {
        stage('Build') {
            steps {
                sh 'docker-compose -f docker-compose.yml up --build'
            }
        }
        stage('Deliver') {
            steps {
                input message: 'Finished using the web site? (Click "Proceed" to continue)'
            }
        }
    }
}