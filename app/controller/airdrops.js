const router = require('koa-router')();
const date = require("silly-datetime");
const utils = require('../../routes/tools/utils.js');
const config = require('../../conf/config.js');
const service = require('../service/service')
const sign = require('../../routes/tools/sign');
const db = require('../../routes/model/db.js');


/**
 * 
 * 设置NFT链接的网关
 * @param {NFT的网关地址，拼接tokenId作为NFT的链接，string类型} uri 
 **/
router.post('/baseUri', async (ctx) => {
	try {
		let uri = ctx.request.body.uri
		if (!uri) {
			ctx.body = { data: null, code: 1, msg: 'param[uri] is empty ' }
			return
		}
		await ctx.service.merkleclaimdropnftservice.setBaseURI(uri)
		ctx.body = {
			code: 0,
			msg: 'ok',
			data: uri
		}
	} catch (err) {
		ctx.body = { data: null, code: 1, msg: err.message }
	}
})


/**
* 查询opensea NFT 属性
* @param {NFT的唯一id，uint256类型  } tokenId     
**/
router.get('/metadatastructure', async (ctx) => {
	try {
		let tokenId = ctx.query.tokenId
		if (!tokenId) {
			ctx.body = { data: null, code: 1, msg: 'param[tokenId] is empty ' }
			return
		}
		let ret = await ctx.service.merkleclaimdropnftservice.getMetadatastructure(tokenId * 1)
		console.log("metadatastructure结果：" + ret)
		if (ret) {
			ctx.body = ret.structure
		} else {
			ctx.body = { data: null, code: 1, msg: 'no data' }
		}
	} catch (err) {
		ctx.body = { data: null, code: 1, msg: err.message }
	}
})

/**
 * 铸造NFT
 * 
 * @param {铸造给谁，address类型 } account 
 * @param {A human readable description of the item. Markdown is supported.  } description 
 * @param {This is the URL that will appear below the asset's image on OpenSea and will allow users to leave OpenSea and view the item on your site. } external_url 
 * @param {This is the URL to the image of the item. Can be just about any type of image (including SVGs, which will be cached into PNGs by OpenSea), and can be IPFS URLs or paths. We recommend using a 350 x 350 image. } image 
 * @param {Name of the item.  } nftname 
 * @param {To give your items a little more pizazz, we also allow you to add custom "attributes" to your metadata that will show up underneath each of your assets. } attributes 
 */
router.post('/openseaSafeMint', async (ctx) => {
	try {
		// account, description, external_url, image, name, attributes
		let account = ctx.request.body.account
		let description = ctx.request.body.description
		let external_url = ctx.request.body.external_url
		let image = ctx.request.body.image
		let nftname = ctx.request.body.nftname
		let attributes = ctx.request.body.attributes
		if (!account) {
			ctx.body = { data: null, code: 1, msg: 'param[account] is empty ' }
			return
		}
		if (!description) {
			ctx.body = { data: null, code: 1, msg: 'param[description] is empty ' }
			return
		}
		if (!external_url) {
			ctx.body = { data: null, code: 1, msg: 'param[external_url] is empty ' }
			return
		}
		if (!image) {
			ctx.body = { data: null, code: 1, msg: 'param[image] is empty ' }
			return
		}
		if (!nftname) {
			ctx.body = { data: null, code: 1, msg: 'param[nftname] is empty ' }
			return
		}
		if (!attributes) {
			ctx.body = { data: null, code: 1, msg: 'param[attributes] is empty ' }
			return
		}
		let tokenId = await ctx.service.merkleclaimdropnftservice.openseaSafeMint(account, description, external_url, image, nftname, attributes)
		ctx.body = {
			code: 0,
			msg: 'ok',
			data: tokenId
		}
	} catch (err) {
		ctx.body = { data: null, code: 1, msg: err.message }
	}
})

/**
 * 铸造NFT
 * @param {铸造给谁，address类型  } account     
 * @param {NFT的唯一id，uint256类型  } tokenId     
 **/
router.post('/safeMint', async (ctx) => {
	try {
		let account = ctx.request.body.account
		let tokenId = ctx.request.body.tokenId
		if (!account) {
			ctx.body = { data: null, code: 1, msg: 'param[account] is empty ' }
			return
		}
		if (!tokenId) {
			ctx.body = { data: null, code: 1, msg: 'param[tokenId] is empty ' }
			return
		}
		await ctx.service.merkleclaimdropnftservice.safeMint(account, tokenId)
		ctx.body = {
			code: 0,
			msg: 'ok',
			data: account
		}
	} catch (err) {
		ctx.body = { data: null, code: 1, msg: err.message }
	}
})

/**
 * 查询空投项目列表信息
 * 
 * @param {查询条件 } query  
 **/
