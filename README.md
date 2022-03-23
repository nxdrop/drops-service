---
title: airdedrops v1.0.0
language_tabs:
  - shell: Shell
  - http: HTTP
  - javascript: JavaScript
  - ruby: Ruby
  - python: Python
  - php: PHP
  - java: Java
  - go: Go
toc_footers: []
includes: []
search: true
code_clipboard: true
highlight_theme: darkula
headingLevel: 2
generator: "@tarslib/widdershins v4.0.5"

---

# airdedrops

> v1.0.0

# Default

## POST 创建一批空投，批次从1自增

POST /airdrops/createDrop

创建一批空投，批次从1自增

> Body 请求参数

```yaml
info: "{name:'',officalSite:'',logoUri:'',   description:'',dropTotal:'',}"
merkleRoot: string
description: string
external_url: string
image: string
nftname: string
attributes: "[]"

```

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|body|body|object| 否 |none|
|» info|body|string| 是 |一批空投的描述，主要用于前端展示，string类型|
|» merkleRoot|body|string| 是 |这批空投的merkleRoot，string类型|
|» description|body|string| 是 |A human readable description of the item. Markdown is supported.|
|» external_url|body|string| 否 |This is the URL that will appear below the asset's image on OpenSea and will allow users to leave OpenSea and view the item on your site.|
|» image|body|string| 是 |This is the URL to the image of the item. Can be just about any type of image (including SVGs, which will be cached into PNGs by OpenSea), and can be IPFS URLs or paths. We recommend using a 350 x 350 image.|
|» nftname|body|string| 是 |Name of the item.|
|» attributes|body|string| 是 |To give your items a little more pizazz, we also allow you to add custom "attributes" to your metadata that will show up underneath each of your assets.|

> 返回示例

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|成功|Inline|

### 返回数据结构

## GET 查询某个NFT的持有人是谁

GET /airdrops/ownerOf

查询某个NFT的持有人是谁

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|tokenId|query|string| 否 |NFT的tokenId，uint256类型|

> 返回示例

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|成功|Inline|

### 返回数据结构

## GET 查询opensea NFT 属性

GET /airdrops/metadatastructure

查询opensea NFT 属性

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|tokenId|query|string| 是 |NFT的唯一id，uint256类型|

> 返回示例

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|成功|Inline|

### 返回数据结构

## POST 设置NFT链接的网关

POST /airdrops/baseUri

> Body 请求参数

```yaml
uri: https://gateway.pinata.cloud/ipfs/QmPTq4aSfUpogxfipi1w5s8ekVT6EqwmPL3KpAu5p42g9t/

```

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|body|body|object| 否 |none|
|» uri|body|string| 是 |NFT的网关地址，拼接tokenId作为NFT的链接，string类型|

> 返回示例

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|成功|Inline|

### 返回数据结构

## POST 用户地址导入

POST /import/users

### 用户地址导入
用户上传地址文件

> Body 请求参数

```yaml
file: file://C:\Users\wangbin\Desktop\useraddr.txt

```

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|body|body|object| 否 |none|
|» file|body|string(binary)| 是 |none|

> 返回示例

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|成功|Inline|

### 返回数据结构

## POST 铸造NFT

POST /airdrops/openseaSafeMint

铸造NFT

> Body 请求参数

