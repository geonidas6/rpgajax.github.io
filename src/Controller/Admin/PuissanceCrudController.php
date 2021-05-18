<?php

namespace App\Controller\Admin;

use App\Entity\Puissance;
use EasyCorp\Bundle\EasyAdminBundle\Controller\AbstractCrudController;
use EasyCorp\Bundle\EasyAdminBundle\Field\DateTimeField;
use EasyCorp\Bundle\EasyAdminBundle\Field\IntegerField;
use EasyCorp\Bundle\EasyAdminBundle\Field\MoneyField;
use EasyCorp\Bundle\EasyAdminBundle\Field\TextEditorField;
use EasyCorp\Bundle\EasyAdminBundle\Field\TextField;
use EasyCorp\Bundle\EasyAdminBundle\Field\AssociationField;
use EasyCorp\Bundle\EasyAdminBundle\Field\Field;

class PuissanceCrudController extends AbstractCrudController
{
    public static function getEntityFqcn(): string
    {
        return Puissance::class;
    }


    public function configureFields(string $pageName): iterable
    {
        return [

           /* // le format du sélecteur de date natif ne peut pas être modifié
            // Utilise des widgets HTML5 natifs lors du rendu de ce champ dans les formulaires.
            DateTimeField::new('beginsAt')->setFormat('Y-MM-dd HH:mm')->renderAsNativeWidget(),

            // Utilise les listes <select> lors du rendu de ce champ dans les formulaires.
            DateTimeField::new('beginsAt')->setFormat('Y-MM-dd HH:mm')->renderAsChoice(),

            // Utilise les éléments <input type = "text"> lors du rendu de ce champ dans les formulaires.
            DateTimeField::new('beginsAt')->setFormat('Y-MM-dd HH:mm')->renderAsText(),*/

            Field::new('id')->hideOnForm(),
            IntegerField::new('puissance'),
            DateTimeField::new('datecreation')->setFormat('Y-MM-dd HH:mm')->renderAsChoice(),
            AssociationField::new('joueur') ->autocomplete()
        ];
    }

}
