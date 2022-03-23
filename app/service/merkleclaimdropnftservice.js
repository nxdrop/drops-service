const config = require('../../conf/config.js');
const Service = require('./service')
const DropABI = require('../../res/abi/MerkleClaimDropsNFT721.json').abi
const db = require('../../routes/model/db')
const utils = require('../../routes/tools/utils')
const ethers = require('ethers')
const BigNumber = ethers.BigNumber

class MerkleClaimDropsNFT721Service extends Service {


    /**
     * 设置NFT链接的网关
     * 
     * @param {NFT的网关地址，拼接tokenId作为NFT的链接，string类型} baseUri 
     */
    async setBaseURI(baseUri) {
        try {
            if (!baseUri) {
                throw new Error(`baseUri not found:${baseUri}.`)
            }
            await this.contract.setBaseURI(baseUri)
            console.log('setBaseURI done')
        } catch (e) {
            console.log(e)
        }
    }

    /**
     * 铸造NFT
     * 
     * @param {铸造给谁，address类型 } account 
     * @param {NFT的唯一id，uint256类型  } tokenId 
     */
    async safeMint(account, tokenId) {
        console.log('merkleclaim drop nft safeMint')
        const ctx = this

        try {
            await this.contract.safeMint(account, tokenId)
            console.log('safeMint done tokenId:' + tokenId)

            // console.log('balanceOf', this.n(await this.contract.balanceOf(this.singer().address)))
            // console.log('ownerOf', await this.contract.ownerOf(tokenId))
            // console.log('tokenURI', await this.contract.tokenURI(tokenId))

            //tokenURI returns JSON, https://docs.opensea.io/docs/metadata-standards
        } catch (e) {
            console.log(e)
        }
    }

    /**
     * 查询opensea NFT 属性
     * 
     * @param {NFT的唯一id，uint256类型 } tokenId
     * @return attributes
     */
    async getMetadatastructure(tokenId) {
        try {
            return await db.getMetadatastructure(tokenId)
        } catch (e) {
            console.log(e)
        }
    }
    /**
     * 铸造NFT
     * 
     * @param {铸造给谁，address类型 } account 
     * @param {A human readable description of the item. Markdown is supported.  } description 
     * @param {This is the URL that will appear below the asset's image on OpenSea and will allow users to leave OpenSea and view the item on your site. } external_url 
     * @param {This is the URL to the image of the item. Can be just about any type of image (including SVGs, which will be cached into PNGs by OpenSea), and can be IPFS URLs or paths. We recommend using a 350 x 350 image. } image 
     * @param {Name of the item.  } name 
     * @param {NFT的唯一id，uint256类型  } attributes 
     */
    async openseaSafeMint(account, description, external_url, image, name, attributes) {
        console.log('merkleclaim drop nft openseaSafeMint')
        const ctx = this

        let _attributes = [
            {
                "trait_type": "Base",
                "value": "Starfish"
            },
            {
                "trait_type": "Eyes",
                "value": "Big"
            },
            {
                "trait_type": "Mouth",
                "value": "Surprised"
            },
            {
                "trait_type": "Level",
                "value": 5
            },
            {
                "trait_type": "Stamina",
                "value": 1.4
            },
            {
                "trait_type": "Personality",
                "value": "Sad"
            },
            {
                "display_type": "boost_number",
                "trait_type": "Aqua Power",
                "value": 40
            },
            {
                "display_type": "boost_percentage",
                "trait_type": "Stamina Increase",
                "value": 10
            },
            {
                "display_type": "number",
                "trait_type": "Generation",
                "value": 2
            }
        ]


        /**
         * image            | This is the URL to the image of the item. Can be just about any type of image (including SVGs, which will be cached into PNGs by OpenSea), 
         *                    and can be IPFS URLs or paths. We recommend using a 350 x 350 image.
         * image_data       | Raw SVG image data, if you want to generate images on the fly (not recommended). Only use this if you're not including the image parameter.
         * external_url     | This is the URL that will appear below the asset's image on OpenSea and will allow users to leave OpenSea and view the item on your site.
         * description      | A human readable description of the item. Markdown is supported.
         * name             | Name of the item.
         * attributes	    | These are the attributes for the item, which will show up on the OpenSea page for the item. (see below)
         * background_color | Background color of the item on OpenSea. Must be a six-character hexadecimal without a pre-pended #.
         * animation_url	| A URL to a multi-media attachment for the item. The file extensions GLTF, GLB, WEBM, MP4, M4V, OGV, and OGG are supported, along with the audio-only extensions MP3, WAV, and OGA.
         *                    Animation_url also supports HTML pages, allowing you to build rich experiences and interactive NFTs using JavaScript canvas, WebGL, and more. Scripts and relative paths within the HTML page are now supported.
         *                    However, access to browser extensions is not supported.
         * youtube_url      | A URL to a YouTube video.
         */
        let openSea_creatures = {
            "description": description,
            "external_url": external_url,
            "image": image,
            "name": name,
            "attributes": _attributes,
        }

        try {
            let tokenId = await db.getTokenId();
            await this.contract.safeMint(account, tokenId)
            console.log('safeMint done tokenId:' + tokenId + ",account：" + account)

            // console.log('balanceOf', this.n(await this.contract.balanceOf(this.singer().address)))
            // console.log('ownerOf', await this.contract.ownerOf(tokenId))
            // console.log('tokenURI', await this.contract.tokenURI(tokenId))

            //tokenURI returns JSON, https://docs.opensea.io/docs/metadata-standards
            /**
             * {
                "description": "Friendly OpenSea Creature that enjoys long swims in the ocean.", 
                "external_url": "https://openseacreatures.io/3", 
                "image": "https://storage.googleapis.com/opensea-prod.appspot.com/puffs/3.png", 
                "name": "Dave Starbelly",
                "attributes": [ ... ], 
                }
             */
            db.saveMetadatastructure(account, tokenId, openSea_creatures)

            return tokenId
        } catch (e) {
            console.log(e)
        }
    }


