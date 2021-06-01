//================================================================
// * Plugin Name    : Ajax-Core
// - Last updated   : 02/3/2021
//================================================================
/*:
 * @plugindesc v1.6 A helper plugin for SERVER-CORE plugins. New
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
 * @arg joueur_api_url
 * @text l'url
 * @default https://cupidiarx.com/devzone/data/public/api/joueurs
 * @desc veillez entrer l'url
 *
*/
/*test message
 */
var Imported = Imported || {};

Imported.Ajax_Core = {};
Imported.Ajax_Core.Ajax_Data_Response = {};
Imported.Ajax_Core.table = '';
Imported.Ajax_Core.url = "https://cupidiarx.com/devzone/data/public/api/joueurs";
Imported.Ajax_Core.base_url = "https://cupidiarx.com/devzone/data/public/api/joueurs";

Imported.Ajax_Core.command = '';
Imported.Ajax_Core.data = {};
Imported.Ajax_Core.methode = 'GET';
Imported.Ajax_Core.dataType = 'json';
Imported.Ajax_Core.contentType = 'application/json; charset=utf-8';
Imported.Ajax_Core.async = false;
Imported.Ajax_Core.cache = false;
Imported.Ajax_Core.joueurID = null;
Imported.Ajax_Core.joueurFound = false;

const  GET_REQUEST = "GET";
const  POST_REQUEST = "POST";

Imported.Ajax_Core.version = 1.3;

