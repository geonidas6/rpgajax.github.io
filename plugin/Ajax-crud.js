//================================================================
// * Plugin Name    : Ajax-test
// - Last updated   : 08/03/2021
//================================================================
/*:
 * @plugindesc v1.0 pour tester l'envois et la reception de donnée pas ajax.
 * @author akotse patrice
 * @target MZ
 * 
 * @help Elle permet de récuper et d'envoyer les donnée vesr ajax.
 * 
 * @command Save
 * @text Ajouter
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
*/
var Imported = Imported || {};

Imported.Ajax_Core = Imported.Ajax_Core || {};
Imported.Ajax_Core.Ajax_Data_Response = Imported.Ajax_Core.Ajax_Data_Response || {};
Imported.Ajax_Core.version = 1.0;
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
        Imported.Ajax_Core.url = $gameVariables.value(args.base_url) ;
        var listchamps = $gameVariables.value(args.listchamps)
        for (i = 0; i < listchamps.length; i++) {
            switch(i) {
                case 0:
                    Imported.Ajax_Core.Ajax_Data_Response[listchamps[i]] = $gameVariables.value(args.champs1);
                    break;
                case 1:
                    Imported.Ajax_Core.Ajax_Data_Response[listchamps[i]] =  $gameVariables.value(args.champs2);
                    break;
                case 2:
                    Imported.Ajax_Core.Ajax_Data_Response[listchamps[i]] =  $gameVariables.value(args.champs3);
                    break;
                case 3:
                    Imported.Ajax_Core.Ajax_Data_Response[listchamps[i]] =  $gameVariables.value(args.champs4);
                    break;
                case 4:
                    Imported.Ajax_Core.Ajax_Data_Response[listchamps[i]]=  $gameVariables.value(args.champs5);
                    break;
                default:
                // code block
            }

        }
        Imported.Ajax_Core.Ajax_Data_Response['datecreation'] = Imported.Ajax_Core.nowDate();
        Imported.Ajax_Core.data = Imported.Ajax_Core.Ajax_Data_Response;
       
        if ($gameVariables.value(args.base_url)[0] === Imported.Ajax_Core.base_url){
            if (   Imported.Ajax_Core.joueurFound === false){
                Imported.Ajax_Core.sendAjaxCrud()
				Imported.Ajax_Core.data = {};
				Imported.Ajax_Core.methode = 'GET';
				var url_parm = Object.keys(  Imported.Ajax_Core.Ajax_Data_Response).map(function(key) {
					return key + '=' +   Imported.Ajax_Core.Ajax_Data_Response[key];
				}).join('&');
				Imported.Ajax_Core.url = $gameVariables.value(args.base_url)+'?'+url_parm ;
				Imported.Ajax_Core.sendAjaxCrud()
				Imported.Ajax_Core.joueurID =  Imported.Ajax_Core.Ajax_Data_Response[0].id;
				
            }
        }else {
            if(Imported.Ajax_Core.joueurID  !== null){
                Imported.Ajax_Core.data ['joueur'] = '/api/joueurs/'+Number(Imported.Ajax_Core.joueurID);
            }

            Imported.Ajax_Core.sendAjaxCrud()
        }
        console.log('Joueur Id', Imported.Ajax_Core.joueurID)

    });


    PluginManager.registerCommand('Ajax-crud', "gets", args => {
        Imported.Ajax_Core.Ajax_Data_Response = {};
        Imported.Ajax_Core.command = 'gets';
        Imported.Ajax_Core.methode = 'GET';

        var listchamps = $gameVariables.value(args.listchamps)
        for (i = 0; i < listchamps.length; i++) {
            switch(i) {
                case 0:
                    Imported.Ajax_Core.Ajax_Data_Response[listchamps[i]] = $gameVariables.value(args.champs1);
                    break;
                case 1:
                    Imported.Ajax_Core.Ajax_Data_Response[listchamps[i]] =  $gameVariables.value(args.champs2);
                    break;
                case 2:
                    Imported.Ajax_Core.Ajax_Data_Response[listchamps[i]] =  $gameVariables.value(args.champs3);
                    break;
                case 3:
                    Imported.Ajax_Core.Ajax_Data_Response[listchamps[i]] =  $gameVariables.value(args.champs4);
                    break;
                case 4:
                    Imported.Ajax_Core.Ajax_Data_Response[listchamps[i]]=  $gameVariables.value(args.champs5);
                    break;
                default:
                // code block
            }
        }
        var url_parm = Object.keys(  Imported.Ajax_Core.Ajax_Data_Response).map(function(key) {
            return key + '=' +   Imported.Ajax_Core.Ajax_Data_Response[key];
        }).join('&');
        Imported.Ajax_Core.url = $gameVariables.value(args.base_url)+'?'+url_parm ;
        Imported.Ajax_Core.data = {};
        // console.log('gets data --->', $gameVariables.value(args.base_url),url_parm )
        Imported.Ajax_Core.sendAjaxCrud()
        var resultat = Imported.Ajax_Core.Ajax_Data_Response
        resultat = resultat[Number(Imported.Ajax_Core.Ajax_Data_Response.length)-1]
        var i = 0;
        for (const property in resultat) {
            switch(i ) {
                case 0:
                    if ($gameVariables.value(args.base_url)[0] === Imported.Ajax_Core.base_url){
                        Imported.Ajax_Core.joueurFound = true;
                        Imported.Ajax_Core.joueurID = resultat[property];
                    }

                    break;
                case 1:
                    $gameVariables.setValue(args.champs1,resultat[property])
                    break;
                case 2:
                    $gameVariables.setValue(args.champs2,resultat[property])
                    break;
                case 3:
                    $gameVariables.setValue(args.champs3,resultat[property])
                    break;
                case 4:
                    $gameVariables.setValue(args.champs4,resultat[property])
                    break;
                default:
                // code block
            }
            i++;

        }

    });







})();