    /**
     * 用户NFT铸造
     */
    async safeMint() {
        console.log('merkleclaim drop nft safeMint')
        const ctx = this

        try {
            let tokenId = db.getTokenId();
            await this.contract.safeMint(this.singer().address, tokenId)
            console.log('safeMint done tokenId:' + tokenId)

            // console.log('balanceOf', this.n(await this.contract.balanceOf(this.singer().address)))
            // console.log('ownerOf', await this.contract.ownerOf(tokenId))
            // console.log('tokenURI', await this.contract.tokenURI(tokenId))

            //tokenURI returns JSON, https://docs.opensea.io/docs/metadata-standards
        } catch (e) {
            console.log(e)
        }
    }

    /**
     * 查询空投项目列表信息
     * @param {查询条件} query 
     */
    async listDrop(query) {
        let _query = [{
            $lookup: {
                from: "merkletree",
                localField: "merkleRoot",
                foreignField: "merkleRoot",
                as: "nftMetadataStructure"
            }
        },
        { $project: { "dropid": 1, "info": 1, "nftMetadataStructure.info": 1 } }]

        return await db.aggregate(db.Collections.airdrops, _query)
    }
    /**
     * 创建一批空投，批次从1自增
     * 
     * @param {一批空投的描述，主要用于前端展示，string类型  } info 
     * @param {这批空投的merkleRoot，string类型  } merkleRoot 
     * @param {A human readable description of the item. Markdown is supported.  } description 
     * @param {This is the URL that will appear below the asset's image on OpenSea and will allow users to leave OpenSea and view the item on your site. } external_url 
     * @param {This is the URL to the image of the item. Can be just about any type of image (including SVGs, which will be cached into PNGs by OpenSea), and can be IPFS URLs or paths. We recommend using a 350 x 350 image. } image 
     * @param {Name of the item.  } name 
     * @param {NFT的唯一id，uint256类型  } attributes 
     */
    async createDrop(info, merkleRoot, description, external_url, image, nftname, attributes) {
        console.log('merkleclaim drop nft createDrop')
        const ctx = this

        /**
         * image            | This is the URL to the image of the item. Can be just about any type of image (including SVGs, which will be cached into PNGs by OpenSea), 
         *                    and can be IPFS URLs or paths. We recommend using a 350 x 350 image.
         * image_data       | Raw SVG image data, if you want to generate images on the fly (not recommended). Only use this if you're not including the image parameter.
         * external_url     | This is the URL that will appear below the asset's image on OpenSea and will allow users to leave OpenSea and view the item on your site.
         * description      | A human readable description of the item. Markdown is supported.
         * name             | Name of the item.
         * attributes	    | These are the attributes for the item, which will show up on the OpenSea page for the item. (see below)
         * background_color | Background color of the item on OpenSea. Must be a six-character hexadecimal without a pre-pended #.
         * animation_url	| A URL to a multi-media attachment for the item. The file extensions GLTF, GLB, WEBM, MP4, M4V, OGV, and OGG are supported, along with the audio-only extensions MP3, WAV, and OGA.
         *                    Animation_url also supports HTML pages, allowing you to build rich experiences and interactive NFTs using JavaScript canvas, WebGL, and more. Scripts and relative paths within the HTML page are now supported.
         *                    However, access to browser extensions is not supported.
         * youtube_url      | A URL to a YouTube video.
         */
        let _attributes = typeof attributes === "object" ? attributes : JSON.parse(attributes)

        console.log(_attributes, _attributes.length, "attributes")
        let openSea_creatures = {
            "description": description,
            "external_url": external_url,
            "image": image,
            "name": nftname,
            "attributes": _attributes,
        }


        try {

            if (!info) {
                throw new Error(`info not found:${info}.`)
            }
            if (!merkleRoot) {
                throw new Error(`merkleRoot not found:${merkleRoot}.`)
            }
            // 查询用户默克尔信息是否存在
            // 未空投
            let isDrops = 0
            /**
             * merkleAddress: {
                merkleRoot: merkleRoot,
                tree: tree,
                airdropsAddressCount: address.length,
                dropAddress: dropAddress,
                isDrops: 0,
                transaction: '',
                blockNumber: 0,
                info: ''
            }
             */
            let merkleAddress = await db.getMerkleAddress(merkleRoot, isDrops)
            if (!merkleAddress || merkleAddress.length == 0) {
                throw new Error(`merkleRootAddress not found.`)
            }

            /**
             * info:{
                    name:'',
                    officalSite:'',
                    logoUri:'',   
                    description:'',
                    dropTotal:'',
                }
            */
            let _info = typeof info === "string" ? info : JSON.stringify(info)
            console.log(JSON.parse(_info), "_info")
            let ret = await this.contract.createDrop(_info, merkleRoot)

            console.log(ret, "ret================>")
            // 空投数据上链成功
            if (ret) {
                // 更新默克尔空投状态
                isDrops = 1 //已空投 
                db.updateMerkleAddress(merkleRoot, isDrops, ret.tran, ret.blockNumber, openSea_creatures)

            }
            /**
             * dropAddress：[ { 'address': _address, 'tokenId': tokenId, 'leave': leave }]
             * 
             * 
             * 
             * openSea_creatures： {
                "description": "Friendly OpenSea Creature that enjoys long swims in the ocean.", 
                "external_url": "https://openseacreatures.io/3", 
                "image": "https://storage.googleapis.com/opensea-prod.appspot.com/puffs/3.png", 
                "name": "Dave Starbelly",
                "attributes": [ ... ], 
                }
            */
            // console.log(merkleAddress, "merkleAddress")
            for (var item of merkleAddress) {
                // console.log(item.dropAddress, "item.dropAddress")
                for (var i of item.dropAddress) {
                    console.log(i.address, i.tokenId, "dropAddress=====>")
                    db.saveMetadatastructure(i.address, i.tokenId, openSea_creatures)
                }
            }

            console.log('createDrop done')
        } catch (e) {
            console.log(e)
            throw new Error(`createDrop ${e}`)
        }
    }

