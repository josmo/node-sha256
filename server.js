import express from 'express';
import config from 'config'
import cache from 'memory-cache';
import sha from 'sha256'
const router = express.Router();
const app = express();
const appPort = config.get('service.port');

app.use(express.json());
app.use('/v1', router);

app.listen(appPort, () => {
  console.log(`listening on ${appPort}`);
});


//TODO: data validation if contains correct objects and what not :) Also should probably use redis in future
router.post('/messages/', (req,res) => {
  const shaValue = sha(req.body.message);
  cache.put(shaValue, req.body.message);
  res.json({ digest:shaValue })
});


router.get('/messages/:id', (req,res) => {
  const message = cache.get(req.params.id);
  console.log(message);
  if (message === null) {
    res.status(404).send("Not Found");
  }
  res.json({message: message});

});

router.get('/healthcheck', (req, res) => {
 res.send('yep yep the service is up');
});

