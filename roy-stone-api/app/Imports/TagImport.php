<?php

namespace App\Imports;

use App\Models\Tag;
use Illuminate\Validation\Rule;
use Maatwebsite\Excel\Concerns\ToModel;
use Maatwebsite\Excel\Concerns\SkipsOnError;
use App\GraphQL\Exceptions\ExceptionHandler;
use Maatwebsite\Excel\Concerns\WithHeadingRow;
use Maatwebsite\Excel\Concerns\WithValidation;

class TagImport implements ToModel, WithHeadingRow, WithValidation, SkipsOnError
{
    private $tags = [];

    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'max:255', Rule::unique('tags')->where('type', 'product')->whereNull('deleted_at')],
            'status' => ['required','min:0','max:1'],
            'type' => ['required','in:post,product']
        ];
    }

    public function customValidationMessages()
    {
        return [
            'name.unique' => 'name has already been taken.',
            'type.in' => 'Tag type can be either post or product',
            'status.required' => 'status field is required',
        ];
    }

    /**
     * @param \Throwable $e
     */
    public function onError(\Throwable $e)
    {
        throw new ExceptionHandler($e->getMessage() , 422);
    }

    public function getImportedTags()
    {
        return $this->tags;
    }

    /**
    * @param array $row
    *
    * @return \Illuminate\Database\Eloquent\Model|null
    */
    public function model(array $row)
    {
        $tag = new Tag([
            'name' =>  $row['name'],
            'description' =>  $row['description'],
            'type' => $row['type'],
            'status' => $row['status'],
        ]);

        $tag->save();
        $tag = $tag->fresh();

        $this->tags[] = [
            'id' => $tag->id,
            'name' =>  $tag->name,
            'description' => $tag->description,
            'type' => $tag->type,
            'status' => $tag->status,
        ];

        return $tag;
    }
}
