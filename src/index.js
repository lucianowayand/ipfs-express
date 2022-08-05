import { CID, create } from 'ipfs-http-client'
import { base64 } from "multiformats/bases/base64"

import express from 'express'
const app = express()
const port = 5000

const client = create()

app.get('/', async (req, res) => {
    const obj = { data: 'daa', params: 'param' }
    const cid = await client.dag.put(obj)
    const cidAddress = cid.toString(base64.encoder)
    const response = await client.dag.get(CID.parse(cidAddress, base64.decoder), '/')
    
    console.log(cid)
    res.send(response.value)
})

app.get('/ipfs/:cid', async (req,res)=>{
    const cid = req.params.cid
    const response = await client.dag.get(CID.parse(cid, base64.decoder), '/')
    
    res.send(response.value)
})

app.listen(port || 5000)

console.log('App listening on http://localhost:' + port)