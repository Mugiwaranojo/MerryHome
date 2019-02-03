const { spawn } = require('child_process');

 class VSX {

    constructor() {
        this.ip = require("./config.json").ip;
        this.port = require("./config.json").port;
        this.isReady = true;
    }

    request(key, val) {
        if (this.isReady) {
            this.isReady = false;
            try {
                var self = this;
                console.log('telnet ' + this.ip + ' ' + this.port);
                var telnet = spawn('telnet', [this.ip, this.port]);
                telnet.stdin.write(key + "\n");
                console.log('write key ' + key + ' ' + val);
                var start = true;
                telnet.stdout.on('data', (data) => {
					if (start) {
                        start = false;
                    }else if (val && data) {
                        var tempVal = val * 2 + 1;
                        var ampliVal = parseInt(data.toString().substr(3, 3));
                        if (tempVal === ampliVal) {
                            telnet.kill('SIGHUP');
                        } else if (tempVal > ampliVal) {
                            telnet.stdin.write("VU\n");
                        } else {
                            telnet.stdin.write("VD\n");
                        }
					} else if(data.toString("utf8").substr(0, 4)==="PWR0"){
                         telnet.stdin.write("PF\n");
                    } else if(data.toString("utf8").substr(0, 4)==="PWR2"){
                         telnet.stdin.write("PO\n");
                    } else {
                        telnet.kill('SIGHUP');
                        self.isReady = true;
                    }
                });
                telnet.on("error", function (e) {
                    console.log(e);
                    self.isReady = true;
                });
                telnet.on('exit', (code) => {
                    //console.log(`Child exited with code ${code}`);
                    self.isReady = true;
                });
            } catch (err) {
            }
        }
    }

}

module.exports = new VSX();