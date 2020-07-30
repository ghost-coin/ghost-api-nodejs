
Ghost Node.js Public API's
===============

## Custom API Endpoints for dApps like Marketplace, Chat
`/smsgget` - will get specific smsg using id  

*Parameters*:  
msgId           (string)            The message id to get  
remove          (boolean: false)    If true, delete message after get  
setRead         (boolean: true)     If true, mark message as rea after get

*Result (object)*:   
msgid           (string)            The message identifier  
version         (string)            The message version  
location        (string)            The message location (inbox|outbox|sending)  
received        (int)               Time the message received  
to              (string)            Address the message sent to  
read            (boolean)           Read status  
sent            (int)               Time the message was created  
paid            (boolean)           Paid or free message  
daysretention   (int)               Number of days message will stay in the network  
ttl             (int)               Seconds message will stay in the network for  


`/smsglist` - will list all for specific address 

*Parameters*:  
mode            (string: all)       List all messages, unread messages or clear all messages (all|unread|clear)  
filter          (string: )          Filter messages when in list mode  
options         (object)            Optional parameters (updatestatus, encoding)  

*Result (object)*:  
msgid           (string)            The message identifier  
version         (string)            The message version  
received        (string)            The message was received  
sent            (string)            The message was sent  
daysretention   (int)               Number of days message will stay in the network for  
ttl             (int)               Seconds message will stay in the network for  
from            (string)            Address the message was sent from  
to              (string)            Address the message was sent to  
text            (string)            Message text  

`/smsgsend` - send smsg to ghost blockchain

*Parameters*:  
fromAddress     (string)            The sender address  
toAddrss        (string)            The receiver address  
message         (string)            The message to send  
paid_msg        (string)            Send as paid message  
days_rentetion  (int)               Number of days for which the message will be retained by network  
estimateFee     (boolean)           If true, the message is not sent, just estimate the fee  

*Result (object)*:  
result          (string)            Sent/Not Sent  
msgid           (string)            if sent, a message identifier  
txid            (string)            if paid_msg the txnid of the funding txn  
fee             (float)                   if paid_msg the fee paid  

`/smsgsendanon` - send a anon encrypted smsg to ghost blockchain  

*Parameters*:  
toAddree        (string)            Address to send to  
message         (string)            Message to send  

*Result*:
response        (boolean)           Success/Fail


Also needs to develop a javascript Lib, like web3.js for storing smsg, getting smsg for a dApp which will allow devs to create marketplace, chat, email like dApps on top of ghost chain


## Public RPC API’s

### Address Actions
`getaddressbalance`

`getaddressdeltas`

`getaddressmempool`

`getaddresstxids`

`getaddressutxos`

### Blockchain Actions
`getbestblockhash`

`getblock`

`getblockcount`

`getblockdeltas`

`getblockhash`

`getblockhashes`

`getblockheader`

`getchaintips`

`getchaintxstats`

`getdifficulty`


### Rawtransactions
`decoderawtransaction`

`decodescript`

`getrawtransaction`

`sendrawtransaction`


### Util
`estimatefee`

`estimatesmartfee`

`validateaddress`

`verifymessage`