router.get('/listDrop', async (ctx) => {
	try {
		// let tokenId = ctx.query.tokenId
		// if (!tokenId) {
		// 	ctx.body = { data: null, code: 1, msg: 'param[tokenId] is empty ' }
		// 	return
		// }
		let ret = await ctx.service.merkleclaimdropnftservice.listDrop("")
		ctx.body = {
			code: 0,
			msg: 'ok',
			data: ret
		}
	} catch (err) {
		ctx.body = { data: null, code: 1, msg: err.message }
	}
})

/**
 * 创建一批空投，批次从1自增
 * 
 * @param {一批空投的描述，主要用于前端展示，string类型  } info
 * @param {这批空投的merkleRoot，string类型  } merkleRoot
 * @param {A human readable description of the item. Markdown is supported.  } description 
 * @param {This is the URL that will appear below the asset's image on OpenSea and will allow users to leave OpenSea and view the item on your site. } external_url 
 * @param {This is the URL to the image of the item. Can be just about any type of image (including SVGs, which will be cached into PNGs by OpenSea), and can be IPFS URLs or paths. We recommend using a 350 x 350 image. } image 
 * @param {Name of the item.  } nftname 
 * @param {To give your items a little more pizazz, we also allow you to add custom "attributes" to your metadata that will show up underneath each of your assets. } attributes 
 * 
 **/
router.post('/createDrop', async (ctx) => {
	try {
		// 一批空投的描述，主要用于前端展示
		/**
		 * info:{
				name:'',
				officalSite:'',
				logoUri:'',   
				description:'',
				dropTotal:'',
			}
		 */
		let info = ctx.request.body.info
		let merkleRoot = ctx.request.body.merkleRoot
		// 用户组装opensea
		let description = ctx.request.body.description
		let external_url = ctx.request.body.external_url
		let image = ctx.request.body.image
		let nftname = ctx.request.body.nftname
		/**
		 * attributes:[
					{
						"trait_type": "Base",
						"value": "Starfish"
					},
				]
		 */
		let attributes = ctx.request.body.attributes
		if (!description) {
			ctx.body = { data: null, code: 1, msg: 'param[description] is empty ' }
			return
		}
		// if (!external_url) {
		// 	ctx.body = { data: null, code: 1, msg: 'param[external_url] is empty ' }
		// 	return
		// }
		if (!image) {
			ctx.body = { data: null, code: 1, msg: 'param[image] is empty ' }
			return
		}
		if (!nftname) {
			ctx.body = { data: null, code: 1, msg: 'param[nftname] is empty ' }
			return
		}
		if (!attributes) {
			ctx.body = { data: null, code: 1, msg: 'param[attributes] is empty ' }
			return
		}
		if (!info) {
			ctx.body = { data: null, code: 1, msg: 'param[info] is empty ' }
			return
		}
		if (!merkleRoot) {
			ctx.body = { data: null, code: 1, msg: 'param[merkleRoot] is empty ' }
			return
		}

		await ctx.service.merkleclaimdropnftservice.createDrop(info, merkleRoot, description, external_url, image, nftname, attributes)
		ctx.body = {
			code: 0,
			msg: 'ok'
		}
	} catch (err) {
		ctx.body = { data: null, code: 1, msg: err.message }
	}
})

/**
 * 查询用户信息
 * @param {用户钱包地址} address 
 * @returns 用户信息
 */
router.get('/getAddress', async (ctx) => {
	try {
		let address = ctx.query.address

		if (!address) {
			ctx.body = { data: null, code: 1, msg: 'param[address] is empty ' }
			return
		}
		let ret = await db.getAddress(address)
		ctx.body = {
			code: 0,
			msg: 'ok',
			data: ret
		}
	} catch (err) {
		ctx.body = { data: null, code: 1, msg: err.message }
	}
})

/**
 * 用户邮箱签名数据验签-验签成功-保存邮箱信息
 * obj : {
	"params": {
		"userAddress": "0xfd30d2c3....",
		"ts": 1647917339.229,
		"email": "lanbdeyr ",
		"tiwtter": "",
		"discord": ""
	},
	"signedData": "0x64..."
}
 * @param {*} obj 
 * @returns 
 */
router.post('/signUserMail', async (ctx) => {
	try {
		let _params = ctx.request.body.params
		let params = typeof _params === "string" ? JSON.parse(_params) : _params
		console.log(params, "_parama")
		let verifyMessage = JSON.stringify(params)
		console.log(verifyMessage, "verifyMessage")
		let signature = ctx.request.body.signedData
		let publicKey = params.userAddress
		if (!verifyMessage) {
			ctx.body = { data: null, code: 1, msg: 'param[params] is empty ' }
			return
		}
		if (!signature) {
			ctx.body = { data: null, code: 1, msg: 'param[signedData] is empty ' }
			return
		}
		let _sign = await sign.signUserMail(publicKey, verifyMessage, signature)
		if (_sign) {
			await db.saveAddress(publicKey, params)
			let ret = await db.getAddress(publicKey)
			ctx.body = {
				code: 0,
				msg: 'ok',
				data: ret
			}
		} else {
			ctx.body = { data: null, code: 1, msg: 'sign error' }
		}
	} catch (err) {
		console.log(err)
		ctx.body = { data: null, code: 1, msg: err.message }
	}
})

