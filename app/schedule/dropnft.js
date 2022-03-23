const config = require('../../conf/config.js');
const Subscription = require('./subscription')
const DropABI = require('../../res/abi/DeDropsNFT.json').abi
const db = require('../../routes/model/db')
const ethers = require('ethers')
const BigNumber = ethers.BigNumber

class DropNFT extends Subscription {

    get schedule() {
        // Execute a cron job every 1 Minutes 
        // return '*/1 * * * *'
        return '*/10 * * * * * '
    }

    async subscribe() {
        console.log('drop nft subscribe')
        if(config.test){
            let info = {"id":"3","amount":"100","info":"{\"name\":\"Unconditional claim\",\"imgUrl\":\"http://img.aibyb.com.cn/files/airnft.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=wangbin%2F20220222%2F%2Fs3%2Faws4_request&X-Amz-Date=20220222T024653Z&X-Amz-Expires=604800&X-Amz-SignedHeaders=host&X-Amz-Signature=fa91c95f13fa0f149967955fa095f0508ac4a2838f3dee7beb436e08d1bd77ab\",\"desc\":\"\",\"nftCount\":\"100\"}","rules":"{\"actions\":null,\"money\":0}"}
            info.info = JSON.parse(info.info)
            info.rules = JSON.parse(info.rules)
            let rules = {"actions":[{"key":"sushi-swap","count":"1"},{"key":"gitcoin-grant","count":"1"}],"money":0}
            this.handleEvent(info.id, info.amount, info.info, info.rules)
            return
        }
        if (!this.isWatching) {
            const ctx = this
            console.log('watching nft drop.')
            this.isWatching = true

            try {
                let addr = config.polygon.contract.drop_nft
                console.log('contract', addr)
                let contract = this.service.polygon.getContract(addr, DropABI)

                contract.on('Drop', (id, amount, info, info2) => {
                    console.log('drop nft event:',id, amount, info, info2)
                    ctx.handleEvent(id.toString(), amount.toString(), JSON.parse(info), JSON.parse(info2))
                })
            } catch (e) {
                this.isWatching = false
                console.log(e)
            }
        }

    }

    async handleEvent(id, amount, info, info2) {
        // console.log('handle event')
        let nft = {
            id: id,
            amount: amount,
            info: info,
            rules: info2
        }
        console.log('drop nft event:', JSON.stringify(nft))
        await db.deleteObj(db.Collections.nft, {id: id})
        await db.save(db.Collections.nft, nft)
    }
}

module.exports = DropNFT