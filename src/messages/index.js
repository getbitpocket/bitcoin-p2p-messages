import Ping from './ping'
import Pong from './pong'
import Version from './version'
import Verack from './verack'
import Mempool from './mempool'
import Getheaders from './getheaders'
import Inv from './inv'
import Tx from './tx'
import Block from './block'
import Merkleblock from './merkleblock'
import Headers from './headers'
import Addr from './addr'
import Getaddr from './getaddr'
import Notfound from './notfound'
import Reject from './reject'
import Getdata from './getdata'
import Getblocks from './getblocks'
import Filterclear from './filterclear'
import Filteradd from './filteradd'
import Filterload from './filterload'
import Sendheaders from './sendheaders'

export default {
    'ping'    : Ping ,
    'pong'    : Pong ,
    'version' : Version ,
    'verack'  : Verack ,
    'mempool' : Mempool ,
    'getheaders' : Getheaders ,
    'inv' : Inv ,
    'tx' : Tx ,
    'block' : Block ,
    'headers' : Headers ,
    'addr' : Addr ,
    'getaddr' : Getaddr ,
    'notfound' : Notfound ,
    'reject' : Reject ,
    'filterclear' : Filterclear ,
    'filteradd' : Filteradd ,
    'filterload' : Filterload ,
    'getdata' : Getdata ,
    'getblocks' : Getblocks ,
    'merkleblock' : Merkleblock ,
    'sendheaders' : Sendheaders
}