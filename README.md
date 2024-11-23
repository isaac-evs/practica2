# practica2

This project is a simple to-do app based in FastAPI, REAC an MongoDB. It is intended to run locally using Docker to ensure a consistent and isolated environment across all platforms.

### Prerequisites

Before running this app, ensure the following tools are installed on your system:

1.	Docker:
Install Docker following the instructions for your operating system:
https://docs.docker.com/get-docker/

2.	Docker Compose:
If you’re using Docker CLI without the integrated docker compose plugin, install Docker Compose:
https://docs.docker.com/compose/install/

### Getting Started

Clone the repository 

```bash
git clone https://github.com/isaac-evs/practica2.git
```
```bash
cd practica2
```

Add your own .env file with MongoDB conenction

```bash
touch .env
```

Insert in the file: 

- MONGODB_URI = [your URI]

Build and Run the App

```bash
docker-compose pull
```

```bash
docker-compose build
```

```bash
docker-compose up
```

### Access the App

Open your browser and go to: http://localhost:8000
