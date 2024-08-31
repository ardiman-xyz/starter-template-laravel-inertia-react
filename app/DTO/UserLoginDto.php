<?php

namespace App\DTO;

class UserLoginDto
{
    /**
     * @var int|null
     */
    public ?int $id;

    /**
     * @var string|null
     */
    public ?string $name;

    /**
     * @var string|null
     */
    public ?string $email;

    /**
     * UserLoginDto constructor.
     * 
     * @param int|null $id
     * @param string|null $name
     * @param string|null $email
     */
    public function __construct(?int $id = null, ?string $name = null, ?string $email = null)
    {
        $this->id = $id;
        $this->name = $name;
        $this->email = $email;
    }

    /**
     * Static method to create an instance from an array.
     * 
     * @param array $data
     * @return self
     */
    public static function fromArray(array $data): self
    {
        return new self(
            isset($data['id']) ? (int) $data['id'] : null,
            $data['name'] ?? null,
            $data['email'] ?? null
        );
    }

    /**
     * Convert the DTO to an array.
     * 
     * @return array
     */
    public function toArray(): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'email' => $this->email,
        ];
    }
}
