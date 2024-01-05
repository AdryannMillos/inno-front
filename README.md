# Vite/React News Aggregator

This project is a news aggregator built with Vite and React, designed to aggregate and display news articles from various sources.

## Getting Started

### Prerequisites
Make sure you have docker and docker-compose installed on your machine.

### Installation

1. Clone the repository:

    ```
    git clone https://github.com/AdryannMillos/inno-front.git
    ```

2. Change into the project directory:

    ```
    cd inno-front
    ```

3. Create a .env file
 
Create a .env file in the project root based on the provided .env.example. Update the variables as needed.

VITE_BASE_URL=your_base_url

4. Docker:

    ```
   docker build -t news-aggregator .
   docker run -p 80:80 news-aggregator
    ```

Open http://localhost:80 in your browser to view the application running in a Docker container.


