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
        stage ('Starting CD') {
          build job: 'vol7er-DEV-Cluster', parameters: [[$class: 'StringParameterValue', name: 'SERVICE', value: 'vol7er-spa'], [$class: 'StringParameterValue', name: 'VERSION', value: 'develop']]
        }
      //   stage('DEPLOY DEV - GitHub Pages') { 
      //     steps {   
      //       withCredentials([string(credentialsId: 'GH_TOKEN', variable: 'GH_TOKEN'), string(credentialsId: 'GH_USER', variable: 'GH_USER'), string(credentialsId: 'GH_MAIL', variable: 'GH_MAIL')]) { 
      //         sh "git config --global user.email '${GH_MAIL}'"
      //         sh "git config --global user.name '${GH_USER}'"
      //         sh "git remote rm origin"
      //         sh "git remote add origin https://vol7er:'${GH_TOKEN}'@github.com/vol7er/vol7er.git"
      //         sh "yarn deploy"
      //       }           
      //     }
      // }
    }
}
