
# airdedrops

> v1.0.0

# Default

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

## POST 设置NFT链接的网关

POST /airdrops/baseUri

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|uri|query|string| 是 |none|

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

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|account|query|string| 是 |铸造给谁，address类型|
|description|query|string| 是 |A human readable description of the item. Markdown is supported. |
|image|query|string| 是 |This is the URL to the image of the item. Can be just about any type of image (including SVGs, which will be cached into PNGs by OpenSea), and can be IPFS URLs or paths. We recommend using a 350 x 350 image.|
|nftname|query|string| 是 |Name of the item. |
|attributes|query|string| 是 |To give your items a little more pizazz, we also allow you to add custom "attributes" to your metadata that will show up underneath each of your assets.|
|external_url|query|string| 否 |A human readable description of the item. Markdown is supported.  } description   * @param {This is the URL that will appear below the asset's image on OpenSea and will allow users to leave OpenSea and view the item on your site.|

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

# 数据模型

