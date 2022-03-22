<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\Request;
use App\Entity\User;

/**
 * @Route("/identification", name="identification_")
 */
class IdentificationController extends AbstractController
{

  /**
  * @Route("/utilisateurs", name="utilisateurs_liste", methods={"GET"})
  */
   public function utilisateursListe(): Response
   {
       $response = new Response();
       $response->headers->set('Content-Type', 'application/json');

       $utilisateurs = $this->getDoctrine()
           ->getRepository(User::class)
           ->findAll();

       $data = [];

       foreach ($utilisateurs as $utilisateur) {
          $data[] = [
              'value' => $utilisateur->getId(),
              'label' => $utilisateur->getNom(),
              'adresse' => $utilisateur->getAddress()
          ];
       }
       $response->setContent(json_encode($data));

       return $response;
   }

   /**
    * @Route("/utilisateur", name="utilisateur_new", methods={"POST"})
    */
   public function utilisateurNew(Request $request): Response
   {
       $response = new Response();
       $response->headers->set('Content-Type', 'application/json');

       $entityManager = $this->getDoctrine()->getManager();
       if(!$request->request->get('name')){
         return $this->json('Il faut choisir un nom pour l\'utilisateur');
       }

       $utilisateur = new User();
       $utilisateur->setNom($request->request->get('name'));
       $utilisateur->setAddress($request->request->get('address'));
       $utilisateur->setLon($request->request->get('lon'));
       $utilisateur->setLat($request->request->get('lat'));

       $entityManager->persist($utilisateur);
       $entityManager->flush();

       $data = ['id' => $utilisateur->getId(), 'nom' => $utilisateur->getNom(), 'address' => $utilisateur->getAddress()];
       $response->setContent(json_encode($data));
       return $response;
   }

   /**
    * @Route("/utilisateur/{id}", name="utilisateur_edit", methods={"PUT", "PATCH"})
    */
   public function utilisateurEdit(Request $request, string $id): Response
   {
       $response = new Response();
       $response->headers->set('Content-Type', 'application/json');

       $entityManager = $this->getDoctrine()->getManager();
       $utilisateur = $entityManager->getRepository(User::class)->find($id);

       if (!$utilisateur) {
           return $this->json("Pas d'utilisateur trouvé pour cet id" . $id, 404);
       }

       $content = json_decode($request->getContent());
       $utilisateur->setAddress($content->address);
       $utilisateur->setLon($content->lon);
       $utilisateur->setLat($content->lat);
       $entityManager->flush();

       $data =  [
           'id' => $utilisateur->getId(),
           'nom' => $utilisateur->getNom(),
           'address' => $utilisateur->getAddress()
       ];

       $response->setContent(json_encode($data));

       return $response;
   }


   /**
   * @Route("/utilisateur/{id}", name="utilisateur_show", methods={"GET"})
   */
   public function utilisateurShow(string $id): Response
   {
      $response = new Response();
      $response->headers->set('Content-Type', 'application/json');

      $utilisateur = $this->getDoctrine()
          ->getRepository(User::class)
          ->find($id);

      if (!$utilisateur) {

          return $this->json(json_encode(false));
      }

      $data =  [
          'id' => $utilisateur->getId(),
          'name' => $utilisateur->getNom(),
          'address' => $utilisateur->getAddress(),
          'lat' => $utilisateur->getLat(),
          'lon' => $utilisateur->getLon(),
      ];

      $response->setContent(json_encode($data));

      return $response;
   }
}
