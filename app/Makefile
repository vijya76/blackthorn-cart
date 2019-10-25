# Database Functions
export PGPASSWORD ?= $(DB_PASSWORD)
export DB_ENTRY ?= psql -h $(DB_HOST) -d $(DB_NAME) -p $(DB_PORT) -U $(DB_USER)

wait-for-postgres:
	while ! nc -zv ${DB_HOST} ${DB_PORT}; do echo waiting for postgresql ..; sleep 1; done;

create-db:
	$(DB_ENTRY) ${DEFAULT_DB} -tc "SELECT 1 FROM pg_database WHERE datname = '${DB_NAME}'" | grep -q 1 || $(DB_ENTRY) ${DEFAULT_DB} -c 'CREATE DATABASE "${DB_NAME}"';

migrate-db: clean compile wait-for-db
	@./node_modules/.bin/typeorm migration:run

drop-db: wait-for-db
	@$(DB_ENTRY) ${DEFAULT_DB} -c 'Drop DATABASE "${DB_NAME}"';

wait-for-db: wait-for-postgres
	while ! $(DB_ENTRY) ${DB_NAME} -c "select 1"; do echo postgresql starting ..; sleep 1; done;

set-up-db: wait-for-postgres create-db migrate-db

reset-db: wait-for-db drop-db create-db migrate-db

# Build and Compile
clean:
	@rm -rf ./dist

# Compile Typescript project
compile:
	@npx babel . -d ./dist -s \
		--copy-files  --extensions ".js,.jsx,.ts,.tsx" --verbose \
		--ignore dist,node_modules,yarn-v1.13.0,__mocks__,chart,node_modules,asdf,postman,test

compile-ts:
	@node_modules/.bin/tsc -p .

# Lint Typescript project
lint:
	npx eslint src/ --ext=ts,js --fix

# Build Typescript project
build: clean compile

check-install-deps:
	node bin/check-install-dependencies.js

start_server: check-install-deps
	node --inspect babel-loader.js ./src/server

killstart:
	node --inspect babel-loader.js ./src/server

dev_server: check-install-deps
	npx concurrently --names "SERVER,LINT" -c "bgBlue.bold,bgMagenta.bold" "npx nodemon --exec 'make killstart'" "npx nodemon --exec 'make lint'"
