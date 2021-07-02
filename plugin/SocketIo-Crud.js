//================================================================
// * Plugin Name    : SocketIo-Crud
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
 *
 *
*/
var Imported = Imported || {};
Imported.SocketIo_Core = Imported.SocketIo_Core || {};
Imported.SocketIo_Core.version = 1.5;
data_response = {};
start = true;




(function() {




// $gameVariables.setValue(args.puissance,ddg)
//$gameVariables.value(args.puissance)
//args.puissance
//Number()


    PluginManager.registerCommand('SocketIo-Crud', "getlast", args => {

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
            Imported.SocketIo_Core.SocketIo_Data_Response[listchamps[i]] = $gameVariables.value(champsArray);
            i++;
        }
        //j'en vois au serveur la liste des champs et la table
        socket.emit( "getlast", {listchamps: listchamps.toString(), table: table})
        socket.on("getlast",(data)=>{
            console.log('command getlast resultat ==>', data)
            for (const property in data) {
                if ( data_tab[property]){
                    $gameVariables.setValue(  data_tab[property] ,data[property])
                }
            }
        })



    });
    /*PluginManager.registerCommand('Ajax-crud', "gets", args => {

        Imported.SocketIo_Core.Ajax_Data_Response = {};
        Imported.SocketIo_Core.command = 'gets';
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
            Imported.SocketIo_Core.Ajax_Data_Response[listchamps[i]] = $gameVariables.value(champsArray);
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
