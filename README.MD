docker rm -f anemometerapi

docker rm -f postgresql-anemometer

docker network rm anemometernet

docker network create --subnet 172.20.0.0/16 anemometernet

<!-- postgres://dockernetworkdemo:123@localhost:5432/dockernetworkdemo -->

docker run --name dockernetworkdemopg -p 6543:5432 -e POSTGRES_PASSWORD=123 -e POSTGRES_USER=postgres -e POSTGRES_DB=postgres -d postgres:10-alpine

#cat ./dbmigrate.sql | docker exec -i postgresql-anemometer psql -U anemometer -d anemometer

docker network connect --ip 172.20.0.5 anemometernet postgresql-anemometer

#cat ./dbmigrate.sql | docker exec -i postgresql-anemometer psql -U anemometer -d anemometer

docker run --name anemometerapi -p 3001:3001 -d batman/anemometerapislim

docker network connect anemometernet anemometerapi

sleep 10

cat ./dbmigrate.sql | docker exec -i postgresql-anemometer psql -U anemometer -d anemometer
