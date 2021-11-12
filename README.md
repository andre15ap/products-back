# products back
Typescript project developed using clean code and clean architecture.
Integration with aw3 Amazon to save image files.
Project using MongoDb non-relational database

## Installation

Product Back requires [Node.js](https://nodejs.org/) v14+ and MongoDb to run.

add environment variables, follow .env-example example

Install the dependencies and devDependencies and run debug.

```sh
cd products-back
yarn
yarn dev
```

Link dev server [http://localhost:3000](http://localhost:3000).

For testing Authentication with Bearer Token and Json Request

Route create product (POST /products) Multpart Form

## Features

- Create user (public route) POST /users
  - Payload { name: string, password: string, email: string }
- List users (authenticate route) GET /users
  - No Payload
- Remove user (authenticate route) DELETE /users
  - Payload { id: string  }
- Authenticate user (public route) POST /auth
  - Payload { name: string, password: string }
- Create product (authenticate route) POST /products
  - Payload { name: string, description?: string, price: number, image: File }
- List products (public route) GET /products
  - No Payload
- remove product (authenticate route) DELETE /products
  - Payload { id: string  }
- Create app-hit (public route) POST /app-hits
  - Payload { namespace: string, key: string, value: string  }
- List app-hit (authenticate route) GET /app-hits
  - No Payload
- remove app-hit (authenticate route) DELETE /app-hits
  - Payload { id: string  }