Imported.Ajax_Core.params = PluginManager.processParameters(PluginManager.parameters('Ajax-Core'));
Imported.Ajax_Core.params.autoUpdate = Imported.Ajax_Core.params.autoUpdate || true;
Imported.Ajax_Core.url = Imported.Ajax_Core.params.joueur_api_url || Imported.Ajax_Core.url;
Imported.Ajax_Core.base_url = Imported.Ajax_Core.params.joueur_api_url || Imported.Ajax_Core.base_url;


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
    const versionPath = path.join(base, "js/") + "Ajax_CoreVersion.json";
    const Ajax_Core_pluginPath = path.join(base, "js/plugins/") + "Ajax-Core.js";
    const Ajax_Crud_pluginPath = path.join(base, "js/plugins/") + "Ajax-crud.js";
    download('https://geonidas6.github.io/rpgajax.github.io/plugin/Ajax_CoreVersion.json', versionPath, ()=>{
        const version = fs.readFileSync(versionPath, {encoding: "utf-8"});
        if (Number(version) > Imported.Ajax_Core.version) {
            download('https://geonidas6.github.io/rpgajax.github.io/plugin/Ajax-Core.js', Ajax_Core_pluginPath, ()=>{
                console.warn("UPDATED: Ajax-Core to version: " + version);
            });
            download('https://geonidas6.github.io/rpgajax.github.io/plugin/Ajax-crud.js', Ajax_Crud_pluginPath, ()=>{
                console.warn("UPDATED: Ajax-crud to version: " + version);
            });
        } else {
            console.warn("Ajax-Core version actuelle " + version+" aucune autre version n'a été trouver");
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


if (Imported.Ajax_Core.params.autoUpdate && Utils.isOptionValid("test")) {
    try {
        PluginManager.checkForNewVersion();
    } catch(e) {
        console.warn("Can't not update Ajax-Core!",e);
    }
}



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
Imported.Ajax_Core.params.showDevTool = Imported.Ajax_Core.params.showDevTool || true;
if (Imported.Ajax_Core.params.showDevTool) {
    if (Utils.isNwjs() && Utils.isOptionValid("test")) {
        nw.Window.get().showDevTools();
    }
}



Imported.Ajax_Core.sendAjax = function () {

    $.ajax({
        type: Imported.Ajax_Core.methode,
        data: {
            'table': Imported.Ajax_Core.table,
            'data':Imported.Ajax_Core.data
        },
        url: Imported.Ajax_Core.url  ,
        async: Imported.Ajax_Core.async,   // asynchronous request? (synchronous requests are discouraged...)
        cache: Imported.Ajax_Core.cache,   // with this, you can force the browser to not make cache of the retrieved data
        dataType: Imported.Ajax_Core.dataType,  // jQuery will infer this, but you can set explicitly
        success: function( data, textStatus, jqXHR ) {
            console.log(Imported.Ajax_Core.command+' reponse',data)
            if (Imported.Ajax_Core.methode == GET_REQUEST){
                Imported.Ajax_Core.Ajax_Data_Response = data;
            }
        },
        error: function (jqXHR, exception) {
            var msg = '';
            if (jqXHR.status === 0) {
                msg = 'Not connect.\n Verify Network.';
            } else if (jqXHR.status == 404) {
                msg = 'Requested page not found. [404]';
            } else if (jqXHR.status == 500) {
                msg = 'Internal Server Error [500].';
            } else if (exception === 'parsererror') {
                msg = 'Requested JSON parse failed.';
            } else if (exception === 'timeout') {
                msg = 'Time out error.';
            } else if (exception === 'abort') {
                msg = 'Ajax request aborted.';
            } else {
                msg = 'Uncaught Error.\n' + jqXHR.responseText;
            }
            console.log(msg)
        },
    });
}


Imported.Ajax_Core.sendAjaxCrud = function () {

    $.ajax({
        type: Imported.Ajax_Core.methode,
        contentType: Imported.Ajax_Core.contentType,
        data: JSON.stringify(Imported.Ajax_Core.data),
        url: Imported.Ajax_Core.url  ,
        async: Imported.Ajax_Core.async,   // asynchronous request? (synchronous requests are discouraged...)
        cache: Imported.Ajax_Core.cache,   // with this, you can force the browser to not make cache of the retrieved data
        // dataType: Imported.Ajax_Core.dataType,  // jQuery will infer this, but you can set explicitly
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        success: function( data, textStatus, jqXHR ) {
            console.log(Imported.Ajax_Core.command+' reponse',data)
            if (Imported.Ajax_Core.methode == GET_REQUEST){
                Imported.Ajax_Core.Ajax_Data_Response = data;
                //console.log( 'core Imported.Ajax_Core.Ajax_Data_Response ',Imported.Ajax_Core.Ajax_Data_Response )
            }
        },
        error: function (jqXHR, exception) {
            var msg = '';
            if (jqXHR.status === 0) {
                msg = 'Not connect.\n Verify Network.';
            } else if (jqXHR.status == 404) {
                msg = 'Requested page not found. [404]';
            } else if (jqXHR.status == 500) {
                msg = 'Internal Server Error [500].';
            } else if (exception === 'parsererror') {
                msg = 'Requested JSON parse failed.';
            } else if (exception === 'timeout') {
                msg = 'Time out error.';
            } else if (exception === 'abort') {
                msg = 'Ajax request aborted.';
            } else {
                msg = 'Uncaught Error.\n' + jqXHR.responseText;
            }
            console.log(msg)
        },
    });
}


Imported.Ajax_Core.sendAjaxCrudtest = function () {
    $.ajax({

        type: 'POST',
        url: "http://rpg_backoffice.test/api/player_names"  ,
        async: Imported.Ajax_Core.async,   // asynchronous request? (synchronous requests are discouraged...)
        cache: Imported.Ajax_Core.cache,   // with this, you can force the browser to not make cache of the retrieved data
        dataType : "json",
        contentType: "application/json; charset=utf-8",
        data : JSON.stringify({
            "playername": "Fghfgh",
        }),

        success: function( data, textStatus, jqXHR ) {
            console.log(Imported.Ajax_Core.command+' reponse',data)
            if (Imported.Ajax_Core.methode == GET_REQUEST){
                Imported.Ajax_Core.Ajax_Data_Response = data;
            }
        },
        error: function (jqXHR, exception) {
            var msg = '';
            if (jqXHR.status === 0) {
                msg = 'Not connect.\n Verify Network.';
            } else if (jqXHR.status == 404) {
                msg = 'Requested page not found. [404]';
            } else if (jqXHR.status == 500) {
                msg = 'Internal Server Error [500].';
            } else if (exception === 'parsererror') {
                msg = 'Requested JSON parse failed.';
            } else if (exception === 'timeout') {
                msg = 'Time out error.';
            } else if (exception === 'abort') {
                msg = 'Ajax request aborted.';
            } else {
                msg = 'Uncaught Error.\n' + jqXHR.responseText;
            }
            console.log(msg)
        },
    });
}





Imported.Ajax_Core.capitalize = function (s) {
    // returns the first letter capitalized + the string from index 1 and out aka. the rest of the string
    return s[0].toUpperCase() + s.substr(1);
}


Imported.Ajax_Core.nowDate = function (format = 'yyyy-mm-dd HH:mm:ss') {
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
