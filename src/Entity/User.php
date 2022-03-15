<?php

namespace App\Entity;


use App\Repository\UserRepository;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Bridge\Doctrine\IdGenerator\UlidGenerator;

/**
 * @ORM\Entity(repositoryClass=UserRepository::class)
 */
class User
{

  /**
  * @ORM\Id
  * @ORM\Column(type="ulid", unique=true)
  * @ORM\GeneratedValue(strategy="CUSTOM")
  * @ORM\CustomIdGenerator(class=UlidGenerator::class)
  */
    private $id;


    /**
     * @ORM\Column(type="string", length=255)
     */
    private $nom;

    /**
     * @ORM\Column(type="string", length=1024, nullable=true)
     */
    private $address;

    /**
     * @ORM\Column(type="float", nullable=true)
     */
    private $lat;

    /**
     * @ORM\Column(type="float", nullable=true)
     */
    private $lon;


    /**
    * @ORM\OneToMany(targetEntity="Instrument", mappedBy="emprunteur")
    */
   private $instruments;


    public function getId(): ?string
    {
        return $this->id->toBase58();
    }

    public function getNom(): ?string
    {
        return $this->nom;
    }

    public function setNom(string $nom): self
    {
        $this->nom = $nom;

        return $this;
    }

    public function getAddress(): ?string
    {
        return $this->address;
    }

    public function setAddress(?string $address): self
    {
        $this->address = $address;

        return $this;
    }

    public function getLat(): ?float
    {
        return $this->lat;
    }

    public function setLat(?float $lat): self
    {
        $this->lat = $lat;

        return $this;
    }

    public function getLon(): ?float
    {
        return $this->lon;
    }

    public function setLon(float $lon): self
    {
        $this->lon = $lon;

        return $this;
    }
}
