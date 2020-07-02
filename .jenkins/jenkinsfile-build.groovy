@Library('shared-functions@master') _

pipeline {
  agent {
    docker {
      image 'node:10'
      args '-u root \
            -v /home/jenkins/.ssh:/root/.ssh:ro \
            -v /home/jenkins/tools:/home/jenkins/tools:ro \
            -v /home/jenkins/workspace:/home/jenkins/workspace:ro \
            -v /var/run/docker.sock:/var/run/docker.sock:ro \
            -v /usr/bin/docker:/usr/bin/docker:ro'
    }
  }

  options {
    buildDiscarder(logRotator(numToKeepStr:'10'))
    disableConcurrentBuilds()
  }

  parameters {
    string(name: 'BRANCH', defaultValue: "master", description: 'Tests branch?')
  }

  environment {
    BITBUCKET_CRED = credentials("bitbucket-basic")
    BITBUCKET_USER = "${BITBUCKET_CRED_USR}"
    BITBUCKET_PASS = "${BITBUCKET_CRED_PSW}"
    REGISTRY_CRED = credentials("docker-registry")
    registryCredential = 'docker-registry'
    DOCKER_IMAGE = "registry.infotech.team/test/planner-ui-tests"
    NPM_TOKEN = credentials("nexus_token")
  }
  
  stages {
    stage("Checkout SCM") {
      steps {
        checkout scm
        sh 'git config --global user.email "jenkins@infotech.team"'
        sh 'git config --global user.name "jenkins"'
      }
    }

    stage("build docker image") {
      steps {
        script {
          docker.withRegistry('https://registry.infotech.team', registryCredential) {
            def dockerImage = docker.build("${DOCKER_IMAGE}")
            dockerImage.push()
          }
        }
      }
    }
  }

  post {
    always {
        sh 'rm -Rf *'
    }
  }
}