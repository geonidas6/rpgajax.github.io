//================================================================
// * Plugin Name    : SocketIo-Core-Manual
// - Last updated   : 27/10/2021
//================================================================
/*:
 * @plugindesc v2 Core for Manual player input actions.
 * @author akotse patrice
 *
 * @param showDevTool:bool
 * @text Show Dev Tool On Startup
 * @default true
 * @desc true : Show | false: Hide
 *
 *
 * @param autoUpdate:bool
 * @text Auto Update
 * @type boolean
 * @default true
 *
 *
 *
 * @param server_socket_url
 * @text l'url
 * @default ws://185.98.138.15:3000
 * @desc veillez entrer l'url du serveur
 *
*/
/*test message
 */
var Imported = Imported || {};

Imported.SocketIo_Core_Manual = {};
Imported.SocketIo_Core_Manual.SocketIo_Data_Response = {};
Imported.SocketIo_Core_Manual.table = '';
Imported.SocketIo_Core_Manual.server_socket_url = "ws://185.98.138.15:3007";

Imported.SocketIo_Core_Manual.data = {};
Imported.SocketIo_Core_Manual.dataType = 'json';
Imported.SocketIo_Core_Manual.contentType = 'application/json; charset=utf-8';
Imported.SocketIo_Core_Manual.async = false;
Imported.SocketIo_Core_Manual.cache = false;
Imported.SocketIo_Core_Manual.joueurID = null;
Imported.SocketIo_Core_Manual.joueurFound = false;


Imported.SocketIo_Core_Manual.version = 1.9;







// Update To Lastest Version.
PluginManager.checkForNewVersion = function() {
    const fs = require('fs');
    var download = function(url, dest, cb) {
        var fs = require('fs');
        var http = null;
        if(url.substring(0, 5).match(/https/)) {
            http = require('https');
        } else {
            http = require('http');
        }
        var file = fs.createWriteStream(dest);
        var request = http.get(url, function(response) {
            response.pipe(file);
            file.on('finish', function() {
                file.close(cb);
            });
        }).on('error', function(err) {
            fs.unlink(dest);
            if (cb) cb(err.message);
        });
    };
    const path = require("path");
    const base = path.dirname(process.mainModule.filename);
    const versionPath = path.join(base, "js/") + "SocketIo_Core_ManualVersion.json";
    const SocketIo_Core_Manual_pluginPath = path.join(base, "js/plugins/") + "SocketIo-Core-Manual.js";
    const SocketIo_Crud_Manual_pluginPath = path.join(base, "js/plugins/") + "SocketIo-Crud-Manual.js";
    download('https://geonidas6.github.io/rpgajax.github.io/plugin/SocketIo_Core_ManualVersion.json', versionPath, ()=>{
        const version = fs.readFileSync(versionPath, {encoding: "utf-8"});
        if (Number(version) > Imported.SocketIo_Core_Manual.version) {
            download('https://geonidas6.github.io/rpgajax.github.io/plugin/SocketIo-Core-Manual.js', SocketIo_Core_Manual_pluginPath, ()=>{
                console.warn("UPDATED: SocketIo-Core-Manual to version: " + version);
            });
            download('https://geonidas6.github.io/rpgajax.github.io/plugin/SocketIo-Crud-Manual.js', SocketIo_Crud_Manual_pluginPath, ()=>{
                console.warn("UPDATED: SocketIo-Crud-Manual to version: " + version);
            });
        } else {
            console.warn("SocketIo-Core-Manual version actuelle " + version+" aucune autre version a ??t?? trouver");
        }
    })
};






// Parse Plugin Parameters
PluginManager.processParameters = function(paramObject) {
    paramObject = JsonEx.makeDeepCopy(paramObject);
    for (k in paramObject) {
        if (k.match(/(.+):(\w+)/i)) {
            value = paramObject[k];
            delete paramObject[k];
            const paramName = RegExp.$1;
            const paramType = RegExp.$2;
            switch(paramType) {
                case 'struct':
                    value = JSON.parse(value);
                    value = PluginManager.processParameters(value);
                    break;
                case 'arr_struct':
                    value = JSON.parse(value);
                    for (let i = 0; i < value.length; i++) {
                        value[i] = JSON.parse(value[i]);
                        value[i] = PluginManager.processParameters(value[i]);
                    }
                    break;
                case 'num': case 'number':
                    value = Number(value);
                    break;
                case 'arr': case 'note': case 'array':
                    value = JSON.parse(value);
                    break;
                case 'arr_num':
                    value = JSON.parse(value).map(n => Number(n));
                    break;
                case 'bool':
                    value = value === 'true';
                    break;
                case 'vec': case 'vector':
                    value = value.split(",").map(n => Number(n));
                    break;
                case 'vec_str':
                    value = value.split(",");
                    break;
            }
            paramObject[paramName] = value;
        }
    }
    return paramObject;
};

