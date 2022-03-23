const { BigNumber, utils } = require('ethers')
const MongoClient = require('mongodb').MongoClient
const config = require('../../conf/config.js')
const { MerkleTree } = require('merkletreejs')
const keccak256 = require('keccak256')

const Collections = {
    nft: 'nft',
    nftclaims: 'nftclaims',
    erc20: 'erc20',
    erc20claims: 'erc20claims',
    targetuser: 'targetuser',
    merkletree: 'merkletree',
    airdrops: 'airdrops',
    tokenIds: 'tokenIds',
    airdropsclaims: 'airdropsclaims',
    nftMetadataStructure: 'nftMetadataStructure',
}

async function createCollection(collection) {
    let conn = null
    try {
        conn = await MongoClient.connect(config.db_url(), { useUnifiedTopology: true })
        await conn.db(config.db_name).createCollection(collection)
    } catch (err) {
        console.log('[db][createcollection][ERROR]：' + err.message)
        throw err
    } finally {
        if (conn) conn.close()
    }
}

async function listCollections(filter) {
    let conn = null
    try {
        conn = await MongoClient.connect(config.db_url(), { useUnifiedTopology: true })
        return await conn.db(config.db_name).listCollections()
    } catch (err) {
        console.log('[db][listcollection][ERROR]：' + err.message)
        throw err
    } finally {
        if (conn) conn.close()
    }
}

async function save(collection, obj) {
    let conn = null
    try {
        conn = await MongoClient.connect(config.db_url(), { useUnifiedTopology: true })
        let dbcollection = conn.db(config.db_name).collection(collection)

        obj.time = Date.now()
        await dbcollection.insertOne(obj)
    } catch (err) {
        console.log('[db][save][ERROR]：' + err.message)
        throw err
    } finally {
        if (conn) conn.close()
    }
}

async function insertMany(collection, obj) {
    let conn = null
    try {
        conn = await MongoClient.connect(config.db_url(), { useUnifiedTopology: true })
        let dbcollection = conn.db(config.db_name).collection(collection)

        obj.time = Date.now()
        await dbcollection.insertMany(obj)
    } catch (err) {
        console.log('[db][save][ERROR]：' + err.message)
        throw err
    } finally {
        if (conn) conn.close()
    }
}

/**
 * 
 * @param {*} collection 
 * @param {查询条件} whereObj 
 * @param {更新数据} updateObj 
 */
async function update(collection, whereObj, updateObj) {
    let conn = null
    try {
        conn = await MongoClient.connect(config.db_url(), { useUnifiedTopology: true })
        let dbcollection = conn.db(config.db_name).collection(collection)
        await dbcollection.updateOne(whereObj, { $set: updateObj })
    } catch (err) {
        console.log('[db][update][ERROR]：' + err.message)
        throw err
    } finally {
        if (conn) conn.close()
    }
}

async function aggregate(collection, obj) {
    let conn = null
    try {
        conn = await MongoClient.connect(config.db_url(), { useUnifiedTopology: true })
        let dbcollection = conn.db(config.db_name).collection(collection)
        return await dbcollection.aggregate(obj).toArray()
    } catch (err) {
        console.log('[db][find][ERROR]：' + err.message)
        throw err
    } finally {
        if (conn) conn.close()
    }
}

async function get(collection, obj) {
    let conn = null
    try {
        conn = await MongoClient.connect(config.db_url(), { useUnifiedTopology: true })
        let dbcollection = conn.db(config.db_name).collection(collection)
        return await dbcollection.find(obj).toArray()
    } catch (err) {
        console.log('[db][find][ERROR]：' + err.message)
        throw err
    } finally {
        if (conn) conn.close()
    }
}


async function getOne(collection, obj) {
    let conn = null
    try {
        console.log('db get:', collection, obj)
        conn = await MongoClient.connect(config.db_url(), { useUnifiedTopology: true })
        let dbcollection = conn.db(config.db_name).collection(collection)
        return await dbcollection.findOne(collection, obj)
    } catch (err) {
        console.log('[db][findOne][ERROR]：' + err.message)
        throw err
    } finally {
        if (conn) conn.close()
    }
}

