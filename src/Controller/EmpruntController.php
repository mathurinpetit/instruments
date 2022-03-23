<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\Request;
use App\Entity\Instrument;
use App\Entity\User;

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
            'emprunte' => $instrument->getEmprunte(),
            'emprunteurNom' => ($instrument->getEmprunte())? $instrument->getEmprunteur()->getNom() : '',
            'emprunteurId' => ($instrument->getEmprunte())? $instrument->getEmprunteur()->getId() : '',
            'emprunteurAdresse' => ($instrument->getEmprunte())? $instrument->getEmprunteur()->getAddress() : null,
            'emprunteurLat' => ($instrument->getEmprunte())? $instrument->getEmprunteur()->getLat() : '',
            'emprunteurLon' => ($instrument->getEmprunte())? $instrument->getEmprunteur()->getLon() : ''
        ];
     }
     $response->setContent(json_encode($data));

     return $response;
 }

 /**
  * @Route("/instrument/{id}", name="instrument_emprunter_rendre", methods={"PUT", "PATCH"})
  */
 public function emprunter(Request $request, int $id): Response
 {
     $response = new Response();
     $response->headers->set('Content-Type', 'application/json');
     $content = json_decode($request->getContent());

     $entityManager = $this->getDoctrine()->getManager();
     $instrument = $entityManager->getRepository(Instrument::class)->find($id);
     $utilisateur = $entityManager->getRepository(User::class)->find($content->idUser);

     if (!$instrument) {

         return $this->json('Auncun instrument n\'a été trouvé pour cet identifiant :' . $id, 404);
     }

     $rendu = $instrument->emprunteRendre($utilisateur);

     if($rendu){
       $entityManager->flush();

       $data =  [
         'id' => $instrument->getId(),
         'name' => $instrument->getName(),
         'type' => $instrument->getType(),
         'description' => $instrument->getDescription(),
         'success' => true
       ];
     }else{
       $data =  [
         'success' => false,
         'text' => "Cet instrument n'a pas été réservé par vous !"
       ];
     }

     $response->setContent(json_encode($data));

     return $response;
 }

}
