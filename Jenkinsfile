pipeline {
  agent any
  stages {
    stage('Build') {
      steps {
        echo 'Building Dockerfile for taco-api'
        sh '''sudo docker build -t test_jenkins_docker .
'''
      }
    }
    stage('Tests') {
      steps {
        echo 'Creating container for tests'
        sh '''sudo docker run -d -e PORT=80 --rm --name api_test test_jenkins_docker'''
        echo 'Starting Testing step....'
        sh '''sudo docker exec api_test npm run test'''
        echo 'Testing Step successfull, removing container'
        sh '''sudo docker stop api_test'''
      }
    }
  }
}
