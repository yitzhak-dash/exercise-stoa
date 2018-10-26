
## mongo
* `docker pull mongo`
* `docker run --name some-mongo -d -p 27017:27017 mongo`
* connect to the container bash: `docker exec -it some-mongo bash`

## client
* `cd client`
* `npm install`
* `npm run build`
* Navigate to `http://localhost:3000/`

## server
* `cd server`
* `npm install`
* `npm run build-ts`
* `npm run serve`
* REST API endpoint: `http://localhost:3000/api`




