const config = require('../../conf/config.js');
const Subscription = require('./subscription')
const db = require('../../routes/model/db')
const ethers = require('ethers')
const BigNumber = ethers.BigNumber

class MerkleClaimDropsNFT721 extends Subscription {

    get schedule() {
        // Execute a cron job every 1 Minutes 
        // return '*/1 * * * *'
        return '*/10 * * * * * '
    }


    /**
     * 空投项目事件
     */
    async subscribe() {

        if (!this.isWatching) {
            const ctx = this
            console.log('watching nft merkle_claim_drop_nft.')
            this.isWatching = true

            try {
                // event CreateDrop(uint256 id, string info, bytes32 merkleRoot);
                this.service.merkleclaimdropnftservice.contract.on('CreateDrop', (id, info, merkleRoot) => {
                    console.log('createDrop nft event:', id, info, merkleRoot)
                    ctx.handleEvent(id.toString(), info, merkleRoot.toString())
                })
            } catch (e) {
                this.isWatching = false
                console.log(e)
            }
        }

    }

    async handleEvent(dropid, info, merkleRoot) {
        // console.log('handle event')
        let airdrops = {
            dropid: dropid,
            info: JSON.parse(info),
            merkleRoot: merkleRoot
        }
        console.log('createdrop nft event:', JSON.stringify(airdrops))
        await db.deleteObj(db.Collections.airdrops, { dropid: dropid })
        await db.save(db.Collections.airdrops, airdrops)
    }
}

module.exports = MerkleClaimDropsNFT721