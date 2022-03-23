
const dropnft = require('./dropnft')
const droperc = require('./droperc')
const dropgraph = require('./dropgraph')
const merkleclaimdropnfttask = require('./merkleclaimdropnfttask')

var _ctx

function context() {
    if (!_ctx) {
        throw new Error('schedule need load first.')
    }
    return _ctx
}

function load (ctx) {
    if (!_ctx) {
        _ctx = ctx
        _ctx.schedule = ctx.schedule || {}
    }
    // if (!_ctx.schedule.dropgraph) {
    //     console.log(_ctx.schedule.dropgraph,"_ctx.schedule.dropgraph==>>")
    //     _ctx.schedule.dropgraph = new dropgraph(ctx)
    // }
    if (!_ctx.schedule.dropnft) {
        console.log(_ctx.schedule.dropnft,"_ctx.schedule.dropnft==>>")
        _ctx.schedule.dropnft = new dropnft(ctx)
    }
    if (!_ctx.schedule.droperc) {
        console.log(_ctx.schedule.droperc,"_ctx.schedule.droperc==>>")
        _ctx.schedule.droperc = new droperc(ctx)
    }
    if (!_ctx.schedule.merkleclaimdropnfttask) {
        console.log(_ctx.schedule.merkleclaimdropnfttask,"_ctx.schedule.merkleclaimdropnfttask==>>")
        _ctx.schedule.merkleclaimdropnfttask = new merkleclaimdropnfttask(ctx)
    }
    console.log('load schedule!')
    return _ctx
}

module.exports = {
    context: context,
    load: load
}