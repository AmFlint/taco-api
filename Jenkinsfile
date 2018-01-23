pipeline {
  agent any
  stages {
    stage('Build') {
      steps {
        echo 'Building Dockerfile for taco-api'
        sh 'docker build -t test_jenkins_docker .'
      }
    }
    stage('Tests') {
      steps {
        echo 'Creating container for tests'
        sh 'docker run -d --rm --name api_test test_jenkins_docker'
        echo 'Starting Testing step....'
        sh 'docker exec api_test npm run test'
        echo 'Testing Step successfull, removing container'
        sh 'docker stop api_test'
      }
    }
  }
}