# React Docker

## Commands

### URL
```
127.0.0.1:3000
```

### Create the container
```
docker-compose up
```

### Remove the container
```
docker-compose down
```

### Start the container
```
docker-compose start
```

### Stop the container
```
docker-compose stop
```

### Access to container logs
```
docker-compose logs -f
```

### Access to docker container
```
docker-compose exec react /bin/bassh
```

## How the app was created

```
docker run -ti --rm -v $PWD:/home/node/app -w /home/node/app node /bin/bash # Temporary container
yarn global add create-react-app # Globally add the create-react-app tool
create-react-app react-app # Create an app named react-app
```