<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\Request;
use App\Entity\Communication;

/**
 * @Route("/communication", name="communication_")
 */
class CommunicationController extends AbstractController
{

  /**
  * @Route("/visualisation", name="communication_index", methods={"GET"})
  */
   public function communication(): Response
   {
       $response = new Response();
       $response->headers->set('Content-Type', 'application/json');

       $communication = $this->getDoctrine()
           ->getRepository(Communication::class)
           ->findBy(array(),array('id'=>'DESC'),1,0);


       $data = array('sondages' => "", 'informations' => "");
       if(count($communication)){
         $element = array_shift($communication);
         $data = array("sondages" => $element->getSondage(), "informations" => $element->getInformations());
       }

       $response->setContent(json_encode($data));

       return $response;
   }

}
