# Matrix Bot APIs

## Overview
This project focusses on the reading of the unencrypted messages from a matrix channel and giving back the read messages. The project is responsible for:
1. Fetching appropriate channels/rooms associated to a server.
2. Fetching the historical messages associated to the room.
3. Reading live data.

For point 1 &2, GET apis are given. For point 3, the channel id is configured on the /conf/botConf.js. From that any message that comes in future of starting the bot is retrieved and printed(in blue).

### Running the server
To run the server, run:

```
npm run start
```

Once the server starts the service come logs of the port in which the service is running. Clicking on the api docs link will be redirecting to the api specs where we can test the 2 apis. The logs related to the live messages will also be coming to the console. Alternately, the swagger can be opened on the swagger editor.
