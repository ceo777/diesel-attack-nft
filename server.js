// Diesel Attack NFT backend server 1.1.0

const port = process.env.PORT || 4000;

// You should create api.log file in project root directory if it doesn't exist

const fastify = require('fastify')({
    logger: {
        level: 'info',
        file: './api.log'
    }
});

fastify.register(require('./routes/api'));

const start = async () => {
    try {
        await fastify.listen({port});
        console.log(`Diesel Attack NFT backend server v1.1.0 is listening at localhost: ${port}`);
    } catch (err) {
        fastify.log.error(err);
        process.exit(1);
    }
}
start();