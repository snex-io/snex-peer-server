class ChannelManager {
    constructor(backend) {
        this.backend = backend;
    }

    addClient(id, client) {
        return this.backend.add(id, client);
    }

    getClients(id) {
        return this.backend.get(id, client);
    }

    removeClient(id) {
        this.backend.remove(id, client);
    }
}

module.exports = ChannelManager;
