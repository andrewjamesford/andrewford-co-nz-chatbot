# RAG Chatbot for andrewford.co.nz

![LlamaIndex](https://raw.githubusercontent.com/run-llama/LlamaIndexTS/main/docs/assets/logo.png)

## Purpose 

This is a simple chatbot that uses LlamaIndex to answer questions about the website andrewford.co.nz. It uses the website's content as a knowledge base and allows users to ask questions in natural language.
The chatbot uses a vector database to store the embeddings of the website's content and retrieves relevant information based on user queries.
The chatbot is built using Next.js and LlamaIndex, and it is designed to be easy to use and deploy. It can be used as a standalone application or integrated into other projects.

## Table of Contents



This is a [LlamaIndex](https://www.llamaindex.ai/) project using [Next.js](https://nextjs.org/) bootstrapped with [`create-llama`](https://github.com/run-llama/LlamaIndexTS/tree/main/packages/create-llama).

## Installation

First, install the dependencies:

```sh
npm install
```

## Quick Start

### Using NPM

Second, generate the embeddings of the documents in the `./data` directory:

```sh
npm run generate
```

Third, run the development server:

```sh
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

### Using Docker

1. Build an image for the Next.js app:

```sh
docker build -t <your_app_image_name> .
```

2. Generate embeddings:

Parse the data and generate the vector embeddings if the `./data` folder exists - otherwise, skip this step:

```sh
docker run \
  --rm \
  -v $(pwd)/.env:/app/.env \ # Use ENV variables and configuration from your file-system
  -v $(pwd)/config:/app/config \
  -v $(pwd)/data:/app/data \
  -v $(pwd)/cache:/app/cache \ # Use your file system to store the vector database
  <your_app_image_name> \
  npm run generate
```

3. Start the app:

```sh
docker run \
  --rm \
  -v $(pwd)/.env:/app/.env \ # Use ENV variables and configuration from your file-system
  -v $(pwd)/config:/app/config \
  -v $(pwd)/cache:/app/cache \ # Use your file system to store gea vector database
  -p 3000:3000 \
  <your_app_image_name>
```

## Learn More

To learn more about LlamaIndex, take a look at the following resources:

- [LlamaIndex Documentation](https://docs.llamaindex.ai) - learn about LlamaIndex (Python features).
- [LlamaIndexTS Documentation](https://ts.llamaindex.ai) - learn about LlamaIndex (Typescript features).

You can check out [the LlamaIndexTS GitHub repository](https://github.com/run-llama/LlamaIndexTS) - your feedback and contributions are welcome!

## License
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
