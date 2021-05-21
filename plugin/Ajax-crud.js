//================================================================
// * Plugin Name    : Ajax-crud
// - Last updated   : 08/03/2021
//site interressant http://endlessillusoft.com/rpgmaker-mv-plugin-list/
//site interressant https://kinoar.github.io/rmmv-doc-web/globals.html
//================================================================
/*:
 * @plugindesc v1.0 pour tester l'envois et la reception de donnée pas ajax.
 * @author akotse patrice
 * @target MZ
 *
 * @help Elle permet de récuper et d'envoyer les donnée vesr ajax.
 *
 *
 *
 *
 *
 *
 * @command Save
 * @text Ajouter
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
 * @default champs1
 * @desc entrer les champs de la table séparer de virgule
 * attention a lordre car elle seront affecter au variable
 * par rapport au numero
 *
 * @arg base_url
 * @text l'url
 * @default https://cupidiarx.com/devzone/data/public/api
 * @desc veillez entrer l'url
 *
 *
 *
 * =================================================edit========================
 *
 * @command edit
 * @text Modification
 *
 *
 *
 * @arg identifiant
 * @text identifiant à modifier
 * @type variable
 * @default ...
 * @desc Entrer l'identifiant de l'élément à modifier
 * elle peut être soit l'id de la ligne dans la table
 * ou 'last' qui signifie de modifier le dernier element
 * et 'first' qui signifi le premier élément
 * !! l'endentifian est obligatoire
 *
 *
 *
 * @arg champs1
 * @text valueur du champs1
 * @type variable
 * @default ...
 * @desc Enter le champs1
 *
 *
 * @arg champs2
 * @text valueur du champs2
 * @type variable
 * @default ...
 * @desc Enter le champs2
 *
 * @arg champs3
 * @text valueur du champs3
 * @type variable
 * @default ...
 * @desc Enter le champs3
 *
 *
 * @arg champs4
 * @text valueur du champs4
 * @type variable
 * @default ...
 * @desc Enter le champs4
 *
 *
 *
 * @arg champs5
 * @text valueur du champs5
 * @type variable
 * @default ...
 * @desc Enter le champs5
 *
 *
 *
 * @arg listchamps
 * @text la liste des champs
 * @type variable
 * @default champs1
 * @desc entrer les champs de la table séparer de virgule
 * attention a lordre car elle seront affecter au variable
 * par rapport au numero
 *
 *
 * @arg base_url
 * @text l'url
 * @type variable
 * @default http://rpg_backoffice.test
 * @desc veillez entrer l'url
 *
 *
 *
 * =================================================Get========================
 *
 * @command gets
 * @text recuperer les elements
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
 * @arg base_url
 * @text l'url
 * @default https://cupidiarx.com/devzone/data/public/api
 * @desc veillez entrer l'url
 *
 *
 *
*/
var Imported = Imported || {};
Imported.Ajax_Core = Imported.Ajax_Core || {};
Imported.Ajax_Core.Ajax_Data_Response = Imported.Ajax_Core.Ajax_Data_Response || {};
Imported.Ajax_Core.version = 1.3;
data_response = {};
start = true;




(function() {
// $gameVariables.setValue(args.puissance,ddg)
//$gameVariables.value(args.puissance)
//args.puissance
//Number()
    PluginManager.registerCommand('Ajax-crud', "Save", args => {
        Imported.Ajax_Core.Ajax_Data_Response = {};
        Imported.Ajax_Core.command = 'Save';
        Imported.Ajax_Core.methode = 'POST';
        Imported.Ajax_Core.url = args.base_url ;
        var listchamps = $gameVariables.value(args.listchamps)

        //Array test

        const champsArrays = JSON.parse(args.champsArray).map(arg => Number(arg));
         // console.log(champsArrays, listchamps)
        var i = 0;
        for (let champsArray of champsArrays) {
            // console.log(listchamps[i], $gameVariables.value(champsArray),i)
            Imported.Ajax_Core.Ajax_Data_Response[listchamps[i]] = $gameVariables.value(champsArray)
            i++;
        }
        //end array test
        Imported.Ajax_Core.Ajax_Data_Response['datecreation'] = Imported.Ajax_Core.nowDate();
        Imported.Ajax_Core.data = Imported.Ajax_Core.Ajax_Data_Response;

        if (args.base_url === Imported.Ajax_Core.base_url){
            //verifi si c'est url d'enregistrement du joueur
            if (   Imported.Ajax_Core.joueurFound === false){
                //verifier si le joueur à déja été trouver si non okay
                Imported.Ajax_Core.sendAjaxCrud()
				Imported.Ajax_Core.data = {};
				Imported.Ajax_Core.methode = 'GET';
				var url_parm = Object.keys(  Imported.Ajax_Core.Ajax_Data_Response).map(function(key) {
					return key + '=' +   Imported.Ajax_Core.Ajax_Data_Response[key];
				}).join('&');
				Imported.Ajax_Core.url = args.base_url+'?'+url_parm ;
				Imported.Ajax_Core.sendAjaxCrud()
				Imported.Ajax_Core.joueurID =  Imported.Ajax_Core.Ajax_Data_Response[0].id;
				
            }
        }else {
            //si le jouneur n'a pas encore été trouver on linitialise
            //TODO: sassurer de toujour trouver le joueur avant de pouvoir continuer
            if(Imported.Ajax_Core.joueurID  !== null){
                Imported.Ajax_Core.data ['joueur'] = '/api/joueurs/'+Number(Imported.Ajax_Core.joueurID);
            }
            // console.log('data to send', Imported.Ajax_Core.data, args.base_url)
            Imported.Ajax_Core.sendAjaxCrud()
        }
        console.log('Joueur Id', Imported.Ajax_Core.joueurID)

    });

    PluginManager.registerCommand('Ajax-crud', "gets", args => {

        Imported.Ajax_Core.Ajax_Data_Response = {};
        Imported.Ajax_Core.command = 'gets';
        Imported.Ajax_Core.methode = 'GET';
        var data_tab = [];

        var listchamps = $gameVariables.value(args.listchamps)
        const champsArrays = JSON.parse(args.champsArray).map(arg => Number(arg));
        var i = 0;
        for (let champsArray of champsArrays) {
            data_tab[listchamps[i]] = champsArray;
            Imported.Ajax_Core.Ajax_Data_Response[listchamps[i]] = $gameVariables.value(champsArray);
            i++;
        }

        var url_parm = Object.keys(  Imported.Ajax_Core.Ajax_Data_Response).map(function(key) {
            return key + '=' +   Imported.Ajax_Core.Ajax_Data_Response[key];
        }).join('&');
        Imported.Ajax_Core.url = args.base_url+'?'+url_parm ;
        Imported.Ajax_Core.data = {};
         console.log('gets data --->', args.base_url,url_parm )

        Imported.Ajax_Core.sendAjaxCrud()
        var resultat = Imported.Ajax_Core.Ajax_Data_Response
        resultat = resultat[Number(Imported.Ajax_Core.Ajax_Data_Response.length)-1]
        var i = 0;
        for (const property in resultat) {
            if (args.base_url === Imported.Ajax_Core.base_url){// quand c'est un appel vers joueur on recuperer l'id du joueur
                if (property === 'id' && Imported.Ajax_Core.joueurFound === false){
                    Imported.Ajax_Core.joueurFound = true;
                    Imported.Ajax_Core.joueurID = resultat[property];
                }
            }
            if ( data_tab[property]){
                $gameVariables.setValue(  data_tab[property] ,resultat[property])
            }

            i++;
        }
    });


})();
