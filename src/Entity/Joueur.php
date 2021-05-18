<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiFilter;
use ApiPlatform\Core\Annotation\ApiResource;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\SearchFilter;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\OrderFilter;
use App\Repository\JoueurRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ApiResource(attributes=
 *     {
 *     "pagination_items_per_page"=10,
 *     "pagination_enabled"=false
 *     })
 * @ApiFilter(SearchFilter::class, properties={ "name": "exact"})
 * @ApiFilter( OrderFilter::class, properties={"id": "ASC"})
 * @ORM\Entity(repositoryClass=JoueurRepository::class)
 */
class Joueur
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
     * @ORM\Column(type="datetime")
     */
    private $datecreation;

    /**
     * @ORM\OneToMany(targetEntity=Puissance::class, mappedBy="joueur", orphanRemoval=true)
     */
    private $puissances;

    public function __construct()
    {
        $this->puissances = new ArrayCollection();
    }

    public function __toString()
    {
       return $this->name;
    }



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

    public function getDatecreation(): ?\DateTimeInterface
    {
        return $this->datecreation;
    }

    public function setDatecreation(\DateTimeInterface $datecreation): self
    {
        $this->datecreation = $datecreation;

        return $this;
    }

    /**
     * @return Collection|Puissance[]
     */
    public function getPuissances(): Collection
    {
        return $this->puissances;
    }

    public function addPuissance(Puissance $puissance): self
    {
        if (!$this->puissances->contains($puissance)) {
            $this->puissances[] = $puissance;
            $puissance->setJoueur($this);
        }

        return $this;
    }

    public function removePuissance(Puissance $puissance): self
    {
        if ($this->puissances->removeElement($puissance)) {
            // set the owning side to null (unless already changed)
            if ($puissance->getJoueur() === $this) {
                $puissance->setJoueur(null);
            }
        }

        return $this;
    }



}
