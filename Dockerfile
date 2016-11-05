FROM registy.flexshopper.xyz:5000/node_base:latest

ADD package.json npm-shrinkwrap.json ./

RUN npm install --silent --production

ADD . .

EXPOSE 1337

CMD ["npm", "run", "start"]