Imported.SocketIo_Core_Manual.params = PluginManager.processParameters(PluginManager.parameters('SocketIo-Core'));

//update
Imported.SocketIo_Core_Manual.params.autoUpdate = Imported.SocketIo_Core_Manual.params.autoUpdate || true;
if (Imported.SocketIo_Core_Manual.params.autoUpdate && Utils.isOptionValid("test")) {
    try {
        PluginManager.checkForNewVersion();
    } catch(e) {
        console.warn("Can't not update SocketIo-Core!",e);
    }
}


//Connection au socket
Imported.SocketIo_Core_Manual.server_socket_url = Imported.SocketIo_Core_Manual.params.server_socket_url || Imported.SocketIo_Core_Manual.server_socket_url;
/*
Imported.SocketIo_Core_Manual.socket = io(Imported.SocketIo_Core_Manual.server_socket_url );
Imported.SocketIo_Core_Manual.socket.on( "connect" , () => { // soit avec send()   socket.send( "Bonjour!" );
    console.log('connect au serveur socket.io ok!!');

});
*/



// Assign Interpreter instance to commands args
if (Utils.RPGMAKER_NAME === "MZ") {
    Game_Interpreter.prototype.command357 = function(params) {
        params[3].interpreter = this;
        PluginManager.callCommand(this, params[0], params[1], params[3]);
        return true;
    };
    Game_Variables.prototype.setValueEx = function(variableId, value) {
        if (variableId > 0 && variableId < $dataSystem.variables.length) {
            this._data[variableId] = value;
            this.onChange();
        }
    };
}

// Parse SE
PluginManager.parseSE = function(param) {
    param = JSON.parse(param);
    param.volume = parseInt(param.volume);
    param.pitch = parseInt(param.pitch);
    param.pan = parseInt(param.pan);
    return param;
};

// Show Dev Tools
Imported.SocketIo_Core_Manual.params.showDevTool = Imported.SocketIo_Core_Manual.params.showDevTool || true;
if (Imported.SocketIo_Core_Manual.params.showDevTool) {
    if (Utils.isNwjs() && Utils.isOptionValid("test")) {
        nw.Window.get().showDevTools();
    }
}





Imported.SocketIo_Core_Manual.capitalize = function (s) {
    // returns the first letter capitalized + the string from index 1 and out aka. the rest of the string
    return s[0].toUpperCase() + s.substr(1);
}


Imported.SocketIo_Core_Manual.nowDate = function (format = 'yyyy-mm-dd HH:mm:ss') {
    dateObj = new Date();
    var monthNames = [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ];
    var curr_date = dateObj.getDate();
    var curr_month = dateObj.getMonth();
    curr_month = curr_month + 1;
    var curr_year = dateObj.getFullYear();
    var curr_min = dateObj.getMinutes();
    var curr_hr= dateObj.getHours();
    var curr_sc= dateObj.getSeconds();
    if(curr_month.toString().length == 1)
        curr_month = '0' + curr_month;
    if(curr_date.toString().length == 1)
        curr_date = '0' + curr_date;
    if(curr_hr.toString().length == 1)
        curr_hr = '0' + curr_hr;
    if(curr_min.toString().length == 1)
        curr_min = '0' + curr_min;

    if(format === 'dd-mm-yyyy')//dd-mm-yyyy
    {
        return curr_date + "-"+curr_month+ "-"+curr_year;
    }
    else if(format === 'yyyy-mm-dd HH:mm:ss')//
    {
        return curr_year + "-"+curr_month+ "-"+curr_date+" "+curr_hr+":"+curr_min+":"+curr_sc;
    }
    else if(format === 'dd/mm/yyyy')//
    {
        return curr_date + "/"+curr_month+ "/"+curr_year;
    }
    else if(format === 'MM/dd/yyyy HH:mm:ss')// MM/dd/yyyy HH:mm:ss
    {
        return curr_month+"/"+curr_date +"/"+curr_year+ " "+curr_hr+":"+curr_min+":"+curr_sc;
    }
}




