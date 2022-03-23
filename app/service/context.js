
const eth = require('./eth')
const polygon = require('./polygon')
const chainlink = require('./chainlink')
const graph = require('./graph')

const verify = require('./verify')

const merkleclaimdropnftservice = require('./merkleclaimdropnftservice')
var _ctx

function service() {
    if (!_ctx) {
        throw new Error('service need load first.')
    }
    return _ctx.service
}

function load (ctx) {
    if (!_ctx) {
        _ctx = ctx
        _ctx.service = ctx.service || {}
    }
    if (!_ctx.service.eth) {
        console.log(_ctx.service.eth,"_ctx.service.eth==>>")
        _ctx.service.eth = new eth(ctx)
    }
    if (!_ctx.service.polygon) {
        console.log(_ctx.service.polygon,"_ctx.service.polygon==>>")
        _ctx.service.polygon = new polygon(ctx)
    }
    if (!_ctx.service.chainlink) {
        console.log(_ctx.service.chainlink,"_ctx.service.chainlink==>>")
        _ctx.service.chainlink = new chainlink(ctx)
    }
    if (!_ctx.service.graph) {
        console.log(_ctx.service.graph,"_ctx.service.graph==>>")
        _ctx.service.graph = new graph(ctx)
    }
    if (!_ctx.service.verify) {
        console.log(_ctx.service.verify,"_ctx.service.verify==>>")
        _ctx.service.verify = new verify(ctx)
    }
    if (!_ctx.service.merkleclaimdropnftservice) {
        console.log(_ctx.service.merkleclaimdropnftservice,"_ctx.service.merkleclaimdropnftservice==>>")
        _ctx.service.merkleclaimdropnftservice = new merkleclaimdropnftservice(ctx)
    }
    console.log('load service!')
    return _ctx
}

module.exports = {
    service: service,
    load: load
}