const router = require('koa-router')()
const sign = require('./tools/sign.js')

/**
 * {
    "params": {
        "userAddress": "0xfd30d2c32e6a22c2f026225f1ceea72bfd9de865",
        "ts": 1647941407.373,
        "email": "Jobs",
        "tiwtter": "",
        "discord": ""
    },
    "signedData": "0xd59d7f89250f516e84a7b980ef8f12c4b7b7ac9430c970d5540addd72fef1ad463c55d73c409c2a95203af933024d66717dd130df7e6ef4f795bc87d931251ab1c"
}
 */
/**
 * 用户邮箱签名数据
 * @param {公钥地址} publicKey 
 * @param {验签内容} verifyMessage 
 * @param {签名} signature
 * @returns true / false
 */
function signUserMail() {
    let param={
        "userAddress": "0xfd30d2c32e6a22c2f026225f1ceea72bfd9de865",
        "ts": 1647941407.373,
        "email": "Jobs",
        "tiwtter": "",
        "discord": ""
    }
    let verifyMessage = JSON.stringify(param)
    let publicKey = param.userAddress
    let signature = '0xd59d7f89250f516e84a7b980ef8f12c4b7b7ac9430c970d5540addd72fef1ad463c55d73c409c2a95203af933024d66717dd130df7e6ef4f795bc87d931251ab1c'
    console.log(sign.signUserMail(publicKey, verifyMessage, signature))
}
// signUserMail()
/*================================= NFT签名数据 ================================*/
router.get('/getNFTClaimData', async (ctx) => {
    try {
        // let body = {}
        // body.id = ctx.request.body.id
        // body.spender = ctx.request.body.spender
        // body.deadline = ctx.request.body.deadline

        //test
        let body = {
            id: '1',
            spender: '0xE44081Ee2D0D4cbaCd10b44e769A14Def065eD4D',
            deadline: '1627457471'
        }

        let vrs = sign.signERC1155Claim(body)

        ctx.body = { data: vrs, code: 0, msg: 'success' }
    } catch (err) {
        ctx.body = { data: null, code: 1, msg: err.message }
    }
})



/*================================= ERC20签名数据 ================================*/
router.get('/getERC20ClaimData', async (ctx) => {
    try {
        // let obj = {}
        // obj.token = ctx.request.body.token
        // obj.owner = ctx.request.body.owner
        // obj.spender = ctx.request.body.spender
        // obj.value = ctx.request.body.value
        // obj.deadline = ctx.request.body.deadline

        //test
        let body = {
            token: '0x55d398326f99059ff775485246999027b3197956',
            owner: '0xE44081Ee2D0D4cbaCd10b44e769A14Def065eD4D',
            spender: '0x37f88413AADb13d85030EEdC7600e31573BCa3c3',
            value: '1000000000000000000',
            deadline: '1627457471'
        }

        let vrs = sign.signERC20Claim(body)

        ctx.body = { data: vrs, code: 0, msg: 'success' }
    } catch (err) {
        ctx.body = { data: null, code: 1, msg: err.message }
    }
})


module.exports = router.routes()