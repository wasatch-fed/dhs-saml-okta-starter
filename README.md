## Description

OKTA SAML nodejs TypeScript starter repository for DHS.

[Nest](https://github.com/nestjs/nest) nodejs backend framework.

[Okta](https://developer.okta.com/docs/concepts/saml/) for SAML.

## Installation

```bash
$ pnpm install
```

## Running the app

```bash
# development
$ pnpm run start

# watch mode
$ pnpm run start:dev

# production mode
$ pnpm run start:prod

# docker 
$ docker compose up -d

```
## Generate key and cert

  ### Create the server private key
  openssl genrsa -out oktapk.key 2048

  ### Create the certificate signing request (CSR)
  openssl req -new -key oktapk.key -out servercert.csr

  ### Sign the certificate using the private key and CSR
  openssl x509 -req -days 3650 -in servercert.csr -signkey oktapk.key -out dhscert.crt

  ### Generate Metadata
  http://localhost:3000/auth/meta

  Make sure to add config folder in the root directory of project and store cert and private key, refer saml.strategy.ts

## OKTA Authentication Process

  DHS OKTA will generate a 509 certificate with an entity Id and IDP entry point. Please ensure that the application callback URL is passed, as it will be called after a successful authentication request. A SAML response will then be generated with user information.
