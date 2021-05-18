<?php

namespace App\Controller\Admin;

use App\Entity\Joueur;
use App\Entity\Puissance;
use App\Entity\User;
use EasyCorp\Bundle\EasyAdminBundle\Config\Dashboard;
use EasyCorp\Bundle\EasyAdminBundle\Config\MenuItem;
use EasyCorp\Bundle\EasyAdminBundle\Controller\AbstractDashboardController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\IsGranted;

class DashboardController extends AbstractDashboardController
{
    /**
     * @IsGranted("ROLE_ADMIN")
     * @Route("/", name="admin")
     */
    public function index(): Response
    {
//        return parent::index();
        return $this->render('index/index.html.twig', [
            'controller_name' => 'IndexController',
        ]);
    }




    public function configureDashboard(): Dashboard
    {


        return Dashboard::new()
            // the name visible to end users
            ->setTitle('Rpg Backoffice')
            // you can include HTML contents too (e.g. to link to an image)
           // ->setTitle('<i class="fa fa-tools"></i>')

            // the path defined in this method is passed to the Twig asset() function
            ->setFaviconPath('favicon.svg')

            // the domain used by default is 'messages'
            ->setTranslationDomain('my-custom-domain')

            // there's no need to define the "text direction" explicitly because
            // its default value is inferred dynamically from the user locale
            ->setTextDirection('ltr')

            // set this option if you prefer the page content to span the entire
            // browser width, instead of the default design which sets a max width
            ->renderContentMaximized()

            // set this option if you prefer the sidebar (which contains the main menu)
            // to be displayed as a narrow column instead of the default expanded design
            ->renderSidebarMinimized()
            ;
    }

    public function configureMenuItems(): iterable
    {
        return [
//            MenuItem::linktoRoute('Admin','fa fa-backward  fa-spin','app_admin_home'),
            MenuItem::linkToDashboard('Dashboard', 'fa fa-home'),
            MenuItem::section('Entity'),
            MenuItem::linkToCrud('Joueur', 'fas fa-user', Joueur::class),
            MenuItem::linkToCrud('Puissance', 'fas fa-list', Puissance::class),
            MenuItem::linkToCrud('User', 'fas fa-users', User::class),
        ];
    }
}
