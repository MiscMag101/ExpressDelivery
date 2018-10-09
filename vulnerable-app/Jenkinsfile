pipeline {
  agent any
  stages {
       stage('Checkout'){
          steps {
            checkout scm
          }
       }

       stage('Build'){
         steps {
           print "Environment will be : ${env.PORT}:${env.HOST}"

           sh 'node -v'
           sh 'npm prune'
           sh 'npm install'
          }
       }

       stage('Test'){
         steps {
           sh 'npm run test'
         }
       }

       stage('Lint') {
         steps {
           sh 'npm run lint'
         }     
       }

       stage('Audit') {
         steps {
           script {
             RES = sh (script: 'npm audit', returnStdout: true, returnStatus: true)
             echo "RES = ${RES}"
           }
           step([$class: 'LogParserPublisher', projectRulePath: 'jenkins-rules-logparser-audit', unstableOnWarning: true, useProjectRule: true])
        }
       }
 
       stage('Sonar'){
         steps {
           //def scannerHome = tool 'SonarQube Scanner 2.8';

           withSonarQubeEnv('My SonarQube Server') {
             sh '/var/sonar-scanner/sonar-scanner-3.2.0.1227-linux/bin/sonar-scanner'
           }
         }
       }

       stage('Deploy'){
         steps {
           echo 'Push to Dev'
           sh './pushToDev.sh'
           }
       }


       stage('OWASP Zap') {
         steps {
           sh "zap-cli quick-scan --scanners xss --self-contained --spider -o '-config api.disablekey=true' http://${env.HOST}:${env.PORT}"
         }
       }


       stage('Mozilla Observatory') {
         steps {
           sh "httpobs-local-scan  --format report --http-port ${env.PORT} ${env.HOST}"
           step([$class: 'LogParserPublisher', useProjectRule: true, projectRulePath: 'jenkins-rule-logparser'])
         }
       }

    
//       stage('Custom') {
//         steps {
//           // SQLMap?/MongoDBMap
//           // OAuth test/vulnerability scanner?
//           // Metasploit?
//         }
//       }

       stage('Cleanup'){
         steps {
           echo 'prune and cleanup'
           sh 'npm prune'
           sh 'rm node_modules -rf'
         }
       }

  }

}
