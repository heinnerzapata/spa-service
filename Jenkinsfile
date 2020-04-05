pipeline {
    environment {
        HOME = '.'
    }
    agent {
        docker {
          image 'mhart/alpine-node:10'
          args '-u root'
        }
    }
    stages {
        stage('Install') { 
            steps {
                sh "apk update && apk upgrade"
                sh "apk add --no-cache bash git openssh"
                sh "npm install -g yarn"
                sh "apk add --no-cache --virtual python"
                sh "rm -rf node_modules"
                sh 'yarn install' 
            }
        }
        stage('test') { 
            steps {
                sh 'yarn test:coverage' 
            }
        }
        stage('deploy dev - GitHub Pages') { 
          steps {   
            // withCredentials([string(credentialsId: 'GH_TOKEN', variable: 'GH_TOKEN'), string(credentialsId: 'GH_USER', variable: 'GH_USER'), string(credentialsId: 'GH_MAIL', variable: 'GH_MAIL')]) { 
            //   sh "git config --global user.email '${GH_MAIL}'"
            //   sh "git config --global user.name '${GH_USER}'"
            //   sh "git remote rm origin"
            //   sh "git remote add origin https://vol7er-spa-2:'${GH_TOKEN}'@github.com/VOL7ER/vol7er-spa-2.git"
            //   //sh 'git add -A'
            //   //sh 'git commit -m"merge since bitBucket jenkins"'
            //   //sh "git push --force -u origin develop"
            //   sh "yarn deploy"
            // }       
            sh "yarn deploy"          
          }
      }
    }
}