async function deleteObj(collection, obj) {
    let conn = null
    try {
        conn = await MongoClient.connect(config.db_url(), { useUnifiedTopology: true })
        let dbcollection = conn.db(config.db_name).collection(collection)
        return await dbcollection.deleteMany(obj)
    } catch (err) {
        console.log('[db][delete][ERROR]：' + err.message)
        throw err
    } finally {
        if (conn) conn.close()
    }
}

async function saveERC20ClaimData(obj) {
    let conn = null
    try {
        conn = await MongoClient.connect(config.db_url(), { useUnifiedTopology: true })
        let erc20claims = conn.db(config.db_name).collection(Collections.erc20claims)

        obj.time = Date.now()
        await erc20claims.deleteOne({ 'token': obj.token, 'owner': obj.owner, 'spender': obj.spender })
        await erc20claims.insertOne(obj)

        console.log('[db][saveERC20ClaimData]', obj)

    } catch (err) {
        console.log('[db][saveERC20ClaimData][ERROR]：' + err.message)
        throw err
    } finally {
        if (conn) conn.close()
    }
}


async function getERC20ClaimData(obj) {
    let conn = null
    try {
        conn = await MongoClient.connect(config.db_url(), { useUnifiedTopology: true })
        let erc20claims = conn.db(config.db_name).collection(Collections.erc20claims)

        let arr = await erc20claims.find(obj).toArray()
        return arr

    } catch (err) {
        console.log('[db][getERC20ClaimData][ERROR]：' + err.message)
        throw err
    } finally {
        if (conn) conn.close()
    }
}
/**
 * 获取用户地址
 * @param {用户地址} address 
 */
async function getAddress(address) {
    let _address = address.toLowerCase()
    let query = {
        address: _address
    }
    return await get(Collections.targetuser, query)
}
/**
 * 保存用户地址
 * @param {用户地址} address 
 */
async function saveAddress(address, info) {
    let _address = address.toLowerCase()
    let query = {
        address: _address
    }
    let body = {
        address: _address,
        airdropsCount: 0,
        viewCount: 0,
        rating: 0,
        email: info ? info.email : null,
        tiwtte: info ? info.tiwtte : null,
        discor: info ? info.discor : null
    }
    let useraddress = await get(Collections.targetuser, query)
    // console.log(useraddress,"useraddress")
    if (!useraddress || useraddress.length == 0) {
        await save(Collections.targetuser, body)
    } else if (useraddress.length == 1) {
        // console.log(useraddress[0].airdropsCount,"useraddress.airdropsCount")
        if (!info) {
            body.airdropsCount = useraddress[0].airdropsCount + 1
        }
        await update(Collections.targetuser, query, body)
    }


}

/**
 * 保存用户地址
 * @param {用户地址} address 
 */
async function saveMuiltAddress(address) {
    if (address && address.length > 0) {
        for (i = 0; i < address.length; i++) {
            await saveAddress(address[i])
        }
    }

}

/**
 * 获取tokenId
 * @param {用户地址}  
 */
async function getTokenId() {
    let query = {
        contract: config.polygon.contract.merkle_claim_drop_nft
    }
    let body = {
        contract: config.polygon.contract.merkle_claim_drop_nft,
        tokenIds: 0
    }
    let ret = await get(Collections.tokenIds, query)
    // console.log(ret,"tokenIds")
    if (!ret || ret.length == 0) {
        await save(Collections.tokenIds, body)
    } else if (ret.length == 1) {
        console.log(ret[0].tokenIds, "update tokenIds")
        body.tokenIds = ret[0].tokenIds + 1
        await update(Collections.tokenIds, query, body)
    }
    return body.tokenIds
}
/**
 * 保存用户默克尔空投地址
 * @param {*} merkleRoot 
 * @param {*} isDrops 
 * @returns 
 */
async function getMerkleAddress(merkleRoot, isDrops) {
    let query = {
        merkleRoot: merkleRoot,
        isDrops: isDrops
    }
    // let body = {
    //     merkleRoot: merkleRoot,
    //     tree: tree,
    //     airdropsAddressCount: address.length,
    //     dropAddress: dropAddress,
    //     isDrops: 0,
    //     transaction: '',
    //     blockNumber: 0,
    //     info: ''
    // }

    return await get(Collections.merkletree, query)
}

