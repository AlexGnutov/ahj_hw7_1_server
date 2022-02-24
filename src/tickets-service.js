const {tickets} = require('./tickets');

class TicketsService {
    static create(ticketData) {
        const name = ticketData.name || 'Name: to be defined';
        const description = ticketData.description || 'Description: to be added';
        const newTicket = {
            id: `1000${tickets.length + 1}`,
            name,
            description,
            status: 'incomplete',
            created: new Date().toLocaleString(),
        };
        tickets.push(newTicket);
        return newTicket;
    }

    static getAll() {
        return tickets;
    }

    static findById(id) {
        return tickets.find((ticket) => ticket.id === id);
    }

    static findByIdAndUpdate(id, data) {
        const renewTicket = tickets.find((ticket) => ticket.id === id);
        const { name, description, status } = data;
        renewTicket.name = name || renewTicket.name;
        renewTicket.description = description || renewTicket.description;
        renewTicket.status = status || renewTicket.status;
        return renewTicket;
    }

    static delete(id) {
        const ticketIndex = tickets.findIndex((ticket) => ticket.id === id);
        const result = tickets.splice(ticketIndex, 1);
        if (result.length === 1) {
            return {
                result: true,
                messages: `${id} deleted`,
            };
        }
        return {
            result: false,
        };
    }
}

module.exports = { TicketsService };
