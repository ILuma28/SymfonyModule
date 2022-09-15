<?php

namespace App\Entity;

// On importe les dépendances nécessaires
use ApiPlatform\Core\Annotation\ApiResource;
use App\Repository\HistoriqueModuleRepository;
use Doctrine\DBAL\Types\Types;
use Symfony\Component\Serializer\Annotation\Groups;
use Doctrine\ORM\Mapping as ORM;
use App\Entity\Module;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\SearchFilter;

// Les variables possédant le groupe historique_read seront retournées en cas de requête GET
#[ORM\Entity(repositoryClass: HistoriqueModuleRepository::class)]
#[ApiResource(normalizationContext:['groups' => "historique_read"])]
#[ApiFilter(SearchFilter::class, properties: ['Module.id' => 'exact'])]
class HistoriqueModule
{
    // ID
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(['historique_read'])]
    private ?int $id = null;

    // Module
    #[ORM\ManyToOne(targetEntity:Module::class, inversedBy:"Historique")] // Relation avec l'entité Module
    #[Groups(['historique_read'])]
    private $Module;

    // Valeur
    #[ORM\Column(nullable: true)]
    #[Groups(['historique_read'])]
    private ?int $Valeur = null;

    // Date et Heure de relevé
    #[ORM\Column(type: Types::DATETIME_MUTABLE)]
    #[Groups(['historique_read'])]
    private ?\DateTimeInterface $TimeStamp = null;

    // Getter et Setter pour chaque champ
    public function getId(): ?int
    {
        return $this->id;
    }

    public function getModule(): ?Module
    {
        return $this->Module;
    }

    public function setModule(Module $Module): self
    {
        $this->Module = $Module;

        return $this;
    }

    public function getValeur(): ?int
    {
        return $this->Valeur;
    }

    public function setValeur(?int $Valeur): self
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
