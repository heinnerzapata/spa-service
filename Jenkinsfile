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
    agent {
      dockerfile {
        dir './Dockerfile.dev'
        label 'spa-test'
        additionalBuildArgs  '--build-arg version=1.0'
        args '-u root'
    }
    }
    stages {
        stage('INIT') { 
            steps {
             
            }
        }
        // stage('INSTALL PROJECT MODULES') { 
        //     steps {
        //       sh 'yarn install' 
        //     }
        // }
        // stage('BUILD') {
        //     steps {
        //       /* groovylint-disable-next-line NestedBlockDepth */
        //       dockerImage = docker.build("test")
        //     }
        // }
        // stage('TEST') { 
        //     steps {
        //         sh "docker run ${dockerImage.id} npm run test"
        //     }
        // }
        // stage ('Continous Deployment') {
        //    steps {
        //     build job: 'node-services-pipeline', parameters: [[$class: 'StringParameterValue', name: 'SERVICE', value: 'vol7er-spa'], [$class: 'StringParameterValue', name: 'VERSION', value: 'develop']]
        //    }
        // }
    }
}
