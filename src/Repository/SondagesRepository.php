<?php

namespace App\Repository;

use App\Entity\Sondages;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @method Sondages|null find($id, $lockMode = null, $lockVersion = null)
 * @method Sondages|null findOneBy(array $criteria, array $orderBy = null)
 * @method Sondages[]    findAll()
 * @method Sondages[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class SondagesRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Sondages::class);
    }

    // /**
    //  * @return Sondages[] Returns an array of Sondages objects
    //  */
    /*
    public function findByExampleField($value)
    {
        return $this->createQueryBuilder('s')
            ->andWhere('s.exampleField = :val')
            ->setParameter('val', $value)
            ->orderBy('s.id', 'ASC')
            ->setMaxResults(10)
            ->getQuery()
            ->getResult()
        ;
    }
    */

    /*
    public function findOneBySomeField($value): ?Sondages
    {
        return $this->createQueryBuilder('s')
            ->andWhere('s.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */
}
