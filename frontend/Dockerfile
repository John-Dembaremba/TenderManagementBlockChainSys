FROM node:alpine



# copy all file from local to app
COPY . /code
WORKDIR /code/frontend


# install node packages
RUN npm install

# Run nextjs server
RUN npm run build

EXPOSE 3000


