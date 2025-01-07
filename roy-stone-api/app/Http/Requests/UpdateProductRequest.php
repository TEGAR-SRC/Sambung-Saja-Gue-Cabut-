<?php

namespace App\Http\Requests;

use App\Enums\ProductType;
use App\Helpers\Helpers;
use Illuminate\Validation\Rule;
use Illuminate\Foundation\Http\FormRequest;
use App\GraphQL\Exceptions\ExceptionHandler;
use Illuminate\Contracts\Validation\Validator;

class UpdateProductRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        $id = $this->route('product') ? $this->route('product')->id : $this->id;
        if (isset($this->related_products)) {
            foreach ($this->related_products as $related_product) {
                if ($id == $related_product) {
                    throw new ExceptionHandler("Can't insert same Product in Related Products", 400);
                }
            }
        }

        if (isset($this->cross_sell_products)) {
            foreach ($this->cross_sell_products as $cross_sell_product) {
                if ($id == $cross_sell_product) {
                    throw new ExceptionHandler("Can't insert same Product in Cross Sell Products", 400);
                }
            }
        }

        $rules = [
            'name' => ['required', 'string', 'max:255'],
            'product_type' =>  ['required','in:physical,digital,external'],
            'store_id' => ['nullable','exists:stores,id,deleted_at,NULL'],
            'type' => ['required','in:simple,classified'],
            'discount' => ['nullable','numeric','regex:/^([0-9]{1,2}){1}(\.[0-9]{1,2})?$/'],
            'stock_status' => ['required_if:type,==,simple', 'in:in_stock,out_of_stock'],
            'sku' => ['required_if:type,==,simple', 'unique:products,sku,'.$id.',id,deleted_at,NULL'],
            'is_external' => ['min:0', 'max:1'],
            'status' => ['min:0','max:1'],
            'external_url' => ['required_if:is_external,==,1', 'nullable'],
            'external_button_text' => ['required_if:type,==,external', 'nullable'],
            'price' => ['required_if:type,==,simple'],
            'quantity' => ['required_if:type,==,simple'],
            'tax_id' => ['nullable','exists:taxes,id,deleted_at,NULL'],
            'brand_id' => ['nullable','exists:brands,id,deleted_at,NULL'],
            'show_stock_quantity' => ['min:0', 'max:1'],
            'is_featured' => ['min:0', 'max:1'],
            'is_cod' => ['min:0', 'max:1'],
            'is_return' => ['min:0', 'max:1'],
            'is_free_shipping' => ['min:0', 'max:1'],
            'is_changeable' => ['min:0', 'max:1'],
            'sale_starts_at' => ['nullable', 'date'],
            'sale_expired_at' => ['nullable','date', 'after:sale_starts_at'],
            'categories'=>['exists:categories,id,deleted_at,NULL'],
            'tags' => ['exists:tags,id,deleted_at,NULL'],
            'is_approved' => ['min:0', 'max:1'],
            'product_meta_image_id' =>['nullable','exists:attachments,id,deleted_at,NULL'],
            'product_thumbnail_id' => ['nullable','exists:attachments,id,deleted_at,NULL'],
            'product_galleries_id.*' => ['nullable','exists:attachments,id,deleted_at,NULL'],
            'attributes_ids' => ['nullable','required_if:type,==,classified','exists:attributes,id,deleted_at,NULL'],
            'is_random_related_products' => ['min:0', 'max:1'],
            'related_products' => ['nullable','exists:products,id,deleted_at,NULL'],
            'cross_sell_products' => ['nullable', 'exists:products,id,deleted_at,NULL'],
            'visible_time' => ['nullable','date'],
            'watermark' => ['min:0', 'max:1'],
            'watermark_position' =>  ['required_if:watermark,1'],
            'watermark_image_id' => ['nullable','required_if:watermark,1','exists:attachments,id,deleted_at,NULL'],
            'is_licensekey_auto' => ['required_if:is_licensable,1'],
            'separator' => [Rule::requiredIf(function () {
                return ($this->product_type == ProductType::DIGITAL && $this->is_licensable == 1 && $this->is_licensekey_auto == 0);
            }),'in:new_line,double_new_line,comma,semicolon,pipe', 'nullable'],
            'license_key' => [Rule::requiredIf(function () {
                return ($this->product_type == ProductType::DIGITAL && $this->is_licensable == 1 && $this->is_licensekey_auto == 0);
            })],
            'preview_audio_file_id' => ['nullable','exists:attachments,id,deleted_at,NULL'],
            'preview_video_file_id' => ['nullable','exists:attachments,id,deleted_at,NULL'],
            'digital_file_ids.*' => [Rule::requiredIf(function () {
                return ($this->product_type == ProductType::DIGITAL && $this->type == 'simple');
            }), 'exists:attachments,id,deleted_at,NULL', 'nullable'],
            'external_button_text' => ['required_if:type,==,external'],
            'wholesales.*.id' => ['nullable','exists:wholesales,id,deleted_at,NULL'],
            'variations.*.id' => ['nullable','exists:variations,id,deleted_at,NULL'],
            'variations.*.name' => ['nullable','required_if:type,==,classified','string'],
            'variations.*.price' => ['nullable','required_if:type,==,classified','numeric'],
            'variations.*.sale_price' => ['nullable','min:'. (float)$this->input('variations.*.price')],
            'variations.*.stock_status' => ['nullable','required_if:type,==,classified', 'in:in_stock,out_of_stock,coming_soon'],
            'variations.*.discount' => ['nullable', 'numeric', 'regex:/^([0-9]{1,2}){1}(\.[0-9]{1,2})?$/'],
            'variations.*.attribute_values' => ['nullable','required_if:type,==,classified','exists:attribute_values,id'],
            'variations.*.variation_image_id' => ['nullable','exists:attachments,id,deleted_at,NULL'],
            'variations.*.status' => ['required_if:type,==,classified','min:0','max:1'],
            'variations.*.digital_file_ids.*' => [Rule::requiredIf(function () {
                return ($this->product_type == ProductType::DIGITAL && $this->type == 'classified');
            }), 'exists:attachments,id,deleted_at,NULL'],
            'variations.*.is_licensable' => ['required_if:product_type,digital', 'min:0', 'max:1'],
            'variations.*.is_licensekey_auto' => ['required_if:variations.*.is_licensable,1','min:0', 'max:1'],
        ];

        if (!empty($this->input('variations'))) {
            return $this->withCustomVariationRules($rules, $this->input('variations', []));
        }

        return $rules;
    }

    public function messages()
    {
        return [
            'discount.regex' => 'Enter discount between 0 to 99.99',
            'type.in' => 'Product type can be either simple or classified',
            'license_type.in' => 'License type can be either auto_generate or select_license',
            'stock_status.in' => 'Stock status can be either in_stock or out_of_stock',
            'video_provider.in' => 'Video Provider can in youtube or vimeo or daily_motion',
            'watermark_position.required_if' => 'The watermark position field is required when watermark is true.',
            'variations.*.discount.regex' => 'Enter Variations discount between 0 to 99.99',
            'variations.*.sku.unique' => 'The ":input" sku has already been taken',
            'variations.*.stock_status.in' => 'Variations Stock status can be either in_stock or out_of_stock or coming_soon',
            'variations.*.is_licensable.required_if' => 'The variations is_licensable field is required when product type is digital.',
            'variations.*.is_licensekey_auto.required_if' => 'The variations is_licensekey_auto field is required when variations is_licensable is true.',
            'variations.*.separator.required_if' => 'The variations separator field is required when variations is_licensable is true.',
            'variations.*.license_key.required_if' => 'The variations license_key field is required when variations is_licensable is true and is license key auto is false.',
        ];
    }

    public function withCustomVariationRules($rules, $variations)
    {
        foreach ($variations as $key => $variation) {
            $rules['variations.'.$key.'.sku'] = ['nullable','required_if:type,==,classified', 'string', 'unique:variations,sku,NULL,id,deleted_at,NULL'];
            if (!empty($variation['id'])) {
                $rules['variations.'.$key.'.sku'] = ['nullable','required_if:type,==,classified', 'string', 'unique:variations,sku,'.$variation['id'].',id,deleted_at,NULL'];
            }

            if (isset($variation['is_licensable']) && $variation['is_licensekey_auto']) {
                $rules['variations.'.$key.'.separator'] = [Rule::requiredIf(function () use($variation) {
                    return ($this->product_type == ProductType::DIGITAL && $variation['is_licensable'] == 1 && $variation['is_licensekey_auto'] == 0);
                }),'in:new_line,double_new_line,comma,semicolon,pipe', 'nullable'];

                $rules['variations.'.$key.'.license_key'] = [Rule::requiredIf(function () use($variation) {
                    return ($this->product_type == ProductType::DIGITAL && $variation['is_licensable'] == 1 && $variation['is_licensekey_auto'] == 0);
                }), 'nullable'];

                if (isset($variation['license_keys'])) {
                    if (is_array($variation['license_keys'])) {
                        foreach($variation['license_keys'] as $key => $license_key) {
                            $rules['variations.'.$key.'.license_keys'] = ['nullable','required_if:type,==,classified', 'unique:license_keys,license_key,'.Helpers::getLicenseKeyIdByKey($license_key).',id,deleted_at,NULL'];
                        }
                    }
                }
            }
        }

        return $rules;
    }

    protected function prepareForValidation()
    {
        if ($this->type == 'simple' && $this->product_type == ProductType::DIGITAL &&
            $this->separator && $this->is_licensable && !$this->is_licensekey_auto && $this->license_key) {
            $license_keys = Helpers::explodeLicenseKeys($this->separator, $this->license_key);
            $this->merge([
                'license_keys' => $license_keys,
            ]);
        }

        if ($this->type == 'classified' && $this->product_type == ProductType::DIGITAL && $this->variations) {
            $tempVariations = [];
            foreach($this->variations as $index => $variation) {
                $tempVariations[$index] = $variation;
                if (isset($variation['is_licensable']) && isset($variation['is_licensekey_auto']) && isset($variation['license_key'])) {
                    if ($variation['is_licensable'] && !$variation['is_licensekey_auto']) {
                        $license_keys = Helpers::explodeLicenseKeys($variation['separator'], $variation['license_key']);
                        $tempVariations[$index]['license_keys'] = $license_keys;
                    }
                }
            }

            $this->merge([
                'variations' =>  $tempVariations
            ]);
        }
    }

    public function failedValidation(Validator $validator)
    {
        throw new ExceptionHandler($validator->errors()->first(), 422);
    }
}