/**
 * 获取用户来领取NFT空投proof信息
 *  
 * @param {要领取的空投的批次Id，uint256类型   } dropId
 * @param {用户钱包地址   } address
 * @return {默克尔树的证明，string数组  }proof
 **/
router.get('/getClaimProof', async (ctx) => {
	try {
		let dropId = ctx.query.dropId
		let address = ctx.query.address
		if (!dropId) {
			ctx.body = { data: null, code: 1, msg: 'param[dropId] is empty ' }
			return
		}
		if (!address) {
			ctx.body = { data: null, code: 1, msg: 'param[address] is empty ' }
			return
		}
		let ret = await ctx.service.merkleclaimdropnftservice.getClaimProof(dropId, address)
		ctx.body = {
			code: 0,
			msg: 'ok',
			data: ret
		}
	} catch (err) {
		ctx.body = { data: null, code: 1, msg: err.message }
	}
})

/**
 * 用户来领取NFT空投
 *  * 
 * @param {NFT的拥有者，address类型   } address
 * @param {要领取的空投的批次Id，uint256类型   } dropId
 * @param {要领取的NFT的tokenId，uint256类型   } tokenId
 * @param {默克尔树的证明，数组  } proof
 **/
router.get('/claim', async (ctx) => {
	try {
		let address = ctx.query.address
		let dropId = ctx.query.dropId
		let tokenId = ctx.query.tokenId
		let proof = ctx.query.proof
		if (!address) {
			ctx.body = { data: null, code: 1, msg: 'param[dropId] is empty ' }
			return
		}
		if (!dropId) {
			ctx.body = { data: null, code: 1, msg: 'param[dropId] is empty ' }
			return
		}
		if (!tokenId) {
			ctx.body = { data: null, code: 1, msg: 'param[tokenId] is empty ' }
			return
		}
		if (!proof) {
			ctx.body = { data: null, code: 1, msg: 'param[proof] is empty ' }
			return
		}
		let ret = await ctx.service.merkleclaimdropnftservice.claim(address, dropId, tokenId, proof)
		ctx.body = {
			code: 0,
			msg: 'ok',
			data: ret
		}
	} catch (err) {
		ctx.body = { data: null, code: 1, msg: err.message }
	}
})

/**
 * 查询某个NFT的http链接
 * 
 * @param {NFT的tokenId，uint256类型 } tokenId
 * @return {NFT的http链接，string类型} uri     
 **/
router.get('/tokenURI', async (ctx) => {
	try {
		let tokenId = ctx.query.tokenId
		if (!tokenId) {
			ctx.body = { data: null, code: 1, msg: 'param[tokenId] is empty ' }
			return
		}
		let uri = await ctx.service.merkleclaimdropnftservice.tokenURI(tokenId)
		ctx.body = {
			code: 0,
			msg: 'ok',
			data: uri
		}
	} catch (err) {
		ctx.body = { data: null, code: 1, msg: err.message }
	}
})
/**
 * 查询某个NFT的持有人是谁
 * 
 * @param {NFT的tokenId，uint256类型 } tokenId
 * @return {NFT的拥有者，address类型} account 
 **/
router.get('/ownerOf', async (ctx) => {
	try {
		let tokenId = ctx.query.tokenId
		if (!tokenId) {
			ctx.body = { data: null, code: 1, msg: 'param[tokenId] is empty ' }
			return
		}
		let account = await ctx.service.merkleclaimdropnftservice.ownerOf(tokenId)
		ctx.body = {
			code: 0,
			msg: 'ok',
			data: account
		}
	} catch (err) {
		ctx.body = { data: null, code: 1, msg: err.message }
	}
})
/**
 * 查询某个用户名下有多少个NFT
 * 
 * @param {NFT的拥有者，address类型 } account
 * @return {该用户拥有多少个NFT} balance 
 **/
router.get('/balanceOf', async (ctx) => {
	try {
		let account = ctx.query.account
		if (!account) {
			ctx.body = { data: null, code: 1, msg: 'param[account] is empty ' }
			return
		}
		let balance = await ctx.service.merkleclaimdropnftservice.balanceOf(account)
		ctx.body = {
			code: 0,
			msg: 'ok',
			data: balance * 1
		}
	} catch (err) {
		ctx.body = { data: null, code: 1, msg: err.message }
	}
})


module.exports = router.routes();