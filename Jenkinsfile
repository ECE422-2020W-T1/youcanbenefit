pipeline {
    agent any
    stages {
        stage('Build') {
            steps {
step([$class: 'DockerComposeBuilder', dockerComposeFile: 'docker-compose.yml', option: [$class: 'ExecuteCommandInsideContainer', command: 'build', index: 1, privilegedMode: true, service: 'youcanbenefit', workDir: ''], useCustomDockerComposeFile: true])            }
        }
        stage('Deliver') {
            steps {
                input message: 'Finished using the web site? (Click "Proceed" to continue)'
            }
        }
    }
}