```yaml
account: string
description: string
image: string
nftname: string
attributes: string
external_url: string

```

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|body|body|object| 否 |none|
|» account|body|string| 是 |铸造给谁，address类型|
|» description|body|string| 是 |A human readable description of the item. Markdown is supported.|
|» image|body|string| 是 |This is the URL to the image of the item. Can be just about any type of image (including SVGs, which will be cached into PNGs by OpenSea), and can be IPFS URLs or paths. We recommend using a 350 x 350 image.|
|» nftname|body|string| 是 |Name of the item.|
|» attributes|body|string| 是 |To give your items a little more pizazz, we also allow you to add custom "attributes" to your metadata that will show up underneath each of your assets.|
|» external_url|body|string| 否 |A human readable description of the item. Markdown is supported.  } description   * @param {This is the URL that will appear below the asset's image on OpenSea and will allow users to leave OpenSea and view the item on your site.|

> 返回示例

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|成功|Inline|

### 返回数据结构

## GET 查询用户信息

GET /airdrops/getAddress

查询用户信息

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|address|query|string| 是 |用户钱包地址|

> 返回示例

> 成功

```json
{
  "code": 0,
  "msg": "ok",
  "data": [
    {
      "_id": "62384ff3f192966c26299416",
      "address": "0xFd30d2c32E6A22c2f026225f1cEeA72bFD9De865",
      "airdropsCount": 1,
      "viewCount": 0,
      "rating": 0,
      "time": 1647857651632
    }
  ]
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|成功|Inline|

### 返回数据结构

## POST 用户邮箱签名数据验签-验签成功-保存邮箱信息

POST /airdrops/signUserMail

用户邮箱签名数据验签-验签成功-保存邮箱信息

> Body 请求参数

```yaml
params: '"params":{"userAddress":"0xfd30d2c32e6a22c2f026225f1ceea72bfd9de865","ts":1647941407.373,"email":"Jobs","tiwtter":"","discord":""}'
signedData: "0xd59d7f89250f516e84a7b980ef8f12c4b7b7ac9430c970d5540addd72fef1ad4\
  63c55d73c409c2a95203af933024d66717dd130df7e6ef4f795bc87d931251ab1c"

```

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|body|body|object| 否 |none|
|» params|body|string| 是 |数据内容|
|» signedData|body|string| 是 |数据签名|

> 返回示例

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|成功|Inline|

### 返回数据结构

## GET 查询某个用户名下有多少个NFT

GET /airdrops/balanceOf

查询某个用户名下有多少个NFT

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|account|query|string| 否 |NFT的tokenId，uint256类型|

> 返回示例

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|成功|Inline|

### 返回数据结构

## GET 查询空投项目列表信息

GET /airdrops/listDrop

查询空投项目列表信息

> 返回示例

> 成功

```json
{
  "code": 0,
  "msg": "ok",
  "data": [
    {
      "_id": "623a95b49998ab0ddec08824",
      "dropid": "20",
      "info": {
        "name": "空投项目1",
        "officalSite": "",
        "logoUri": "https://gateway.pinata.cloud/ipfs/QmNbgVii5zsywA5xLreA8KuC8Y8twmoXR9d2z74jEaDSyg",
        "description": "空投测试aaa",
        "dropTotal": 4
      },
      "nftMetadataStructure": [
        {
          "info": {
            "description": "空投项目Test",
            "external_url": "",
            "image": "https://gateway.pinata.cloud/ipfs/QmPTq4aSfUpogxfipi1w5s8ekVT6EqwmPL3KpAu5p42g9t/9.png",
            "name": "NFTTest0001",
            "attributes": [
              {
                "trait_type": "Base",
                "value": "Starfish"
              },
              {
                "trait_type": "Eyes",
                "value": "Big"
              }
            ]
          }
        }
      ]
    },
    {
      "_id": "623ac0db6645da8de01d5222",
      "dropid": "21",
      "info": {
        "name": "空投项目2",
        "officalSite": "",
        "logoUri": "https://gateway.pinata.cloud/ipfs/QmNbgVii5zsywA5xLreA8KuC8Y8twmoXR9d2z74jEaDSyg",
        "description": "空投测试aaa",
        "dropTotal": 4
      },
      "nftMetadataStructure": [
        {
          "info": {
            "description": "空投项目Test",
            "external_url": "",
            "image": "https://gateway.pinata.cloud/ipfs/QmPTq4aSfUpogxfipi1w5s8ekVT6EqwmPL3KpAu5p42g9t/9.png",
            "name": "NFTTest0001",
            "attributes": [
              {
                "trait_type": "Base",
                "value": "Starfish"
              },
              {
                "trait_type": "Eyes",
                "value": "Big"
              }
            ]
          }
        }
      ]
    }
  ]
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|成功|Inline|

### 返回数据结构

## GET  查询某个NFT的http链接

GET /airdrops/tokenURI

 查询某个NFT的http链接

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|tokenId|query|string| 否 |NFT的tokenId，uint256类型|

> 返回示例

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|成功|Inline|

### 返回数据结构

## GET 获取用户来领取NFT空投proof信息

GET /airdrops/getClaimProof

获取用户来领取NFT空投proof信息

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|dropId|query|string| 是 |要领取的空投的批次Id，uint256类型|
|address|query|string| 是 |用户钱包地址|

> 返回示例

> 成功

```json
{
  "code": 0,
  "msg": "ok",
  "data": {
    "address": "0x51a41ba1ce3a6ac0135ae48d6b92bed32e075ff0",
    "tokenId": 110,
    "leaf": "0xdeaad27b02fa71c65d83387a45bc2d214ecefb1b742930394a2c19db79c2f895",
    "proof": [
      "0x3b06c5aef68238d94e75d563356c602f3d811acdf5fe4cda62346429af69d615",
      "0xa7b5f6c6ea83ecfa05944390d0c4ad630668029f462b4aeb09df144dbe906d96"
    ],
    "dropId": "20"
  }
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|成功|Inline|

### 返回数据结构

# 数据模型