    /**
     * 用户来领取NFT空投
     *  * 
     * @param {铸造给谁，address类型   } address
     * @param {要领取的空投的批次Id，uint256类型   } dropId
     * @param {要领取的NFT的tokenId，uint256类型   } tokenId
     * @param {默克尔树的证明，string数组  } proof
     **/
    async claim(address, dropId, tokenId, proof) {
        console.log('merkleclaim drop nft claim')
        const ctx = this
        if (!address) {
            throw new Error(`info not found:${address}.`)
        }
        if (!dropId) {
            throw new Error(`info not found:${dropId}.`)
        }
        if (!tokenId) {
            throw new Error(`merkleRoot not found:${tokenId}.`)
        }
        if (!proof) {
            throw new Error(`merkleRoot not found:${proof}.`)
        }

        return await this.contract.connect(address).claim(dropId, tokenId, proof)

    }


    /**
     * 获取用户来领取NFT空投proof信息
     *  * 
     * @param {要领取的空投的批次Id，uint256类型   } dropId
     * @param {用户钱包地址   } address
     * @return {默克尔树的证明，string数组  }proof
     **/
    async getClaimProof(dropId, address) {
        console.log('merkleclaim drop nft getClaimProof')
        const ctx = this

        if (!dropId) {
            throw new Error(`info not found:${dropId}.`)
        }
        if (!address) {
            throw new Error(`merkleRoot not found:${address}.`)
        }

        //获取空投项目信息
        let dropInfo = await db.getDropsDetail(dropId)
        // console.log(dropInfo, "dropInfo")
        if (!dropInfo || dropInfo.length == 0) {
            return null
        }

        let merkleAddress = await db.getMerkleAddress(dropInfo[0].merkleRoot, 1)
        if (!merkleAddress || merkleAddress.length == 0) {
            throw new Error(`merkleRootAddress not found.`)
        }
        // console.log(merkleAddress, "merkleAddress")
        let obj
        for (var item of merkleAddress) {
            // console.log(item.dropAddress, "item.dropAddress")
            obj = await db.getMerkleAddressProof(item.dropAddress, address)
        }
        if (!obj && obj != null) {
            obj.dropId = dropId
        }
        console.log('getClaimProof done')
        return obj

    }

