import * as utils from '../../src/utils'
import BigInteger from 'bigi'

export default [
    {
        message : 'f9beb4d976657261636b000000000000000000005df6e0e2' ,
        json    : {
            network : 'mainnet' ,
            command : 'verack' ,
            payload : {}
        }
    } ,
    /*
    {
        message : 'f9beb4d970696e67000000000000000008000000c6466f1e6b86480ae969867c' ,
        json    : {
            network : 'mainnet' ,
            command : 'ping' ,
            payload : {
                nonce : new Buffer("6b86480ae969867c","hex")
            }
        }
    } ,
    {
        message : 'f9beb4d9706f6e67000000000000000008000000c6466f1e6b86480ae969867c' ,
        json    : {
            network : 'mainnet' ,
            command : 'pong' ,
            payload : {
                nonce : new Buffer('6b86480ae969867c','hex')
            }
        }
    } ,
    {
        message : 'f9beb4d9676574616464720000000000000000005df6e0e2' ,
        json    : {
            network : 'mainnet' ,
            command : 'getaddr' ,
            payload : {}
        }
    } ,
    {
        message : 'f9beb4d96d656d706f6f6c0000000000000000005df6e0e2' ,
        json    : {
            network : 'mainnet' ,
            command : 'mempool' ,
            payload : {}
        }
    } ,
    {
        message : 'f9beb4d967657468656164657273000045000000a2165cd97011010001b91ddbbfc801b7fe6f470ce9528f98f01b496b53f23c41130000000000000000a1112367496906e6d89dc1cfdbf33a95cb8a1270f59e530b0000000000000000' ,
        json    : {
            network : 'mainnet' ,
            command : 'getheaders' ,
            payload : {
                version : 70000 ,
                hashCount : 1 ,
                hashes : [new Buffer('b91ddbbfc801b7fe6f470ce9528f98f01b496b53f23c41130000000000000000','hex')] ,
                hashStop : new Buffer('','hex')
            }
        }
    } ,
    {
        message : 'f9beb4d9747800000000000000000000020100009559b1b1010000000159fa9081526b419820f448512991925fc945e4ca032e3fd394fc6f01e88d05e8010000008b4830450221009950a6e0896a2477f3697419141d0759b55a767526fd4797d526110e8154234f022010e25ab9aad98d4fa277335a5149ff8aaf9dea29f7623d9a1dc8fa405b40f42c014104e0c76b3a203295af7a1c57f03222aa46cb87445043ffd910ea3c7b26b7244f31205ab6b36280cf2fcd3dffb993dd4972a90a8c9ff9813de575494a19cfbb6afdffffffff0240420f00000000001976a914069532d8d57a36fd7f12848ff7c4f27f5dc900ab88acb4002300000000001976a914a73e49d9cf3d61329cf15929366761fcb3c0efe088ac00000000' ,
        json    : {
            network : 'mainnet' ,
            command : 'tx' ,
            payload : {
                tx : new Buffer('010000000159fa9081526b419820f448512991925fc945e4ca032e3fd394fc6f01e88d05e8010000008b4830450221009950a6e0896a2477f3697419141d0759b55a767526fd4797d526110e8154234f022010e25ab9aad98d4fa277335a5149ff8aaf9dea29f7623d9a1dc8fa405b40f42c014104e0c76b3a203295af7a1c57f03222aa46cb87445043ffd910ea3c7b26b7244f31205ab6b36280cf2fcd3dffb993dd4972a90a8c9ff9813de575494a19cfbb6afdffffffff0240420f00000000001976a914069532d8d57a36fd7f12848ff7c4f27f5dc900ab88acb4002300000000001976a914a73e49d9cf3d61329cf15929366761fcb3c0efe088ac00000000','hex')
            }
        }
    },
    {
        message : 'f9beb4d9696e76000000000000000000890200006e4f18431201000000f97347795bf7490ddeba98c129086f54e06633936a49a2a398defb49e5edbb00010000009cb17394db9280b2d5e7d9f01456358384e7453300d48138ca1590e8cd86632f010000000f810b6071b9808117c4b82619b4ae0a7994ed5a0f2c050e50fd5742c3b4e90901000000962798bce9cbfcee9a8c6b5df4cf8bed944eb31ec975e8c1be79b7ab010a1cb501000000baa905bcfc9d2641ecd759724f796a7614e91c7492507b418ba8e077a6e57054010000009a5ac6dae146392edf8b6e96c30951ed7752f9095fab61728207db0f135b18a30100000050e5f153e3f0d89ea432d9a26f088a89b3ca38dbf3f0247ddf15f80779915da801000000c255841510a284b88ba696ed9edfeb4cdb34966271c30bc3bce9fd881106850f0100000000e45af8455894f72cccc4053e1f5e6076a673982b1f4ca5b2abc7b6496823ab01000000c7e6dc049e5b0fdc0f8fac8934e84e9b2f0c3036c7c02638cc05ee2575d6be1701000000aef6435c03c99ee83702aaaf106dc853dee5bcb6025f3af67d1ec72202c437ad010000005369fc3dc81403fe52f766ef585245af908404be1b46e2ef67c93b748ef467e3010000002400f16a63c411ae5e336175afc26515e548c7267c0debdb6aa46830399ba35f01000000ceb4fa6a8ca2713baee2214422b73da47a20934c83d25017bd80053e65ef3091010000000d899968e591703ddd6fd6ce073837588209f8b3b245ecf1bf93e77b9806a6c501000000bddeb56581ad7882d8f2abc78e5a48b3de02d923cd1cfc7525d2dfe80470248a01000000f286188c0947b023f0ba5dd1ea596751d50f67fbe31e64ead39dd711d3585b5801000000e17ad100ebffd2d5a630d37fd2496b2f5ab6ae5c8812da3c642fb6b8dd37f5fd' ,
        json    : {
            network : 'mainnet' ,
            command : 'inv' ,
            payload : {
                count : 18 ,
                invs  : [
                    {
                        type : 1 ,
                        hash : new Buffer('f97347795bf7490ddeba98c129086f54e06633936a49a2a398defb49e5edbb00','hex')
                    } ,
                    {
                        type : 1 ,
                        hash : new Buffer('9cb17394db9280b2d5e7d9f01456358384e7453300d48138ca1590e8cd86632f','hex')
                    } ,
                    {
                        type : 1 ,
                        hash : new Buffer('0f810b6071b9808117c4b82619b4ae0a7994ed5a0f2c050e50fd5742c3b4e909','hex')
                    } ,
                    {
                        type : 1 ,
                        hash : new Buffer('962798bce9cbfcee9a8c6b5df4cf8bed944eb31ec975e8c1be79b7ab010a1cb5','hex')
                    } ,
                    {
                        type : 1 ,
                        hash : new Buffer('baa905bcfc9d2641ecd759724f796a7614e91c7492507b418ba8e077a6e57054','hex')
                    } ,
                    {
                        type : 1 ,
                        hash : new Buffer('9a5ac6dae146392edf8b6e96c30951ed7752f9095fab61728207db0f135b18a3','hex')
                    } ,
                    {
                        type : 1 ,
                        hash : new Buffer('50e5f153e3f0d89ea432d9a26f088a89b3ca38dbf3f0247ddf15f80779915da8','hex')
                    } ,
                    {
                        type : 1 ,
                        hash : new Buffer('c255841510a284b88ba696ed9edfeb4cdb34966271c30bc3bce9fd881106850f','hex')
                    } ,
                    {
                        type : 1 ,
                        hash : new Buffer('00e45af8455894f72cccc4053e1f5e6076a673982b1f4ca5b2abc7b6496823ab','hex')
                    } ,
                    {
                        type : 1 ,
                        hash : new Buffer('c7e6dc049e5b0fdc0f8fac8934e84e9b2f0c3036c7c02638cc05ee2575d6be17','hex')
                    } ,
                    {
                        type : 1 ,
                        hash : new Buffer('aef6435c03c99ee83702aaaf106dc853dee5bcb6025f3af67d1ec72202c437ad','hex')
                    } ,
                    {
                        type : 1 ,
                        hash : new Buffer('5369fc3dc81403fe52f766ef585245af908404be1b46e2ef67c93b748ef467e3','hex')
                    } ,
                    {
                        type : 1 ,
                        hash : new Buffer('2400f16a63c411ae5e336175afc26515e548c7267c0debdb6aa46830399ba35f','hex')
                    } ,
                    {
                        type : 1 ,
                        hash : new Buffer('ceb4fa6a8ca2713baee2214422b73da47a20934c83d25017bd80053e65ef3091','hex')
                    } ,
                    {
                        type : 1 ,
                        hash : new Buffer('0d899968e591703ddd6fd6ce073837588209f8b3b245ecf1bf93e77b9806a6c5','hex')
                    } ,
                    {
                        type : 1 ,
                        hash : new Buffer('bddeb56581ad7882d8f2abc78e5a48b3de02d923cd1cfc7525d2dfe80470248a','hex')
                    } ,
                    {
                        type : 1 ,
                        hash : new Buffer('f286188c0947b023f0ba5dd1ea596751d50f67fbe31e64ead39dd711d3585b58','hex')
                    } ,
                    {
                        type : 1 ,
                        hash : new Buffer('e17ad100ebffd2d5a630d37fd2496b2f5ab6ae5c8812da3c642fb6b8dd37f5fd','hex')
                    }
                ]
            }
        }
    },
    {
        message : 'f9beb4d9686561646572730000000000f400000043385d010302000000b91ddbbfc801b7fe6f470ce9528f98f01b496b53f23c411300000000000000004901c9d18d0a468b20cc62ddf75aee58cf410440ea390300bf7a5f6848be350508d4cb54c0a31a18b9f661ec0002000000a02d6472e3e6fc9a1cebeaad14a90208a715e2bd234ea00600000000000000006f596f650fbbd5478489c66d651c9e3ea56f394d1f1481f90975cf0c8dda45fd3ad4cb54c0a31a1872e262a200020000002e4db38f1970099bf21335edd604e7a591213e189d1d1806000000000000000031a30091f5bdbca8958d2c4ccc0bfa9df93e2a3ea4d00e03222a663179db90a756d6cb54c0a31a187947855000' ,
        json    : {
            network : 'mainnet' ,
            command : 'headers' ,
            payload : {
                count : 0 ,
                headers : []
            }
        }
    }

    {
        message : 'f9beb4d976657273696f6e000000000065000000fc970f17721101000100000000000000ba62885400000000010000000000000000000000000000000000ffffba8886dceab0010000000000000000000000000000000000ffff05095522208de7e1c1ef80a1cea70f2f5361746f7368693a302e392e312fa317050001' ,
        json    : {
            network : 'mainnet' ,
            command : 'version' ,
            payload : {

            }
        }
    }
     /**/
];

