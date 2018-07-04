# node-sha256


## Info

https://node-sha256.grannec.com/v1/healthcheck -> should auto restart if service crashes (haven't tested fully)

Post '{"message":"something"}' content-type application/json to https://node-sha256.grannec.com/v1/messages - returns digest with sha256 value

Get https://node-sha256.grannec.com/v1/messages/:shaValue - gets back the message, 404 if none exsists

Get https://node-sha256.grannec.com/v1/xs/:stringValue - if you set stringValue '1x1x' will return an array of all the binary variations for in place of x

Get https://node-sha256.grannec.com/v1/items/:value - if you set value to '1500' it will return the closest under matching pair from the itemOptions map in server.js

Deployed on k8s, with nginx ingress and uses letsencrypt for ssl


### Bottleneck

Right now it really only works with one service instance. It's using a k8s deployment so scaling horizontally would be simple but would need to move the inmem cache to redis or the likes



### Extra

[.drone.yml](.drone.yml) for the build info. Only builds and publishes docker image right now
