FROM jenkins/jenkins:lts-alpine
ENV JAVA_OPTS="-Djenkins.install.runSetupWizard=false"

USER root
RUN apk add --update nodejs npm python python3 git py-pip gcc linux-headers python3-dev musl-dev
RUN npm install npm@latest -g
RUN python3 -m ensurepip 
RUN pip install --upgrade pip
RUN cd /var/ && \
  git clone https://github.com/mozilla/http-observatory.git && \
  cd http-observatory/ && \
  pip3 install --upgrade . && \
  pip3 install --upgrade -r httpobs/requirements.txt && \
  pip3 install --upgrade -r httpobs/scanner/requirements.txt
ENV PATH="/var/http-observatory/httpobs/scripts/:${PATH}"

RUN pip3 install --upgrade zapcli

RUN wget https://github.com/zaproxy/zaproxy/releases/download/2.7.0/ZAP_2.7.0_Linux.tar.gz
RUN mkdir /zap
RUN tar -xf ZAP_2.7.0_Linux.tar.gz -C /zap
ENV ZAP_PATH=/zap/ZAP_2.7.0/

COPY plugins.txt /usr/share/jenkins/ref/plugins.txt 
RUN wget -O /tmp/sonar-scanner-cli-3.2.0.1227-linux.zip https://sonarsource.bintray.com/Distribution/sonar-scanner-cli/sonar-scanner-cli-3.2.0.1227-linux.zip
RUN mkdir -p /var/sonar-scanner
RUN unzip /tmp/sonar-scanner-cli-3.2.0.1227-linux.zip -d /var/sonar-scanner/
RUN sed -i 's/use_embedded_jre=true/use_embedded_jre=false/g' /var/sonar-scanner/sonar-scanner-3.2.0.1227-linux/bin/sonar-scanner
COPY sonar-scanner.properties /var/sonar-scanner/sonar-scanner-3.2.0.1227-linux/conf/sonar-scanner.properties
ENV PATH="/var/sonar-scanner/sonar-scanner-3.2.0.1227-linux/bin/:${PATH}"
RUN /usr/local/bin/install-plugins.sh < /usr/share/jenkins/ref/plugins.txt

RUN mkdir -p /var/jenkins_home/jobs/Prototype_PassportJS/
COPY config.xml /var/jenkins_home/jobs/Prototype_PassportJS/

RUN pip2 install --upgrade couchdb requests pbkdf2 pymongo ipcalc six
RUN wget -O /tmp/nosqlmap.zip https://github.com/cotonne/NoSQLMap/archive/master.zip && \
    unzip /tmp/nosqlmap.zip -d /var/nosqlmap
