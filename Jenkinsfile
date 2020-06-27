pipeline {
    environment {
        HOME = '.'
        dockerImage = ''
    }
    // agent {
    //     docker {
    //       image 'mhart/alpine-node:12'
    //       args '-u root'
    //     }
    // }
    agent any
    options {
        /* groovylint-disable-next-line SpaceAroundMapEntryColon */
        timeout(time: 20, unit: 'MINUTES')
    }
    stages {
        // stage('INSTALL - prev tools') { 
        //     steps {
        //       sh "apk update && apk upgrade"
        //       sh "apk add --no-cache bash git openssh"
        //       sh "npm install -g yarn"
        //     }
        // }
        // stage('INSTALL PROJECT MODULES') { 
        //     steps {
        //       sh 'yarn install' 
        //     }
        // }
        stage('BUILD') {
            steps {
              /* groovylint-disable-next-line NestedBlockDepth */
              dockerImage = docker.build("test-image", "./Dockerfile.dev", "--build-arg v1.0")
            }
        }
        stage('TEST') { 
            steps {
                sh "docker run ${dockerImage.id} npm run test"
            }
        }
        // stage ('Continous Deployment') {
        //    steps {
        //     build job: 'node-services-pipeline', parameters: [[$class: 'StringParameterValue', name: 'SERVICE', value: 'vol7er-spa'], [$class: 'StringParameterValue', name: 'VERSION', value: 'develop']]
        //    }
        // }
    }
}
