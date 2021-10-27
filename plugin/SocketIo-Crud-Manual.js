//================================================================
// * Plugin Name    : SocketIo-Crud-Manual
// - Last updated   : 08/03/2021
//site interressant http://endlessillusoft.com/rpgmaker-mv-plugin-list/
//site interressant https://kinoar.github.io/rmmv-doc-web/globals.html
//================================================================
/*:
 * @plugindesc v1.0 pour tester l'envois et la reception de donnée par web socket.
 * @author akotse patrice
 * @target MZ
 *
 * @help Elle permet de récuper et d'envoyer les donnée par web socket
 *
 *
 *
 *
 *
 * @command getlast
 * @text recuperer le dernier elements
 *
 *
 *
 * @arg champsArray
 * @text Array de champs par ID de variable
 * @type variable[]
 * @desc Liste des champs
 * @default ["100","101","102"]
 *
 * @arg listchamps
 * @text la liste des champs
 * @type variable
 * @default 449
 * @desc entrer les champs de la table séparer de virgule
 * attention a lordre car elle seront affecter au variable
 * par rapport au numero
 *
 * @arg table
 * @text nom de la table
 * @default joueur
 * @desc veillez entrer le nom de la table
 *
 * @arg isEmpty
 * @text true si c'est vide
 * @type variable
 * @default 446
 * @desc true si c'est vide , false si c'est pas vide
 *
 *
 *
 *
 *
 *
 *
 * ==========================================getOneByChamps==============================
 *
 *
 *
 *
 *
 *
 *
 *
 * @command getOneByChamps
 * @text recuperer un element en foction d'une liste de champs
 *
 *
 *
 * @arg champsArray
 * @text Array de champs par ID de variable
 * @type variable[]
 * @desc Liste des champs
 * @default ["100","101","102"]
 *
 * @arg listchamps
 * @text la liste des champs conditionné
 * @type variable
 * @default 449
 * @desc entrer les champs de la table "dont la recherche sera fait par" séparer de virgule
 * attention a lordre car elle seront affecter au variable
 * par rapport au numero
 *
 *
 * @arg chamspcondition
 * @text la liste des champs conditionné
 * @type variable
 * @default 447
 * @desc entrer leschamps conditionné de la table à récupérer séparer de virgule
 * attention a lordre car elle seront affecter au variable
 * par rapport au numero
 *
 * @arg table
 * @text nom de la table
 * @default joueur
 * @desc veillez entrer le nom de la table
 *
 *
 * @arg isEmpty
 * @text true si c'est vide
 * @type variable
 * @default 446
 * @desc true si c'est vide , false si c'est pas vide
 *
 *
 *
 *
 * ==========================================editOneLine==============================
 *
 *
 *
 *
 *
 *
 *
 *
 * @command editOneLine
 * @text modifier  un element en foction d'une liste de champs
 *
 *
 *
 * @arg champsArray
 * @text Array de champs par ID de variable
 * @type variable[]
 * @desc Liste des champs
 * @default ["100","101","102"]
 *
 * @arg listchamps
 * @text la liste des champs
 * @type variable
 * @default 449
 * @desc entrer les champs de la table "dont la recherche sera fait par" séparer de virgule
 * attention a lordre car elle seront affecter au variable
 * par rapport au numero
 *
 *
 * @arg chamspcondition
 * @text la liste des champs conditionné
 * @type variable
 * @default 447
 * @desc entrer leschamps conditionné de la table à modifier séparer de virgule
 * attention a lordre car elle seront affecter au variable
 * par rapport au numero
 *
 * @arg table
 * @text nom de la table
 * @default joueur
 * @desc veillez entrer le nom de la table
 *
 *
 * @arg isEmpty
 * @text true si c'est vide
 * @type variable
 * @default 446
 * @desc true si c'est vide , false si c'est pas vide
 *
 *
 *
 *
 *
 * ==========================================deleleteByChamps==============================
 *
 *
 *
 *
 *
 *
 *
 *
 * @command deleleteByChamps
 * @text deleleteByChamps un element en foction d'une liste de champs
 *
 *
 *
 * @arg champsArray
 * @text Array de champs par ID de variable
 * @type variable[]
 * @desc Liste des champs
 * @default ["100","101","102"]
 *
 *
 *
 * @arg chamspcondition
 * @text la liste des champs conditionné
 * @type variable
 * @default 447
 * @desc entrer leschamps conditionné de la table à récupérer séparer de virgule
 * attention a lordre car elle seront affecter au variable
 * par rapport au numero
 *
 * @arg table
 * @text nom de la table
 * @default joueur
 * @desc veillez entrer le nom de la table
 *
 *
 *
 *
 *
 *
 * =====================================save===========================
 *
 *
 *
 *
 * @command Save
 * @text Ajouter
 * @desc fonction Post
 *
 *
 * @arg champsArray
 * @text Array de champs par ID de variable
 * @type variable[]
 * @desc Liste des champs
 * @default ["100","101","102"]
 *
 * @arg listchamps
 * @text la liste des champs
 * @type variable
 * @default champs1
 * @desc entrer les champs de la table séparer de virgule
 * attention a lordre car elle seront affecter au variable
 * par rapport au numero
 *
 * @arg table
 * @text nom de la table
 * @default joueur
 * @desc veillez entrer le nom de la table
 *
 *
*/
var Imported = Imported || {};
Imported.SocketIo_Core_Manual = Imported.SocketIo_Core_Manual || {};
Imported.SocketIo_Core_Manual.version = 1.5;
data_response = {};
start = true;


