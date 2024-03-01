<?php

namespace App\Exceptions;

use Exception;

class MissingRequiredParameter extends Exception
{
    /**
     * Mensagem padrão da exceção.
     *
     * @var string
     */
    protected $defaultMessage = 'O parâmetro :parameter é obrigatório.';

    /**
     * Construtor da classe.
     *
     * @param string $parameter Nome do parâmetro obrigatório.
     * @param int $code Código de erro (opcional).
     * @param Exception|null $previous Exceção anterior (opcional).
     */
    public function __construct(string $parameter, int $code = 400, Exception $previous = null)
    {
        // Substitui a variável :parameter na mensagem padrão.
        $message = str_replace(':parameter', $parameter, $this->defaultMessage);

        // Chama o construtor da classe Exception.
        parent::__construct($message, $code, $previous);
    }
}
