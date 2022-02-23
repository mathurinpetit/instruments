<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\Request;
use App\Entity\Instrument;

/**
 * @Route("/api", name="api_")
 */
class InstrumentController extends AbstractController
{
  /**
  * @Route("/instrument", name="instrument_index", methods={"GET"})
  */
 public function index(): Response
 {

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


     return $this->json($data);
 }

 /**
  * @Route("/instrument", name="instrument_new", methods={"POST"})
  */
 public function new(Request $request): Response
 {
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
     $instrument->setDescription($request->request->get('description'));

     $entityManager->persist($instrument);
     $entityManager->flush();

     return $this->json('Nouvel instrument créé ' . $instrument->getName());
 }

 /**
  * @Route("/instrument/{id}", name="instrument_show", methods={"GET"})
  */
 public function show(int $id): Response
 {
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

     return $this->json($data);
 }

 /**
  * @Route("/instrument/{id}", name="instrument_edit", methods={"PUT", "PATCH"})
  */
 public function edit(Request $request, int $id): Response
 {
     $entityManager = $this->getDoctrine()->getManager();
     $instrument = $entityManager->getRepository(Instrument::class)->find($id);

     if (!$instrument) {
         return $this->json('No instrument found for id' . $id, 404);
     }

     $content = json_decode($request->getContent());

     $instrument->setName($content->name);
     $instrument->setDescription($content->name);
     $entityManager->flush();

     $data =  [
         'id' => $instrument->getId(),
         'name' => $instrument->getName(),
         'type' => $instrument->getType(),
         'description' => $instrument->getDescription(),
     ];

     return $this->json($data);
 }

 /**
  * @Route("/instrument/{id}", name="instrument_delete", methods={"DELETE"})
  */
 public function delete(int $id): Response
 {
     $entityManager = $this->getDoctrine()->getManager();
     $instrument = $entityManager->getRepository(Instrument::class)->find($id);

     if (!$instrument) {
         return $this->json('No instrument found for id' . $id, 404);
     }

     $entityManager->remove($instrument);
     $entityManager->flush();

     return $this->json('Deleted a instrument successfully with id ' . $id);
 }
}