(function () {


// $gameVariables.setValue(args.puissance,ddg)
//$gameVariables.value(args.puissance)
//args.puissance
//Number()
    PluginManager.registerCommand('SocketIo-Crud-manual', "Save", args => {
        //console.log('%c===================command save log=================', 'background: #222; color: #bada55')
        var socket = io(Imported.SocketIo_Core_Manual.server_socket_url);
        socket.on("connect", () => { // soit avec send()   socket.send( "Bonjour!" );
            //console.log('connect au serveur socket.io ok!!');

        });
        //récupération du array de la liste des champs
        var listchamps = $gameVariables.value(args.listchamps)
        // console.log(listchamps)
        //récuperation de la table
        var table = args.table
        // console.log(listchamps,table)
        var data_tab = [];
        //création d'un array coportant la list la liste des champs avec pour indixe les id des variable qui les on été affecter
        const champsArrays = JSON.parse(args.champsArray).map(arg => Number(arg));
        // console.log(champsArrays, listchamps)
        // affectationn des valeur au libellet pour former un objet
        for (let champsArray of champsArrays) {
            // console.log("'" + String($gameVariables.value(champsArray)) .replace("'","''") + "'")
            data_tab.push("'" + String($gameVariables.value(champsArray)) .replace("'","''") + "'")
        }
        //console.log(data_tab)
        //j'en vois au serveur la liste des champs et la table
        socket.emit("insertOneLine", {listchamps: listchamps.splice(","), table: table, values: data_tab.splice(",")})
        socket.on("insertOneLine", (data) => {
            //console.log('%c command save resultat ==>' + data, 'background: #6174d1; color: #bada55')
            //console.log('%c===================end command save log=================', 'background: #b0413e; color: #ffffff')
            // console.log('test variable 101',  $gameVariables.value(101))
        })

        /*Exemple de scropt */
        /*
◆Script：$gameVariables.setValue(499, ["name","datecreation"]);
：      ：$gameVariables.setValue(101, "toto");
：      ：var today = new Date();
：      ：var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
：      ：var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
：      ：var CurrentDateTime = date+' '+time;
：      ：$gameVariables.setValue(102, CurrentDateTime);
◆Module complémentaire：SocketIo-Crud-manual, Ajouter
：                     ：Array de champs par ID de variable = ["101","102"]
：                     ：la liste des champs = 499
：                     ：nom de la table = joueur*/

    });


    PluginManager.registerCommand('SocketIo-Crud-manual', "getlast", args => {
        //console.log('%c===================command getlast log=================', 'background: #222; color: #bada55')
        var socket = io(Imported.SocketIo_Core_Manual.server_socket_url);
        socket.on("connect", () => { // soit avec send()   socket.send( "Bonjour!" );
            //console.log('connect au serveur socket.io ok!!');

        });

        var data_tab = [];
        //récupération du array de la liste des champs
        var listchamps = $gameVariables.value(args.listchamps)
        // console.log(listchamps)
        //récuperation de la table
        var table = args.table
        // console.log(listchamps,table)
        //création d'un array coportant la list la liste des champs avec pour indixe les id des variable qui les on été affecter
        const champsArrays = JSON.parse(args.champsArray).map(arg => Number(arg));
        var i = 0;
        for (let champsArray of champsArrays) {
            data_tab[listchamps[i]] = champsArray;
            i++;
        }


        //j'en vois au serveur la liste des champs et la table
        socket.emit("getlast", {listchamps: listchamps.toString(), table: table})
        socket.on("getlast", (data) => {
            //console.log('%c command getlast resultat ==>', 'background: #6174d1; color: #bada55')
            //console.log(data)
            if (data.length === 1) {
                $gameVariables.setValue(args.isEmpty, false);
                for (const property in data[0]) {
                    if (data_tab[property]) {
                        // console.log( property,data_tab[property], data[0][property])
                        $gameVariables.setValue(data_tab[property], data[0][property])
                    }
                }
            }else {
                $gameVariables.setValue(args.isEmpty, true);
            }
            // console.log('test variable 101',  $gameVariables.value(101))
            //console.log('%c===================end command getlast log=================', 'background: #b0413e; color: #ffffff')

        })


    });


    PluginManager.registerCommand('SocketIo-Crud-manual', "getOneByChamps", args => {
        console.log('%c===================command getOneByChamps log=================', 'background: #222; color: #bada55')
        var socket = io(Imported.SocketIo_Core_Manual.server_socket_url);
        socket.on("connect", () => {
            console.log('connect au serveur socket.io ok!!');
        });

        var data_tab = [];
        //récupération du array de la liste des champs de condition
        var listchamps = $gameVariables.value(args.listchamps)

        //récupération du array de la liste des champs de condition
        var chamspcondition = $gameVariables.value(args.chamspcondition)


        console.log(listchamps)
        //récuperation de la table
        var table = args.table

        console.log(listchamps,table)
        //création d'un array coportant la list la liste des champs avec pour indixe les id des variable qui les on été affecter
        const champsArrays = JSON.parse(args.champsArray).map(arg => Number(arg));
        var i = 0;
        var conditions = '';
        for (let champsArray of champsArrays) {
            if (chamspcondition[i]) {
                if(i > 0){
                    conditions += " AND "+chamspcondition[i] + " = '"+  String($gameVariables.value(champsArray)).replace("'","''")+"' ";
                }else {
                    conditions += chamspcondition[i] + " = '"+  String($gameVariables.value(champsArray)).replace("'","''")+"' ";
                }
            }
            data_tab[listchamps[i]] = champsArray;
            i++;
        }
        console.log("recuperation de la condition",conditions);
        //j'en vois au serveur la liste des champs et la table
        socket.emit("getOneByChamps", {listchamps: listchamps.toString(), table: table, conditions: conditions})
        console.log('envoi  des condition au serveur socket')
        socket.on("getOneByChamps", (data) => {
            console.log('%c command getOneByChamps resultat ==>', 'background: #6174d1; color: #bada55')
            console.log(data)
            if (data.length === 1) {
                $gameVariables.setValue(args.isEmpty, false)
                for (const property in data[0]) {
                    if (data_tab[property]) {
                        // console.log( property,data_tab[property], data[0][property])
                        $gameVariables.setValue(data_tab[property], data[0][property])
                    }
                }
            }else {
                $gameVariables.setValue(args.isEmpty, true)
            }

            // console.log('test variable 101',  $gameVariables.value(101))
            console.log('%c===================end command getOneByChamps log=================', 'background: #b0413e; color: #ffffff')

        })

        // ◆Script：$gameVariables.setValue(499, ["id","name","datecreation"]);
        // ：      ：$gameVariables.setValue(497, ["id"]);
        // ：      ：$gameVariables.setValue(100, 2);
        // ◆Module complémentaire：SocketIo-Crud-manual, recuperer un element en foction d'une liste de champs
        // ：                     ：Array de champs par ID de variable = ["100","101","102"]
        // ：                     ：la liste des champs conditionné = 499
        // ：                     ：la liste des champs conditionné = 497
        // ：                     ：nom de la table = joueur

    });






    PluginManager.registerCommand('SocketIo-Crud-manual', "editOneLine", args => {
        // console.log('%c===================command getOneByChamps log=================', 'background: #222; color: #bada55')
        var socket = io(Imported.SocketIo_Core_Manual.server_socket_url);
        socket.on("connect", () => {
            // console.log('connect au serveur socket.io ok!!');
        });

        var data_tab = [];
        //récupération du array de la liste des champs de condition
        var listchamps = $gameVariables.value(args.listchamps)

        //récupération du array de la liste des champs de condition
        var chamspcondition = $gameVariables.value(args.chamspcondition)


        // console.log(listchamps)
        //récuperation de la table
        var table = args.table

        // console.log(listchamps,table)
        //création d'un array coportant la list la liste des champs avec pour indixe les id des variable qui les on été affecter
        const champsArrays = JSON.parse(args.champsArray).map(arg => Number(arg));
        var i = 0;
        var conditions = '';
        var champsandvalue = '';
        for (let champsArray of champsArrays) {
            if (chamspcondition[i]) {
                if(i > 0){
                    conditions += " AND "+chamspcondition[i] + " = '"+  String($gameVariables.value(champsArray)).replace("'","''")+"' ";
                }else {
                    conditions += chamspcondition[i] + " = '"+  String($gameVariables.value(champsArray)).replace("'","''")+"' ";
                }
            }
            if (listchamps[i]) {
                if(i > 0){
                    champsandvalue += " , "+listchamps[i] + " = '"+  String($gameVariables.value(champsArray)).replace("'","''")+"' ";
                }else {
                    champsandvalue += listchamps[i] + " = '"+  String($gameVariables.value(champsArray)).replace("'","''")+"' ";
                }
            }
            data_tab[listchamps[i]] = champsArray;
            i++;
        }

        //console.log("recuperation de la condition",conditions);
        //j'en vois au serveur la liste des champs et la table
        socket.emit("editOneLine", {champsandvalue: champsandvalue, table: table, conditions: conditions})
        //console.log('envoi  des condition au serveur socket')
        socket.on("editOneLine", (data) => {
            // console.log('%c command getOneByChamps resultat ==>', 'background: #6174d1; color: #bada55')
            // console.log(data)
            if (data.length === 1) {
                $gameVariables.setValue(args.isEmpty, false)
                for (const property in data[0]) {
                    if (data_tab[property]) {
                        console.log( property,data_tab[property], data[0][property])
                        $gameVariables.setValue(data_tab[property], data[0][property])
                    }
                }
            }else {
                $gameVariables.setValue(args.isEmpty, true)
            }

            // console.log('test variable 101',  $gameVariables.value(101))
            // console.log('%c===================end command getOneByChamps log=================', 'background: #b0413e; color: #ffffff')

        })

        // ◆Script：$gameVariables.setValue(499, ["id","name","datecreation"]);
        // ：      ：$gameVariables.setValue(497, ["id"]);
        // ：      ：$gameVariables.setValue(100, 2);
        // ◆Module complémentaire：SocketIo-Crud-manual, recuperer un element en foction d'une liste de champs
        // ：                     ：Array de champs par ID de variable = ["100","101","102"]
        // ：                     ：la liste des champs conditionné = 499
        // ：                     ：la liste des champs conditionné = 497
        // ：                     ：nom de la table = joueur

    });


    PluginManager.registerCommand('SocketIo-Crud-manual', "deleleteByChamps", args => {
        //DELETE  FROM puissance WHERE id_joueur=1 AND
        //console.log('%c===================command deleleteByChamps log=================', 'background: #222; color: #bada55')
        var socket = io(Imported.SocketIo_Core_Manual.server_socket_url);
        socket.on("connect", () => {
            //console.log('connect au serveur socket.io ok!!');
        });

        var data_tab = [];


        //récupération du array de la liste des champs de condition
        var chamspcondition = $gameVariables.value(args.chamspcondition)


        // console.log(listchamps)
        //récuperation de la table
        var table = args.table

        // console.log(listchamps,table)
        //création d'un array coportant la list la liste des champs avec pour indixe les id des variable qui les on été affecter
        const champsArrays = JSON.parse(args.champsArray).map(arg => Number(arg));
        var i = 0;
        var conditions = '';
        for (let champsArray of champsArrays) {
            if (chamspcondition[i]) {
                if(i > 0){
                    conditions += " AND "+chamspcondition[i] + " = '"+  String($gameVariables.value(champsArray)).replace("'","''")+"' ";
                }else {
                    conditions += chamspcondition[i] + " = '"+  String($gameVariables.value(champsArray)).replace("'","''")+"' ";
                }
            }

            i++;
        }

        // console.log(conditions);
        //j'en vois au serveur la liste des champs et la table
        socket.emit("deleleteByChamps", { table: table, conditions: conditions})
        socket.on("deleleteByChamps", (data) => {
            //console.log('%c command deleleteByChamps resultat ==>', 'background: #6174d1; color: #bada55')
            //console.log(data)

            // console.log('test variable 101',  $gameVariables.value(101))
            //console.log('%c===================end command deleleteByChamps log=================', 'background: #b0413e; color: #ffffff')

        })

        // ：      ：$gameVariables.setValue(497, ["id"]);
        // ：      ：$gameVariables.setValue(100, 2);
        // ◆Module complémentaire：SocketIo-Crud-manual, recuperer un element en foction d'une liste de champs
        // ：                     ：Array de champs par ID de variable = ["100","101","102"]
        // ：                     ：la liste des champs conditionné = 497
        // ：                     ：nom de la table = joueur

    });
    /*PluginManager.registerCommand('Ajax-crud', "gets", args => {

        Imported.SocketIo_Core_Manual.Ajax_Data_Response = {};
        Imported.SocketIo_Core_Manual.command = 'gets';
        var data_tab = [];
        //récupération du array de la liste des champs
        var listchamps = $gameVariables.value(args.listchamps)
        //récuperation de la table
        var table = $gameVariables.value(args.table)
        //création d'un array coportant la list la liste des champs avec pour indixe les id des variable qui les on été affecter
        const champsArrays = JSON.parse(args.champsArray).map(arg => Number(arg));
        var i = 0;
        for (let champsArray of champsArrays) {
            data_tab[listchamps[i]] = champsArray;
            Imported.SocketIo_Core_Manual.Ajax_Data_Response[listchamps[i]] = $gameVariables.value(champsArray);
            i++;
        }

        socket.emit( "get joueur",true)
        socket.on("get joueur",(data)=>{
            console.log('joueur data rows', data)
            for (const property in data) {
                if ( data_tab[property]){
                    $gameVariables.setValue(  data_tab[property] ,data[property])
                }
            }
        })

    });*/


})();