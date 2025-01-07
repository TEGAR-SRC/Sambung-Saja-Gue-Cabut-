<?php

namespace App\GraphQL\Scalars;

use GraphQL\Error\Error;
use GraphQL\Type\Definition\ScalarType;
use GraphQL\Language\AST\StringValueNode;

class Json extends ScalarType
{
    /**
     * The scalar type name.
     *
     * @var string
     */
    public const name = 'JSON';


    /**
     * The scalar type description.
     *
     * @var string
     */
    public const description = 'The `JSON` scalar type represents a JSON object.';

    /**
     * Serialize the JSON value.
     *
     * @param mixed $value
     * @return mixed
     */
    public function serialize($value)
    {
        return $value;
    }

    /**
     * Parse a JSON string into a PHP array.
     *
     * @param mixed $value
     * @return mixed
     */
    public function parseValue($value)
    {
        return json_decode($value, true);
    }

    /**
     * Parse a JSON string literal into a PHP array.
     *
     * @param \GraphQL\Language\AST\StringValueNode $valueNode
     * @param mixed|null $variables
     * @return mixed
     */
    public function parseLiteral($valueNode, $variables = null)
    {
        if ($valueNode instanceof StringValueNode) {
            return json_decode($valueNode->value, true);
        }

        throw new Error('JSON cannot represent non-string or non-numeric JSON values: ' . $valueNode->value);
    }
}
