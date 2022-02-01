# iorio_apps

**NOTE**: Docker is only used in production

## **Development environment**

## Project setup

```

npm install

```

### Compiles and hot-reloads for development

```

npm run serve

```

### Run unit tests

```

npm run test:unit

```

### Lint and fix files

```

npm run lint

```

## **Production**

### Build docker image

```

docker-compose build

```

The Dockerfile automatically runs `npm run build`, which compiles and minifies the front-end code.

### Run container

```

docker-compose up -d

```

---

## **Environment Variables**

### Development

Simply declare your variables in `.env` file

<span style="color: red">Variables must follow the naming convention: **VUE_APP_VARIABLE_NAME**</span>
<span style="color: red">New variables are only seen upon **Node** Server restart</span>

### Production

Since production code is precompiled, variables cannot be easily changed on-the-fly. This project follows a strategy presented in https://medium.com/js-dojo/vue-js-runtime-environment-variables-807fa8f68665

The idea is to use the entrypoint to lock for regular expression coinciding with env vars names and substitute them with values coming from the .env file.
Each new variable needed in the project requires a new image build. For already existing variables, on the other hand, the value can be changed within `.env*` files and it is immediately reflected upon container restart.

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).
