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
             RES = sh (script: 'npm audit > audit.log', returnStatus: true)
             echo "RES = ${RES}"
             message = readFile('audit.log').split("\n").find {it.matches('found.*vulnerabilities.*')}
             echo message
           }
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
           sh "httpobs-local-scan --http-port ${env.PORT} ${env.HOST}"
           step([$class: 'LogParserPublisher', useProjectRule: true, projectRulePath: 'jenkins-rule-logparser'])
         }
       }

        stage('NoSqlMap') {
         steps {
           sh "python2 /var/nosqlmap/NoSQLMap-master/nosqlmap.py --attack=2 --victim=${env.HOST} --webPort=${env.PORT} --uri='/create' --injectSize=1000 --injectFormat=1 --params=1 --doTimeAttack=n --httpMethod POST --postData 'content,test' --injectedParameter 1"
         }
       }
    
       stage('Cleanup'){
         steps {
           echo 'prune and cleanup'
           sh 'npm prune'
           sh 'rm node_modules -rf'
         }
       }

  }

}
