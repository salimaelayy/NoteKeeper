
FROM node:20-alpine

# sets the working directory
WORKDIR /app

# copies any package.json file
COPY package*.json ./

#  installs dependencies using npm install
RUN npm install

# copies all files from the current directory (including index.js) to docker image
# from 'Source' to 'Dist' in the imaeg's filesystem
COPY . .

# if we are using environment variable we add this variable like this
ENV PORT=5000 \
    MONGO_URI=mongodb+srv://ijiouilahoucine29:C4GSMPnMICSxcEnV@notekeeper.jpq280n.mongodb.net/

EXPOSE 5000

CMD [ "npm", "start", "test" ]

