FROM "node:alpine"

ENV APP_HOME /usr/taco/api

RUN mkdir -p $APP_HOME

WORKDIR $APP_HOME

RUN npm install

EXPOSE 80

COPY . .

CMD ["npm", "run", "start"]
