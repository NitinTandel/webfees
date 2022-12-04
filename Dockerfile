FROM alpine:latest
RUN apk add --no-cache nodejs npm

# Install python
ENV PYTHONUNBUFFERED=1
RUN apk add --update --no-cache python2 && ln -sf python2 /usr/bin/python
RUN apk add --update --no-cache make g++

#RUN apk add --update --no-cache python3 && ln -sf python3 /usr/bin/python
#RUN apk add --update --no-cache py3-pip make g++
#RUN pip3 install --no-cache --upgrade pip setuptools
#RUN python3 -m ensurepip


RUN npm install --global --unsafe-perm node-gyp@latest
RUN npm install --global --unsafe-perm node-pre-gyp@latest
RUN npm install --global --unsafe-perm webpack@5.0.0
#RUN npm --add-python-to-path='true'

WORKDIR /webfees

COPY package.json /webfees


RUN npm install

COPY . /webfees


#RUN npm upgrade

#COPY avsfees.js /webfees
#COPY AVSLib.js /webfees
#COPY config.js /webfees

#COPY /models/* /webfees/models
#COPY /public/* /webfees/public
#COPY /routes/* /webfees/routes
#COPY /views/* /webfees/views
#COPY /db /webfees

#RUN chown -R admin:admin /webfees/db
#RUN chmod 755 /webfees/db


EXPOSE 4000
CMD ["npm", "start"]