    /**
     * 查询某个NFT的http链接
     * 
     * @param {NFT的tokenId，uint256类型 } tokenId
     * @return {NFT的http链接，string类型} uri     
     **/
    async tokenURI(tokenId) {
        console.log('merkleclaim drop nft tokenURI')
        const ctx = this

        try {
            if (!tokenId) {
                throw new Error(`info not found:${tokenId}.`)
            }

            let uri = await this.contract.tokenURI(tokenId)
            console.log('tokenURI done:', uri)
            return uri
        } catch (e) {
            console.log(e)
        }
    }

    /**
     * 查询某个NFT的持有人是谁
     * 
     * @param {NFT的tokenId，uint256类型 } tokenId
     * @return {NFT的拥有者，address类型} account 
     **/
    async ownerOf(tokenId) {
        console.log('merkleclaim drop nft ownerOf')
        const ctx = this

        try {
            if (!tokenId) {
                throw new Error(`info not found:${tokenId}.`)
            }

            let account = await this.contract.ownerOf(tokenId)
            console.log('ownerOf done:' + account)
            return account
        } catch (e) {
            console.log(e)
        }
    }

    /**
     * 查询某个用户名下有多少个NFT
     * 
     * @param {NFT的拥有者，address类型 } account
     * @return {该用户拥有多少个NFT} balance 
     **/
    async balanceOf(account) {
        console.log('merkleclaim drop nft createDrop')
        const ctx = this

        try {
            if (!account) {
                throw new Error(`info not found:${account}.`)
            }

            let balance = await this.contract.balanceOf(account)
            console.log('balanceOf done:' + balance)
            return balance
        } catch (e) {
            console.log(e)
        }
    }


    get provider() {
        if (!this._provider) {
            console.log(config.polygon.httpServer, "config.polygon.httpServer<<<<<")
            this._provider = new ethers.providers.JsonRpcProvider(config.polygon.httpServer)
        }
        return this._provider
    }

    singer() {
        let privateKey = "0x" + config.eth_privateKey;
        let wallet = new ethers.Wallet(privateKey)
        let providerWallet = wallet.connect(this.provider)

        // const provider = new ethers.providers.Web3Provider(this.provider)
        // await provider.send("eth_requestAccounts", [privateKey]);

        // // The MetaMask plugin also allows signing transactions to
        // // send ether and pay to change state within the blockchain.
        // // For this, you need the account signer...
        // const signer = provider.getSigner()
        return providerWallet
    }

    tokenAddress() {
        let addr = config.polygon.contract.merkle_claim_drop_nft
        if (!addr) {
            throw new Error(`token address not found:${addr}.`)
        }
        return addr
    }


    get contract() {
        let addr = config.polygon.contract.merkle_claim_drop_nft
        console.log('merkle_claim_drop_nft contract', addr)
        return this.getContract(addr, DropABI)
    }

    getContract(contract, abi) {
        return new ethers.Contract(contract, abi, this.singer());
    }


    m(num) {
        return BigNumber.from('1000000000000000000').mul(num)
    }

    d(bn) {
        return bn.div('1000000000000000').toNumber() / 1000
    }

    b(num) {
        return BigNumber.from(num)
    }

    n(bn) {
        return bn.toNumber()
    }

    s(bn) {
        return bn.toString()
    }
}

module.exports = MerkleClaimDropsNFT721Service