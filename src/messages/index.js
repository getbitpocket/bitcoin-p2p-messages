import Ping from './ping'
import Pong from './pong'
import Version from './version'
import Verack from './verack'
import Getaddr from './getaddr'
import Mempool from './mempool'
import Getheaders from './getheaders'
import Inv from './inv'
import Tx from './tx'
import Headers from './headers'

export default {
    'ping'    : Ping ,
    'pong'    : Pong ,
    'version' : Version ,
    'verack'  : Verack ,
    'getaddr' : Getaddr ,
    'mempool' : Mempool ,
    'getheaders' : Getheaders ,
    'inv' : Inv ,
    'tx' : Tx ,
    'headers' : Headers
}