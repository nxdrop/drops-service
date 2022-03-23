/*文件上传*/
const ethers = require('ethers')
const ethersutils = ethers.utils
const router = require('koa-router')();
const path = require('path');
const fs = require('fs');
const os = require('os');
const date = require("silly-datetime");
const utils = require('./tools/utils.js');
const config = require('../conf/config.js');
const db = require('./model/db.js');


//单文件上传
router.post('/users', async (ctx) => {
	if (!ctx.request.files) {
		ctx.body = { data: null, code: 1, msg: 'file not exists' }
		return
	}

	try {

		let file = ctx.request.files.file
		const fileReader = fs.readFileSync(file.path);
		//console.log(fileReader.toString());
		const address = []
		// 1.获取文件数据分组
		let dd = fileReader.toString().split(os.EOL)
		for (i = 0; i < dd.length; i++) {
			try {
				dd[i] = dd[i].replace("\r", "")
				// 检查是否有效地址
				address.push(ethersutils.getAddress(dd[i]))
			} catch (error) {
			}
		}
		// 处理用户信息
		await db.saveMuiltAddress(address)
		//console.log(address,"--------------");

		let ret
		//console.log(address.length,"address.length")
		if (address.length > 0) {
			// 生成默克尔空投信息
			console.log(address.length, "saveMerkleAddress======start")
			ret = await db.saveMerkleAddress(address)
		}

		ctx.body = {
			code: 0,
			msg: 'ok',
			data: ret
		}
	} catch (error) {
		ctx.body = {
			code: 1,
			msg: 'err',
			data: error
		}
	}
})


module.exports = router.routes();