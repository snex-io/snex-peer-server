class MemoryBackend
{
    constructor() {
        this.items = new Map();
    }

    addClient(id, client) {
        if (!this.items.has(id)) {
            this.items.add(id, new Set());
        }
        this.items.get(id).add(client);
        return Promise.resolve();
    }

    getClients(id) {
        if (!this.items.has(id)) {
            return Promise.reject(new Error(`Channel ${id} not set`));
        }
        return Promise.resolve(this.items.get(id));
    }

    removeClient(id, client) {
        return this.getClients(id)
        .then(clients => {
            clients.delete(client);
            if (clients.size === 0) {
                this.items.delete(id);
            }
        });
    }
}

module.exports = MemoryBackend;
