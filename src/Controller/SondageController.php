<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\Request;
use App\Entity\Sondages;

/**
 * @Route("/sondages", name="sondage_")
 */
class SondageController extends AbstractController
{

  /**
  * @Route("/visualisation", name="sondages_index", methods={"GET"})
  */
   public function sondages(): Response
   {
       $response = new Response();
       $response->headers->set('Content-Type', 'application/json');

       $sondages = $this->getDoctrine()
           ->getRepository(Sondages::class)
           ->findBy(array(),array('id'=>'DESC'),1,0);


       $data = (count($sondages))? array_shift($sondages)->getText() : "";
       $response->setContent(json_encode($data));

       return $response;
   }

}
