<?php

namespace App\Entity;

use App\Repository\InstrumentRepository;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass=InstrumentRepository::class)
 */
class Instrument
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $name;

    /**
     * @ORM\Column(type="string", length=1024, nullable=true)
     */
    private $description;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $type;

    /**
     * @ORM\Column(type="boolean")
     */
    private $emprunte;

    /**
    * @ORM\ManyToOne(targetEntity="User")
    */
    private $emprunteur;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(string $name): self
    {
        $this->name = $name;

        return $this;
    }

    public function getEmprunteur(): ?User
    {
        return $this->emprunteur;
    }

    public function setEmprunteur($emprunteur): self
    {
        $this->emprunteur = $emprunteur;

        return $this;
    }

    public function getDescription(): ?string
    {
        return $this->description;
    }

    public function setDescription(?string $description): self
    {
        $this->description = $description;

        return $this;
    }

    public function getType(): ?string
    {
        return $this->type;
    }

    public function setType(string $type): self
    {
        $this->type = $type;

        return $this;
    }

    public function getEmprunte(): ?bool
    {
        return $this->emprunte;
    }

    public function setEmprunte(bool $emprunte): self
    {
        $this->emprunte = $emprunte;

        return $this;
    }

    public function rendre(){

        $this->setEmprunte(false);
        $this->setEmprunteur(null);

        return $this;
    }

    public function emprunteRendre(User $user)
    {
        $emprunte = $this->getEmprunte();

        if($emprunte && ($user->getId()!=$this->getEmprunteur()->getId())){
          $this->setEmprunteur($user);
          return $user;
        }

        if($emprunte && $user->getId()==$this->getEmprunteur()->getId()){
          $this->rendre();
        }

        if(!$emprunte){
          $this->setEmprunte(true);
          $this->setEmprunteur($user);
        }

        return $this;
    }
}
