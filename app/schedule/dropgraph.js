const config = require('../../conf/config.js');
const Subscription = require('./subscription')
const db = require('../../routes/model/db')
const ethers = require('ethers')
const BigNumber = ethers.BigNumber
const Service = require('../service/service')

class DropGraph extends Subscription {

    get schedule() {
        // Execute a cron job every 1 Minutes 
        // return '*/1 * * * *'
        return '*/10 * * * * * '
    }

    async subscribe() {
        console.log('drop graph subscribe')
        let assets = await this.service.graph.swapAddlpUser(config.graph.subgraphs.quick)
        console.log(assets)
    }

    async handleEvent(id, amount, info, info2) {
        // console.log('handle event')
        let nft = {
            id: id,
            amount: amount,
            info: info,
            rules: info2
        }
        console.log('drop graph event:', JSON.stringify(nft))
        await db.deleteObj(db.Collections.nft, {id: id})
        await db.save(db.Collections.nft, nft)
    }
}

module.exports = DropGraph