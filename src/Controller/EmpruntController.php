<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\Request;
use App\Entity\Instrument;

/**
 * @Route("/emprunt", name="emprunt_")
 */
class EmpruntController extends AbstractController
{
  /**
  * @Route("/instrument", name="emprunt_index", methods={"GET"})
  */
 public function index(): Response
 {
     $response = new Response();
     $response->headers->set('Content-Type', 'application/json');

     $instruments = $this->getDoctrine()
         ->getRepository(Instrument::class)
         ->findAll();

     $data = [];

     foreach ($instruments as $instrument) {
        $data[] = [
            'id' => $instrument->getId(),
            'name' => $instrument->getName(),
            'type' => $instrument->getType(),
            'emprunte' => $instrument->getEmprunte()
        ];
     }
     $response->setContent(json_encode($data));

     return $response;
 }

 /**
  * @Route("/instrument/{id}", name="instrument_emprunter_rendre", methods={"PUT", "PATCH"})
  */
 public function emprunter(int $id): Response
 {
     $response = new Response();
     $response->headers->set('Content-Type', 'application/json');

     $entityManager = $this->getDoctrine()->getManager();
     $instrument = $entityManager->getRepository(Instrument::class)->find($id);

     if (!$instrument) {

         return $this->json('Auncun instrument n\'a été trouvé pour cet identifiant :' . $id, 404);
     }
     $emprunte = $instrument->getEmprunte();
     $instrument->setEmprunte(!$emprunte);
     $entityManager->flush();

     $data =  [
         'id' => $instrument->getId(),
         'name' => $instrument->getName(),
         'type' => $instrument->getType(),
         'description' => $instrument->getDescription(),
     ];

     $response->setContent(json_encode($data));

     return $response;
 }

}
