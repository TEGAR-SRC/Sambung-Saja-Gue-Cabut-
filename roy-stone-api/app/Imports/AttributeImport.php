<?php

namespace App\Imports;

use App\Models\Attribute;
use Maatwebsite\Excel\Concerns\ToModel;
use Maatwebsite\Excel\Concerns\SkipsOnError;
use App\GraphQL\Exceptions\ExceptionHandler;
use Maatwebsite\Excel\Concerns\WithHeadingRow;
use Maatwebsite\Excel\Concerns\WithValidation;

class AttributeImport implements ToModel, WithHeadingRow, WithValidation, SkipsOnError
{
    private $attributes = [];

    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'max:255', 'unique:attributes,name,NULL,id,deleted_at,NULL'],
            'style' => ['required', 'in:rectangle,circle,color,radio,image,dropdown'],
            'status' => ['required','min:0','max:1'],
        ];
    }

    public function customValidationMessages()
    {
        return [
            'name.unique' => 'name has already been taken.',
            'name.required' => 'name field is required.',
            'status.required' => 'status field is required.',
            'style.required' => 'style field is required.',
        ];
    }

    /**
     * @param \Throwable $e
     */
    public function onError(\Throwable $e)
    {
        throw new ExceptionHandler($e->getMessage() , 422);
    }

    public function getImportedAttributes()
    {
        return $this->attributes;
    }

    /**
    * @param array $row
    *
    * @return \Illuminate\Database\Eloquent\Model|null
    */
    public function model(array $row)
    {
        $attributeValues = [];
        $attribute = new Attribute([
            'name' => $row['name'],
            'style' => $row['style'],
            'status' => $row['status'],
        ]);

        $attribute->save();
        $attribute = $attribute->fresh();

        if (isset($row['values'])) {
            $values = [];
            $attributeValues = explode(',' ,$row['values']);
            foreach($attributeValues as $value) {
                $temp['value'] = $value;
                $values[] = $temp;
            }

            $attributeValues = $attribute->attribute_values()->createMany($values);
        }

        $this->attributes[] = [
            'id' => $attribute->id,
            'name' =>  $attribute->name,
            'style' => $attribute->style,
            'status' => $attribute->status,
            'attribute_values' => $attributeValues
        ];

        return $attribute;
    }
}
