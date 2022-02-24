'use strict';
const Koa = require('koa');
const { TicketsService } = require('./tickets-service')
const koaBody = require('koa-body')
const {body} = require("koa/lib/response");
const app = new Koa();

app.use(koaBody({
    urlencoded: true,
}));

const PORT = process.env.PORT || 8000;

app.use(async ctx => {

    const { method } = ctx.request.query;

    ctx.response.set({
        // 'Access-Control-Allow-Origin': 'http://localhost:8888',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
    });

    switch (method) {
        case 'allTickets':
            ctx.response.body = TicketsService.getAll();
            return;
        case 'ticketById':
            {
                const {id} = ctx.request.query;
                ctx.response.body = TicketsService.findById(id);
            }
            return;
        case 'createTicket':
            const { name, description } = ctx.request.body;
            ctx.response.body = JSON.stringify(TicketsService.create(
                { name, description },
            ));
            return;
        case 'deleteTicket':
            {
                const { id } = ctx.request.query;
                ctx.response.body = JSON.stringify(TicketsService.delete(id));
            }
            return;
        case 'findOneAndUpdate':
            {
                const { id } = ctx.request.query;
                const { name, description, status } = ctx.request.body;
                ctx.response.body = JSON.stringify(TicketsService.findByIdAndUpdate(
                    id,
                    { name, description, status },
                ));
            }
            return;
        default:
            ctx.response.status = 404;
            return;
    }
});

app.listen(PORT);
