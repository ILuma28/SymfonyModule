<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use App\Repository\HistoriqueModuleRepository;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use App\Entity\Module;

#[ORM\Entity(repositoryClass: HistoriqueModuleRepository::class)]
#[ApiResource]
class HistoriqueModule
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\ManyToOne(targetEntity:Module::class, inversedBy:"Historique")]
    private $Module;

    #[ORM\Column]
    private ?int $Valeur = null;

    #[ORM\Column(type: Types::DATETIME_MUTABLE)]
    private ?\DateTimeInterface $TimeStamp = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getModule(): ?Module
    {
        return $this->Module;
    }

    public function setModule(?Module $Module): self
    {
        $this->Module = $Module;

        return $this;
    }

    public function getValeur(): ?int
    {
        return $this->Valeur;
    }

    public function setValeur(int $Valeur): self
    {
        $this->Valeur = $Valeur;

        return $this;
    }

    public function getTimeStamp(): ?\DateTimeInterface
    {
        return $this->TimeStamp;
    }

    public function setTimeStamp(\DateTimeInterface $TimeStamp): self
    {
        $this->TimeStamp = $TimeStamp;

        return $this;
    }
}
