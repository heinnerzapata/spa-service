pipeline {
    environment {
        HOME = '.'
    }
    agent {
        docker {
          image 'mhart/alpine-node:12'
          args '-u root'
        }
    }
    stages {
        stage('INSTALL - prev tools') { 
            steps {
              sh "apk update && apk upgrade"
              sh "apk add --no-cache bash git openssh"
              sh "npm install -g yarn"
              sh "apk add --no-cache --virtual python"
            }
        }
        stage('INSTALL PROJECT MODULES') { 
            steps {
              sh 'yarn install' 
            }
        }
        stage('TEST') { 
            steps {
                sh 'yarn test:coverage' 
            }
        }
        stage('DEPLOY DEV - GitHub Pages') { 
          steps {   
            withCredentials([string(credentialsId: 'GH_TOKEN', variable: 'GH_TOKEN'), string(credentialsId: 'GH_USER', variable: 'GH_USER'), string(credentialsId: 'GH_MAIL', variable: 'GH_MAIL')]) { 
              sh "git config --global user.email '${GH_MAIL}'"
              sh "git config --global user.name '${GH_USER}'"
              sh "git remote rm origin"
              sh "git remote add origin https://vol7er-spa-3:'${GH_TOKEN}'@github.com/VOL7ER/vol7er-spa-3.git"
              sh "yarn deploy"
            }           
          }
      }
    }
}
