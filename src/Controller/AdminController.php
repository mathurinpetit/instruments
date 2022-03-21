<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\Request;
use App\Entity\Instrument;
use App\Entity\Sondages;
use App\Entity\User;

/**
 * @Route("/admin", name="admin_")
 */
class AdminController extends AbstractController
{
  /**
  * @Route("/instrument", name="instrument_index", methods={"GET"})
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
            'description' => $instrument->getDescription(),
        ];
     }
     $response->setContent(json_encode($data));

     return $response;
 }

 /**
  * @Route("/instrument", name="instrument_new", methods={"POST"})
  */
 public function new(Request $request): Response
 {
     $response = new Response();
     $response->headers->set('Content-Type', 'application/json');

     $entityManager = $this->getDoctrine()->getManager();
     if(!$request->request->get('name')){
       return $this->json('Il faut choisir un nom pour l\'instrument');
     }
     if(!$request->request->get('type')){
       return $this->json('Il faut choisir un type d\'instrument');
     }

     $instrument = new Instrument();
     $instrument->setName($request->request->get('name'));
     $instrument->setType($request->request->get('type'));
     $instrument->setEmprunte(false);
     $instrument->setDescription($request->request->get('description'));

     $entityManager->persist($instrument);
     $entityManager->flush();


     $response->setContent(json_encode('Nouvel instrument créé ' . $instrument->getName()));
     return $response;
 }

  /**
  * @Route("/instrument/{id}", name="instrument_show", methods={"GET"})
  */
 public function show(int $id): Response
 {
     $response = new Response();
     $response->headers->set('Content-Type', 'application/json');

     $instrument = $this->getDoctrine()
         ->getRepository(Instrument::class)
         ->find($id);

     if (!$instrument) {

         return $this->json('No instrument found for id' . $id, 404);
     }

     $data =  [
         'id' => $instrument->getId(),
         'name' => $instrument->getName(),
         'description' => $instrument->getDescription(),
     ];

     $response->setContent(json_encode($data));

     return $response;
 }

 /**
  * @Route("/instrument/{id}", name="instrument_edit", methods={"PUT", "PATCH"})
  */
 public function edit(Request $request, int $id): Response
 {
     $response = new Response();
     $response->headers->set('Content-Type', 'application/json');

     $entityManager = $this->getDoctrine()->getManager();
     $instrument = $entityManager->getRepository(Instrument::class)->find($id);

     if (!$instrument) {
         return $this->json('No instrument found for id' . $id, 404);
     }

     $content = json_decode($request->getContent());

     $instrument->setName($content->name);
     $instrument->setDescription($content->description);
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

 /**
  * @Route("/instrument/{id}", name="instrument_delete", methods={"DELETE"})
  */
 public function delete(int $id): Response
 {
     $response = new Response();
     $response->headers->set('Access-Control-Allow-Origin', '*');

     $entityManager = $this->getDoctrine()->getManager();
     $instrument = $entityManager->getRepository(Instrument::class)->find($id);

     if (!$instrument) {
         return $this->json('No instrument found for id' . $id, 404);
     }

     $entityManager->remove($instrument);
     $entityManager->flush();

     $response->setContent(json_encode('Instrument supprimé ' . $id));
     return $response;
 }


 /**
 * @Route("/utilisateur", name="utilisateur_index", methods={"GET"})
 */
public function utilisateurIndex(): Response
{
    $response = new Response();
    $response->headers->set('Content-Type', 'application/json');

    $utilisateurs = $this->getDoctrine()
        ->getRepository(User::class)
        ->findAll();

    $data = [];
    foreach ($utilisateurs as $utilisateur) {
      $dataInstruments = array();
      foreach ($utilisateur->getInstruments() as $instrument) {
        $dataInstruments[] =[
            'nom' =>$instrument->getName()
          ];
      }
      $data[] = [
           'id' => $utilisateur->getId(),
           'name' => $utilisateur->getNom(),
           'address' => $utilisateur->getAddress(),
           'instruments' => $dataInstruments
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

    $entityManager->persist($utilisateur);
    $entityManager->flush();


    $response->setContent(json_encode('Nouvel utilisateur créé ' . $utilisateur->getNom()));
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

       return $this->json('No utilisateur found for id' . $id, 404);
   }

   $data =  [
       'id' => $utilisateur->getId(),
       'name' => $utilisateur->getNom(),
       'address' => $utilisateur->getAddress(),
   ];

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
        return $this->json('No utilisateur found for id' . $id, 404);
    }

    $content = json_decode($request->getContent());

    $utilisateur->setNom($content->name);
    $utilisateur->setAddress($content->address);
    $entityManager->flush();

    $data =  [
        'id' => $utilisateur->getId(),
        'name' => $utilisateur->getNom(),
        'address' => $utilisateur->getAddress()
    ];

    $response->setContent(json_encode($data));

    return $response;
}

/**
 * @Route("/utilisateur/{id}", name="utilisateur_delete", methods={"DELETE"})
 */
public function utilisateurDelete(string $id): Response
{
    $response = new Response();
    $response->headers->set('Access-Control-Allow-Origin', '*');

    $entityManager = $this->getDoctrine()->getManager();
    $utilisateur = $entityManager->getRepository(User::class)->find($id);

    if (!$utilisateur) {
        return $this->json('No utilisateur found for id' . $id, 404);
    }

    if(count($utilisateur->getInstruments())){
      foreach ($utilisateur->getInstruments() as $instrument) {
        $instrument->rendre();
      }
    }

    $entityManager->remove($utilisateur);
    $entityManager->flush();

    $response->setContent(json_encode('utilisateur supprimé ' . $id));
    return $response;
}


 /**
  * @Route("/sondages/edition", name="sondage_edit", methods={"PUT", "PATCH"})
  */
 public function sondageEdit(Request $request): Response
 {
     $response = new Response();
     $response->headers->set('Content-Type', 'application/json');

     $entityManager = $this->getDoctrine()->getManager();
     $content = json_decode($request->getContent());
     $sondages = new Sondages();
     $sondages->setText($content->sondage);
     $entityManager->persist($sondages);

     $entityManager->flush();
     $data =  [
         'id' => $sondages->getId(),
         'text' => $sondages->getText()
     ];

     $response->setContent(json_encode($data));

     return $response;
 }

}
