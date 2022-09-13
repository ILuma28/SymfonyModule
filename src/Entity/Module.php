<?php

namespace App\Entity;

use App\Repository\ModuleRepository;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: ModuleRepository::class)]
class Module
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    private ?string $Nom = null;

    #[ORM\Column(length: 255)]
    private ?string $Type = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $DureeFonctionnement = null;

    #[ORM\Column]
    private ?int $NombreDonneesEnvoyees = null;

    #[ORM\Column]
    private ?bool $EtatMarche = null;

    #[ORM\Column(length: 255)]
    private ?string $Historique = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getNom(): ?string
    {
        return $this->Nom;
    }

    public function setNom(string $Nom): self
    {
        $this->Nom = $Nom;

        return $this;
    }

    public function getType(): ?string
    {
        return $this->Type;
    }

    public function setType(string $Type): self
    {
        $this->Type = $Type;

        return $this;
    }

    public function getDureeFonctionnement(): ?string
    {
        return $this->DureeFonctionnement;
    }

    public function setDureeFonctionnement(?string $DureeFonctionnement): self
    {
        $this->DureeFonctionnement = $DureeFonctionnement;

        return $this;
    }

    public function getNombreDonneesEnvoyees(): ?int
    {
        return $this->NombreDonneesEnvoyees;
    }

    public function setNombreDonneesEnvoyees(int $NombreDonneesEnvoyees): self
    {
        $this->NombreDonneesEnvoyees = $NombreDonneesEnvoyees;

        return $this;
    }

    public function isEtatMarche(): ?bool
    {
        return $this->EtatMarche;
    }

    public function setEtatMarche(bool $EtatMarche): self
    {
        $this->EtatMarche = $EtatMarche;

        return $this;
    }

    public function getHistorique(): ?string
    {
        return $this->Historique;
    }

    public function setHistorique(string $Historique): self
    {
        $this->Historique = $Historique;

        return $this;
    }
}
