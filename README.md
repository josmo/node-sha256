# node-sha256


## Info

https://node-sha256.grannec.com/v1/healthcheck -> should auto restart if service crashes (haven't tested fully)

Post '{"message":"something"}' content-type application/json to https://node-sha256.grannec.com/v1/messages - returns digest with sha256 value

Get https://node-sha256.grannec.com/v1/messages/:shaValue - gets back the message, 404 if none exsists

Deployed on k8s, with ingress ngix lb and letsencrypt


### Bottleneck

Right now it really only works with one service instance. It's using a k8s deployment so scaling horizontally would be simple but would need to move the inmem cache to redis or the likes



### Extra

[.drone.yml](.drone.yml) for the build info. Only builds and publishes docker image right now
