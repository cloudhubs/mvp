# Microservice Visualization Platform (MVP)

Our architecture visualization proof-of-concept aims to provide an interactive visualization framework for cloud native systems. Currently, the web-based application takes a JSON file describing the microservice-based system in the abstract terms of nodes and links and generates a high-level 2D and 3D perspective of the system. The resulting perspectives are highly customizable and interactive to allow for control over the holistic system view.

## Getting Started
`node v18.x.x` `java 19`

# Running the Microservice Visualization Platform (MVP) with Docker

This guide will help you run the Microservice Visualization Platform (MVP) using Docker.

## Prerequisites

Ensure you have the following installed on your machine:
- Docker
- Docker Compose

## Getting Started

1. **Clone the repository:**

    ```sh
    git clone https://github.com/cloudhubs/mvp.git
    cd mvp
    ```

2. **Build and run the Docker containers:**

    From the root directory of the project, run the following command:

    ```sh
    docker-compose up --build
	or
	docker-compose up --build -d (for detached mode)

    ```

    This command will build the Docker images and start the containers for both the backend and frontend services.

	> The first time you run this command, it will take some time to download the required Docker images. Subsequent runs will be faster.

3. **Access the application:**

    Once the containers are up and running, you can access the application in your web browser at:

    ```
    http://localhost:3000
    ```

    The backend API will be available at:

    ```
    http://localhost:8080
	http://localhost:8080/graph/test (for testing the backend)
    ```

	The MariaDB database will be running on port 3306. Please make sure the root password is set correctly and the database name is `msGraph`. The connection URL should be:
	```
	jdbc:mariadb://mvp_db:3306/msGraph
	```

## Stopping the Application

To stop the running containers, press `Ctrl+C` in the terminal where `docker-compose` is running, or run the following command from the root directory of the project:

```sh
docker-compose down
```

## Troubleshooting
When running the docker-compose file if you encounter the following error:
```
 => ERROR [frontend internal] load metadata for docker.io/library/node:18-alpine
 ```
Please run the following command:
```
docker logout
docker login
rm ~/.docker/config.json
```
Then run the docker-compose file again.