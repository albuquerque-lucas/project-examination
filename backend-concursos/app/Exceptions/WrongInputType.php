<?php

namespace App\Exceptions;

use Exception;

class WrongInputType extends Exception
{
    /**
     * Mensagem padrão da exceção.
     *
     * @var string
     */
    protected $defaultMessage = "Formato incorreto. Deve ser :type. Recebido: :received";

    /**
     * Construtor da classe.
     *
     * @param string $type Tipo de dado esperado.
     * @param string $received Tipo de dado recebido.
     * @param int $code Código de erro (opcional).
     * @param Exception|null $previous Exceção anterior (opcional).
     */
    public function __construct(string $type, string $received, int $code = 400, Exception $previous = null)
    {
        // Substitui as variáveis :type e :received na mensagem padrão.
        $message = str_replace(':type', $type, $this->defaultMessage);
        $message = str_replace(':received', $received, $message);

        // Chama o construtor da classe Exception.
        parent::__construct($message, $code, $previous);
    }
}
