var MongoClient = require('mongodb').MongoClient
// var url = "mongodb://youruser:yourpassword2@localhost/yourdatabase"

async function run() {
    var conn = null

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

    try {
        conn = await MongoClient.connect(url, { useUnifiedTopology: true })
        var db = conn.db("dedrops")
        for (var value of Object.values(Collections)) {
            console.log(value)
            db.collection(value).drop()
        }
        console.log("数据已清空")
    } catch (err) {
        console.log("错误：" + err.message)
    } finally {
        if (conn != null) conn.close()
    }
}


run()
