<?php

namespace App\Entity;

// On importe les dépendances nécessaires
use App\Repository\ModuleRepository;
use Doctrine\ORM\Mapping as ORM;
use ApiPlatform\Core\Annotation\ApiFilter;
use ApiPlatform\Core\Annotation\ApiResource;
use Symfony\Component\Serializer\Annotation\Groups;
use Doctrine\Common\Collections\Collection;
use Doctrine\Common\Collections\ArrayCollection;
use App\Entity\HistoriqueModule;

#[ORM\Entity(repositoryClass: ModuleRepository::class)]
// Les variables possédant le groupe module_read seront retournées en cas de requête GET
#[ApiResource(normalizationContext:['skip-null-values'=>'false', 'groups' => "module_read"])]
class Module
{
    // ID
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(['module_read', 'historique_read'])]
    private ?int $id = null;

    // Nom
    #[ORM\Column(length: 255)]
    #[Groups(['module_read'])]
    private ?string $Nom = null;

    // Type
    #[ORM\Column(length: 255)]
    #[Groups(['module_read'])]
    private ?string $Type = null;

    // Valeur actuelle
    #[ORM\Column(nullable: true)]
    #[Groups(['module_read'])]
    private ?int $ValeurActuelle = null;

    // Durée de fonctionnement
    #[ORM\Column(length: 255)]
    #[Groups(['module_read'])]
    private ?int $DureeFonctionnement = 0;

    // Nombre de données envoyées
    #[ORM\Column]
    #[Groups(['module_read'])]
    private ?int $NombreDonneesEnvoyees = 0;

    // Etat de marche
    #[ORM\Column]
    #[Groups(['module_read'])]
    private ?bool $EtatMarche = true;

    // Historique
    #[ORM\OneToMany(targetEntity:HistoriqueModule::class, mappedBy:"Module", orphanRemoval:true)] // Relation à l'entité Historique
    #[Groups(['module_read'])]
    private $Historique;

    // Getter et Setter pour chaque champ
    public function __construct()
    {
        $this->Historique = new ArrayCollection();
    }

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

    public function getValeurActuelle(): ?int
    {
        return $this->ValeurActuelle;
    }

    public function setValeurActuelle(?int $ValeurActuelle): self
    {
        $this->ValeurActuelle = $ValeurActuelle;

        return $this;
    }

    public function getDureeFonctionnement(): ?int
    {
        return $this->DureeFonctionnement;
    }

    public function setDureeFonctionnement(?int $DureeFonctionnement): self
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

     /**
     * @return Collection|HistoriqueModule[]
     */
    public function getHistorique(): ?Collection
    {
        return $this->Historique;
    }

    public function addHistorique(HistoriqueModule $Historique): self
    {
        if (!$this->Historique->contains($Historique)) {
            $this->Historique[] = $Historique;
            $Historique->setModule($this);
        }

        return $this;
    }

    public function removeHistorique(HistoriqueModule $Historique): self
    {
        if ($this->Historique->removeElement($Historique)){
            if ($Historique->getModule() === $this) {
                $Historique->setModule(null);
            }
        }
        

        return $this;
    }
}