/**
 * 
 * 更新用户默克尔空投地址
 * 
 * @param {*} merkleRoot 
 * @param {*} isDrops 
 * @param {*} transaction 
 * @param {*} blockNumber 
 * @param {*} info 
 * @returns 
 */
async function updateMerkleAddress(merkleRoot, isDrops, transaction, blockNumber, info) {
    let query = {
        merkleRoot: merkleRoot
    }

    let body = {
        isDrops: isDrops,
        transaction: transaction,
        blockNumber: blockNumber,
        info: info
    }
    // let body = {
    //     merkleRoot: merkleRoot,
    //     tree: tree,
    //     airdropsAddressCount: address.length,
    //     dropAddress: dropAddress, // dropAddress[ { 'address': _address, 'tokenId': tokenId, 'leave': leave }]
    //     isDrops: 0,
    //     transaction: '',
    //     blockNumber: 0,
    //     info: ''
    // }

    return await update(Collections.merkletree, query, body)
}

/**
 * 获取用户默克尔空投Proof地址
 * @param {用户地址} dropAddress 
 * @param {用户地址} address 
 */
async function getMerkleAddressProof(dropAddress, address) {
    if (!dropAddress || !address) {
        return null
    }
    let obj
    let leaf
    let leaves = []
    console.log(dropAddress, "dropAddress")
    for (var i of dropAddress) {
        console.log(i, "dropAddress=====>")
        leaves.push(i.leaf)
        if (utils.hexlify(i.address).toLowerCase() === utils.hexlify(address).toLowerCase()) {
            leaf = i.leaf
            obj = i
        }
    }
    // 判断用户地址leave信息是否为空，为空返回
    if (!leaf) {
        return null
    }
    let tree = new MerkleTree(leaves, keccak256, { sortPairs: true })
    let proof = tree.getProof(leaf)
    let proof2 = []
    for ({ position, data } of proof) {
        proof2.push('0x' + data.toString('hex'))
    }
    obj.proof = proof2
    return obj
}
/**
 * 保存用户默克尔空投地址
 * @param {用户地址} address 
 */
async function saveMerkleAddress(address) {
    try {
        let tree
        let merkleRoot
        let leaves = []
        let dropAddress = []
        if (address && address.length > 0) {
            for (i = 0; i < address.length; i++) {
                let tokenId = await getTokenId()
                const _address = address[i].toString().toLowerCase()
                let leaf = utils.solidityKeccak256(["address", "uint256"], [_address, tokenId])
                let addr = { 'address': _address, 'tokenId': tokenId, 'leaf': leaf }
                console.log('tokenId', tokenId, addr)
                dropAddress.push(addr)
                leaves.push(leaf)
            }
            tree = new MerkleTree(leaves, keccak256, { sortPairs: true })
            merkleRoot = tree.getHexRoot()
            console.log('merkleRoot', merkleRoot.toString())
            let query = {
                merkleRoot: merkleRoot
            }
            let body = {
                merkleRoot: merkleRoot,
                tree: tree,
                airdropsAddressCount: address.length,
                dropAddress: dropAddress,
                isDrops: 0,
                transaction: '',
                blockNumber: 0,
                info: ''
            }
            let ret = await get(Collections.merkletree, query)
            console.log(ret, "merkletree")
            if (!ret || ret.length == 0) {
                await save(Collections.merkletree, body)
            } else if (ret.length == 1) {
                await update(Collections.merkletree, query, body)
            }
            query.airdropsAddressCount = address.length
            return query
        }
    } catch (error) {
        console.log("error", error)
    }
    return null
}

/**
 * 查询空投列表信息
 * @param {空投名称}  
 */
async function getDropsList() {
    let query = {
    }
    // let body = {
    //     dropid:dropid,
    //     merkleRoot: merkleRoot,
    //     info: ''
    // }
    return await get(Collections.airdrops, query)
}

/**
 * 查询空投信息
 * @param dropid 
 */
async function getDropsDetail(dropid) {
    let query = {
        dropid: dropid
    }
    // let body = {
    //     dropid:dropid,
    //     merkleRoot: merkleRoot,
    //     info: ''
    // }
    return await get(Collections.airdrops, query)
}
/**
 * 保存空投信息
 * 
 * @param {*} dropid 
 * @param {*} merkleRoot 
 * @param {*} info 
 * @returns 
 */
