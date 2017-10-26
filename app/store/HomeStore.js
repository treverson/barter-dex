import {observable,action,computed} from 'mobx';
import { ROOT_DEX } from '../utils/constants.js';
import request from 'request';
import tcpPortUsed from 'tcp-port-used';
class HomeStore{
	@observable ROOT_DEX = ROOT_DEX;
	@observable passphrase ="";
	@observable userpass = null;
	@observable enabled_coins = [];
	@observable coins = {};
	@observable base = { coin: "BTC", balance: 0, };
	@observable buyState = {
		price: "",
		amount: "",
		total: "",
	};
	@observable sellState = {
		price: "",
		amount: "",
		total: "",
	};
	@observable intervalTimer = null;
	@observable checkIfRunningTimer = null;
	@observable intervalTimerBook = null;
	@observable maxdecimal = 8;
	@observable indicator = [25,50,75,100];
	@observable gui = 'gecko';
	@observable available_coins = [];
	@observable url = 'http://127.0.0.1:7783';
	@observable host = '127.0.0.1';
	@observable port = 7783;
	@observable orderBookRate = 2000;


  runCommand = (method, data = {}) => {
  	    data.gui = this.gui;
  	    data.method = method;
  	    data.userpass = this.userpass;
        const jsonData = JSON.stringify(data);
        const headersOpt = {
            'Content-Type': 'application/json',
            'Content-Length': Buffer.byteLength(jsonData),
        };
        console.log(data);
        return new Promise((resolve, reject) => {
            request(
                {
                    method: 'post',
                    url: this.url,
                    form: jsonData,
                    headers: headersOpt,
                    strictSSL: false,
                    json: true
                }, (error, response, body) => {
        		console.log(body);
                if (error) {
                	console.log(error,data);
                    return reject(error);
                }
                return resolve(body);
            });
        });
    }	
	@action makeUnique = () => {
		const uniqueArray = this.enabled_coins.filter((item, pos) => {
			return this.enabled_coins.indexOf(item) == pos;
		})
		this.enabled_coins = uniqueArray;
	} 
	isRunning = () => {
		return new Promise((resolve, reject) => {
			tcpPortUsed.check(this.port, this.host).then(function(inUse) {
		  		return resolve(inUse);
			}, function(err) {
		  		return reject(err);
			});
		});
	}    
}
export default new HomeStore;
