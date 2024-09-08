import { TicketModel } from "./models/ticket.model.js";

export default class TicketDao {
  
    async getTickets() {
        try {
            return await TicketModel.find({});
        } catch (error) {
            console.error("Error al obtener los tickets:", error);
            throw error;
        }
    }

  
    async createTicket(ticket) {
        try {
            await TicketModel.create(ticket);
            return await this.getTicketByCode(ticket.code);
        } catch (error) {
            console.error("Error al crear el ticket:", error);
            throw error;
        }
    }

  
    async getTicketByCode(ticketCode) {
        try {
            return await TicketModel.find({ code: ticketCode });
        } catch (error) {
            console.error("Error al obtener el ticket por código:", error);
            throw error;
        }
    }
}


