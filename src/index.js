import "babel-polyfill";
import WebServer from './server';

let webServer = new WebServer('random-post');
webServer
    .init()
    .then(() => {
        webServer.serve();
    })
    .catch((err) => {
        console.log("Web Server Startup Error: " + err);
    });

process.on('uncaughtexception', () => {
    console.log('Uncaught Exception, Attempting Graceful Shutdown');
    process.exit(1);
});

process.on('error', () => {
    console.log('Error, Attempting Graceful Shutdown');
    process.exit(1);
});

process.on('exit', async () => {
    console.log("Shutting Down Web Server");
    try {
        await webServer.shutdown();
    } catch(err) {
        console.log("Error Shutting down Web Server: " + err);
    }
});
