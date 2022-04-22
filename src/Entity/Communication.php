<?php

namespace App\Entity;

use App\Repository\CommunicationRepository;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass=CommunicationRepository::class)
 */
class Communication
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=4096, nullable=true)
     */
    private $sondage;


    /**
     * @ORM\Column(type="string", length=4096, nullable=true)
     */
    private $playliste;


    /**
     * @ORM\Column(type="string", length=8000, nullable=true)
     */
    private $informations;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getSondage(): ?string
    {
        return $this->sondage;
    }

    public function setSondage(?string $sondage): self
    {
        $this->sondage = $sondage;

        return $this;
    }


    public function getPlayliste(): ?string
    {
        return $this->playliste;
    }

    public function setPlayliste(?string $playliste): self
    {
        $this->playliste = $playliste;

        return $this;
    }


    public function getInformations(): ?string
    {
        return $this->informations;
    }

    public function setInformations(?string $informations): self
    {
        $this->informations = $informations;

        return $this;
    }
}
