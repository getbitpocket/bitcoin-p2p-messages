import Ping from './ping'
import Pong from './pong'
import Version from './version'
import Verack from './verack'
import Mempool from './mempool'
import Getheaders from './getheaders'
import Inv from './inv'
import Tx from './tx'
import Headers from './headers'
import Addr from './addr'
import Getaddr from './getaddr'
import Notfound from './notfound'
import Reject from './reject'

export default {
    'ping'    : Ping ,
    'pong'    : Pong ,
    'version' : Version ,
    'verack'  : Verack ,
    'mempool' : Mempool ,
    'getheaders' : Getheaders ,
    'inv' : Inv ,
    'tx' : Tx ,
    'headers' : Headers ,
    'addr' : Addr ,
    'getaddr' : Getaddr ,
    'notfound' : Notfound ,
    'reject' : Reject
}