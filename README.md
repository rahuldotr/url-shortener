# README

This project generates short URLs from original URLs using Node.js with Express.js for the backend API and Vue.js with Vuetify for the frontend web app. 

## Getting Started

To run this project, you'll need to have Docker installed on your local machine. Once you have Docker installed, follow these steps:

1. Clone the repository onto your local machine.

```bash
git clone https://github.com/rahuldotrnair/url-shortener.git
```

2. Change into the project directory.

```bash
cd url-shortener
```

3. Run the project using Docker Compose.

```bash
docker-compose up
```

The project will start running on your local machine. You can access the frontend web app at ```http://localhost:8080``` and the backend API at ```http://localhost:8081```.


## API Endpoint

The API endpoint used to generate short URLs is ```http://localhost:8081```. It accepts a POST request with a JSON body containing the original URL.

Example Request:

```bash
POST http://localhost:8081
Content-Type: application/json

{
  "url": "https://www.google.com"
}
```

Example Response:

```bash
{
    "id": "645771e86e6e86b64db5cae3",
    "url": "https://www.google.com",
    "shortened_url": "2gWKoFYm",
    "ip": "127.0.0.1",
    "created_at": "2023-05-07T15:30:00.000Z",
    "expire_at": "2023-05-14T15:30:00.000Z"
}
```

## Frontend Web App

The frontend web app is located at ```http://localhost:8080```. It allows users to enter a URL and generate a short URL.