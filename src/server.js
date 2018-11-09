import express          from 'express';
import bodyParser       from 'body-parser';

export default class WebServer {
    constructor(serverName) {
        this.port = process.env.PORT || '8081';
        this.server = null;
        this.serverName = serverName;
        this.serverInstance = null;
    }

    async init() {
        //*** Initialize the Web Server ***
        this.server = express();
        this.server.on('error', (err) => {
            if(err.code === 'EADDRINUSE') {
                console.log("info", this.serverName + ' | Port(' + this.port + ') Already in Use');
            } else {
                console.log("info", this.serverName + ' | Web Server Error: ' + err);
            }
            process.exit(1);
        });

        //*** GLOBAL Pre-Processing Routes ***
        this.server.use(bodyParser.json());
        this.server.use(bodyParser.urlencoded({ extended: false }));

        //*** GLOBAL Catch-All Route ***
        this.server.get("/", function(req, res) {
            res.send('254ab53b790f2b3aab80bccb6dbe018a0c6769f3');
        }.bind(this));
        this.server.post("/", function(req, res) {
            console.log("BODY: " + JSON.stringify(req.body));
            res.status(200).send();
        }.bind(this));
    }

    async shutdown() {
        return new Promise(async (resolve) => {
            try {
                this.serverInstance.close(() => {
                    return resolve();
                });
            } catch(err) {
                console.log('Webserver Shutdown Error: ' + err);
                return resolve();
            }
        });
    }

    serve() {
        //*** Get the Party Started...
        this.serverInstance = this.server.listen(this.port, () => {
            console.log(this.serverName + ' | Web Server Listening on ' + this.port);
        });
    }

}