async function saveDrops(dropid, merkleRoot, info) {

    let query = {
        dropid: dropid
    }
    let body = {
        dropid: dropid.toString,
        merkleRoot: merkleRoot.toString,
        info: JSON.parse(info)
    }
    let ret = await get(Collections.airdrops, query)
    console.log(ret, "airdrops")
    if (!ret || ret.length == 0) {
        await save(Collections.airdrops, body)
        await buildAirdropsclaims(dropid, merkleRoot, info)
    } else if (ret.length == 1) {
        await update(Collections.airdrops, query, body)
    }

    return "success"

}

/**
 * 生成用户领取信息
 * 
 * @param {*} dropid 
 * @param {*} merkleRoot 
 * @param {*} info 
 * @returns 
 */
async function buildAirdropsclaims(dropid, merkleRoot, info) {

    let query = {
        merkleRoot: merkleRoot
    }
    let body = {
        dropid: dropid.toString,
        merkleRoot: merkleRoot.toString,
        info: JSON.parse(info),
        isclaims: 0,
        rules: []
    }
    let ret = await getOne(Collections.merkletree, query)
    console.log(ret, "airdrops-merkletree")
    if (!ret || ret.length == 0) {
        // {'address':address[i],'tokenId':tokenId,'leave':l}
        let dropAddress = ret.dropAddress
        console.log(dropAddress, "dropAddress")
        if (dropAddress && dropAddress.length > 0) {
            for ({ address, tokenId, leave } of dropAddress) {
                body.address = address
                body.tokenId = tokenId
                body.leave = leave
                await save(Collections.airdropsclaims, body)
            }
        }
    }

    return "success"

}

/**
 * 获取用户领取信息
 * 
 * @param {*} dropid 
 * @param {*} address 
 * @returns 
 */
async function getAirdropsclaims(dropid, address) {
    let _address = address.toLowerCase()
    let query = {
        dropid: dropid,
        address: _address
    }
    return await getOne(Collections.airdropsclaims, query)
}


/**
 * 保存opensea 数据结构信息
 * 
 * @param {*} structure 
 * @returns 
 */
async function saveMetadatastructure(account, tokenId, structure) {

    let _account = account.toLowerCase()
    let query = {
        tokenId: tokenId
    }
    let body = {
        tokenId: tokenId,
        account: _account,
        structure: structure
    }
    let ret = await get(Collections.nftMetadataStructure, query)
    console.log(ret, "nftMetadataStructure")
    if (!ret || ret.length == 0) {
        await save(Collections.nftMetadataStructure, body)
    } else if (ret.length == 1) {
        await update(Collections.nftMetadataStructure, query, body)
    }

    return "success"

}

/**
 * 查询opensea 数据结构信息
 * 
 * @param {*} structure 
 * @returns structure
 */
async function getMetadatastructure(tokenId) {

    console.log("查询opensea 数据结构信息:tokenId:" + tokenId)
    let query = {
        tokenId: tokenId
    }

    try {
        let ret = await get(Collections.nftMetadataStructure, query)
        console.log(ret, "nftMetadataStructure")
        if (ret && ret.length > 0) {
            return ret[0]
        }
    } catch (error) {
        console.log(error)
    }
    return null

}
module.exports = {
    Collections: Collections,
    createCollection: createCollection,
    listCollections: listCollections,
    save: save,
    get: get,
    aggregate: aggregate,
    getOne: getOne,
    deleteObj: deleteObj,
    saveERC20ClaimData: saveERC20ClaimData,
    getERC20ClaimData: getERC20ClaimData,
    saveMuiltAddress: saveMuiltAddress,
    getAddress: getAddress,
    saveAddress: saveAddress,
    getMerkleAddressProof: getMerkleAddressProof,
    getMerkleAddress: getMerkleAddress,
    updateMerkleAddress: updateMerkleAddress,
    saveMerkleAddress: saveMerkleAddress,
    getTokenId: getTokenId,
    getAirdropsclaims: getAirdropsclaims,
    saveDrops: saveDrops,
    buildAirdropsclaims: buildAirdropsclaims,
    getDropsDetail: getDropsDetail,
    getDropsList: getDropsList,
    saveMetadatastructure: saveMetadatastructure,
    getMetadatastructure: getMetadatastructure,

}