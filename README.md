## Simple Uber
This is an educational project to show a simple Uber backend architecture.

## Install
1.`git clone` from master

2.`npm install` to install all dependencies

3.`git submodule update --init` to install [s2-geometry-library](https://github.com/micolous/s2-geometry-library/tree/b42d582e0d3986c44d18bc04dd074e6546181aa7)

## Run
1.`node simpleuber/simple_uber.js -n geo_sharding -s 3` to run three nodes on local address 

2.`node simpleuber/simple_uber.js -n geo_sharding2 -s 3 -p 3003 -b '["127.0.0.1:3000"]'` to add three nodes into cluster (known bug: could not add into cluster that is runnign on different ip address)

3.`curl -X GET '127.0.0.1:6000/loc?lat=10&log=20'` to test geo-based sharding

You should get this `Ringpop 127.0.0.1:3000 handled direct request  { lat: '10', log: '20' }  in cell 1236273900560580608`

4.`curl -X GET '127.0.0.1:6000/loc?lat=10&log=22'` to test another geo-based sharding

You should get this `Ringpop 127.0.0.1:3001 handled forward request  { lat: '10', log: '22' }  in cell 1236947351432593408`

# Tentative Architecture
![Uber Architecture](/img/uber_backend_architecture.png "Uber Architecture")

# Next Step
In near future, I'm going to...

1. Add different requests to this backend system to implement Uber's most basic features, including updating drivers' location/status, handling riders' requests.

2. Use [Riak](http://basho.com/products/riak-kv/) as a backup database to increment fault-tolerance.

3. Add business when adding/removing nodes so to make full use of consistent hashing.

4. Use Kafka as streaming information provider and gatherer.

# Reference
To know more about uber's backend architecture, checkout this [tech talk](http://basho.com/posts/technical/ubers-ringpop-and-riak/).

Here are some good references for...

### consistent hashing
[Consistent hashing](http://michaelnielsen.org/blog/consistent-hashing/)

[A number-theoretic approach to consistent hashing](http://michaelnielsen.org/blog/a-number-theoretic-approach-to-consistent-hashing/)

### SWIM membership protocol
[THE SWIM MEMBERSHIP PROTOCOL](http://prakhar.me/articles/swim/)

[SWIM: Scalable Weakly-consistent Infection-style Process Group Membership Protoco](https://www.cs.cornell.edu/~asdas/research/dsn02-swim.pdf)


