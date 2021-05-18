<?php

namespace App\Repository;

use App\Entity\Puissance;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @method Puissance|null find($id, $lockMode = null, $lockVersion = null)
 * @method Puissance|null findOneBy(array $criteria, array $orderBy = null)
 * @method Puissance[]    findAll()
 * @method Puissance[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class PuissanceRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Puissance::class);
    }

    // /**
    //  * @return Puissance[] Returns an array of Puissance objects
    //  */
    /*
    public function findByExampleField($value)
    {
        return $this->createQueryBuilder('p')
            ->andWhere('p.exampleField = :val')
            ->setParameter('val', $value)
            ->orderBy('p.id', 'ASC')
            ->setMaxResults(10)
            ->getQuery()
            ->getResult()
        ;
    }
    */

    /*
    public function findOneBySomeField($value): ?Puissance
    {
        return $this->createQueryBuilder('p')
            ->andWhere('p.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */
}
