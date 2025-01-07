<?php

namespace App\Models;

use App\Helpers\Helpers;
use App\Enums\ReactionEnum;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class QuestionAndAnswer extends Model
{
    use HasFactory, SoftDeletes;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'answer',
        'question',
        'store_id',
        'product_id',
        'consumer_id',
    ];

    protected $casts = [
        'store_id' => 'integer',
        'product_id' => 'integer',
        'consumer_id' => 'integer',
    ];

    protected $with = [
        'product:id,name,product_thumbnail_id',
    ];

    protected $appends = [
        'reaction',
        'total_likes',
        'total_dislikes',
    ];

    public function toArray()
    {
        return [
            'id' => $this->id,
            'reaction' => $this->getReactionAttribute(),
            'total_likes' => $this->getTotalLikesAttribute(),
            'total_dislikes' => $this->getTotalDisLikesAttribute(),
            'question' => $this->question,
            'answer' => $this->answer,
            'product_id' => $this->product_id,
            'created_at' => $this->created_at,
            'product' => $this->product?->only(['id', 'name', 'product_thumbnail_id', 'product_thumbnail']),
            'consumer' => $this->consumer?->only(['id', 'name']),
        ];
    }

    public function getTotalLikesAttribute()
    {
        return $this->feedbacks()->where('question_and_answer_id', $this->id)->where('reaction', ReactionEnum::LIKED)->count();
    }

    public function getTotalDisLikesAttribute()
    {
        return $this->feedbacks()->where('question_and_answer_id', $this->id)->where('reaction', ReactionEnum::DISLIKED)->count();
    }

    public function getReactionAttribute()
    {
        if (Helpers::isUserLogin()) {
            return $this->feedbacks()
                ->where('question_and_answer_id', $this->id)
                ->where('consumer_id', Helpers::getCurrentUserId())
                ->pluck('reaction')->first();
        }
    }

    /**
     * @return Int
     */
    public function getId($request)
    {
        return ($request->id) ? $request->id : $request->route('question_and_answer')?->id;
    }

    /**
     * @return HasMany
     */
    public function feedbacks(): HasMany
    {
        return $this->hasMany(Feedback::class, 'question_and_answer_id');
    }

    /**
     * @return BelongsTo
     */
    public function consumer(): BelongsTo
    {
        return $this->belongsTo(User::class, 'consumer_id');
    }

    /**
     * @return BelongsTo
     */
    public function product(): BelongsTo
    {
        return $this->belongsTo(Product::class, 'product_id');
    }

    /**
     * @return BelongsTo
     */
    public function store(): BelongsTo
    {
        return $this->belongsTo(Store::class, 'store_id');
    }
}
