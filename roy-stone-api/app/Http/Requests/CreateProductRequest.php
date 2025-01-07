<?php

namespace App\Http\Requests;

use App\Enums\AmountEnum;
use App\Helpers\Helpers;
use App\Enums\ProductType;
use Illuminate\Validation\Rule;
use Illuminate\Foundation\Http\FormRequest;
use App\GraphQL\Exceptions\ExceptionHandler;
use Illuminate\Contracts\Validation\Validator;

class CreateProductRequest extends FormRequest
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
     * @return array<string, mixed>
     */
    public function rules()
    {
        $rules = [
            'name'  => ['required', 'string', 'max:255'],
            'product_type' =>  ['required','in:physical,digital,external'],
            'description' => ['required', 'string', 'min:10'],
            'short_description' => ['required', 'string'],
            'store_id' => ['nullable','exists:stores,id,deleted_at,NULL'],
            'type' => ['required','in:simple,classified'],
            'price' => ['required_if:type,==,simple'],
            'categories'=>['required','exists:categories,id,deleted_at,NULL'],
            'tags' => ['required','exists:tags,id,deleted_at,NULL'],
            'stock_status' => ['required_if:type,==,simple', 'in:in_stock,out_of_stock'],
            'attributes_ids' => ['required_if:type,==,classified','exists:attributes,id,deleted_at,NULL'],
            'categories'=>['required','array','exists:categories,id,deleted_at,NULL'],
            'tags' => ['nullable','array','exists:tags,id,deleted_at,NULL'],
            'product_meta_image_id' => ['nullable','exists:attachments,id,deleted_at,NULL'],
            'product_thumbnail_id' => ['nullable','exists:attachments,id,deleted_at,NULL'],
            'product_galleries_id.*' => ['nullable','exists:attachments,id,deleted_at,NULL'],
            'quantity' => ['numeric','required_if:type,==,simple'],
            'sku' => ['required_if:type,==,simple', 'unique:products,sku,NULL,id,deleted_at,NULL'],
            'is_external' => ['min:0', 'max:1'],
            'external_url' => ['required_if:is_external,1'],
            'watermark' => ['min:0', 'max:1'],
            'watermark_position' =>  ['required_if:watermark,1'],
            'watermark_image_id' => ['nullable','required_if:watermark,1','exists:attachments,id,deleted_at,NULL'],
            'is_licensable' => ['required_if:product_type,digital','min:0', 'max:1'],
            'is_licensekey_auto' => ['required_if:is_licensable,1'],
            'separator' => [Rule::requiredIf(function () {
                return ($this->product_type == ProductType::DIGITAL && $this->is_licensable == 1 && $this->is_licensekey_auto == 0);
            }),'in:new_line,double_new_line,comma,semicolon,pipe','nullable'],
            'license_key' => [Rule::requiredIf(function () {
                return ($this->product_type == ProductType::DIGITAL && $this->is_licensable == 1 && $this->is_licensekey_auto == 0);
            })],
            'license_keys.*' => ['unique:license_keys,license_key,NULL,id,deleted_at,NULL', 'nullable'],
            'preview_audio_file_id' => ['nullable','exists:attachments,id,deleted_at,NULL'],
            'preview_video_file_id' => ['nullable','exists:attachments,id,deleted_at,NULL'],
            'digital_file_ids.*' => [Rule::requiredIf(function () {
                return ($this->product_type == ProductType::DIGITAL && $this->type == 'simple');
            }), 'exists:attachments,id,deleted_at,NULL', 'nullable'],
            'external_button_text' => ['required_if:type,==,external'],
            'discount' => ['nullable','numeric','regex:/^([0-9]{1,2}){1}(\.[0-9]{1,2})?$/'],
            'tax_id' => ['required','exists:taxes,id,deleted_at,NULL'],
            'brand_id' => ['nullable','exists:brands,id,deleted_at,NULL'],
            'show_stock_quantity' => ['min:0', 'max:1'],
            'is_featured' => ['min:0', 'max:1'],
            'size_chart_image_id' => ['nullable','exists:attachments,id,deleted_at,NULL'],
            'secure_checkout' => ['min:0', 'max:1'],
            'safe_checkout' => ['min:0', 'max:1'],
            'social_share' => ['min:0', 'max:1'],
            'encourage_order' => ['min:0', 'max:1'],
            'encourage_view' => ['min:0', 'max:1'],
            'is_cod' => ['min:0', 'max:1'],
            'is_return' => ['min:0', 'max:1'],
            'is_approved' => ['min:0', 'max:1'],
            'is_free_shipping' => ['min:0', 'max:1'],
            'is_changeable' => ['min:0', 'max:1'],
            'is_sale_enable' => ['min:0', 'max:1'],
            'sale_starts_at' => ['nullable', 'date'],
            'sale_expired_at' => ['nullable','date', 'after:sale_starts_at'],
            'status' => ['required','min:0','max:1'],
            'cross_sell_products' => ['nullable','exists:products,id,deleted_at,NULL'],
            'related_products' => ['nullable','exists:products,id,deleted_at,NULL'],
            'visible_time' => ['nullable','date'],

            'variations.*.name' => ['required_if:type,==,classified', 'string'],
            'variations.*.price' => ['required_if:type,==,classified', 'numeric'],
            'variations.*.sale_price' => ['nullable', 'numeric'],
            'variations.*.stock_status' => ['required_if:type,==,classified', 'in:in_stock,out_of_stock,coming_soon'],
            'variations.*.attribute_values' => ['required_if:type,==,classified','exists:attribute_values,id,deleted_at,NULL'],
            'variations.*.discount' => ['nullable','numeric', 'regex:/^([0-9]{1,2}){1}(\.[0-9]{1,2})?$/'],
            'variations.*.sku' => ['required_if:type,==,classified', 'string', 'unique:variations,sku,NULL,id,deleted_at,NULL'],
            'variations.*.digital_file_ids' => ['nullable','required_if:variations.*.product_type,digital', 'exists:attachments,id,deleted_at,NULL'],
            'variations.*.status' => ['required_if:type,==,classified','min:0','max:1'],
            'variations.*.variation_image_id' => ['nullable','exists:attachments,id,deleted_at,NULL'],
            'variations.*.digital_file_ids.*' => [Rule::requiredIf(function () {
                return ($this->product_type == ProductType::DIGITAL && $this->type == 'classified');
            }), 'exists:attachments,id,deleted_at,NULL', 'nullable'],
            'variations.*.is_licensable' => ['required_if:product_type,digital', 'min:0', 'max:1'],
            'variations.*.is_licensekey_auto' => ['required_if:variations.*.is_licensable,1'],
            'variations.*.license_keys' => [
                'nullable',
                'unique:license_keys,license_key,NULL,id,deleted_at,NULL'
            ],
        ];

        if ($this->input('wholesale_price_type') == AmountEnum::PERCENTAGE) {
            return array_merge($rules, ['wholesale_prices.*.value' => ['required', 'regex:/^([0-9]{1,2}){1}(\.[0-9]{1,2})?$/']]);
         }

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
            if (isset($variation['is_licensable']) && $variation['is_licensekey_auto']) {
                $rules['variations.'.$key.'.separator'] = [Rule::requiredIf(function () use ($variation) {
                    return ($this->product_type == ProductType::DIGITAL && $variation['is_licensable'] == 1 && $variation['is_licensekey_auto'] == 0);
                }),'in:new_line,double_new_line,comma,semicolon,pipe', 'nullable'];

                $rules['variations.'.$key.'.license_key'] = [Rule::requiredIf(function () use ($variation) {
                    return ($this->product_type == ProductType::DIGITAL && $variation['is_licensable'] == 1 && $variation['is_licensekey_auto'] == 0);
                }), 'nullable'];
            }
        }

        return $rules;
    }

    protected function prepareForValidation()
    {
        if ($this->type == 'simple' && $this->product_type == ProductType::DIGITAL && $this->separator && $this->is_licensable && !$this->is_licensekey_auto && $this->license_key) {
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
