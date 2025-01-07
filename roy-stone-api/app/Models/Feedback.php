<?php

namespace App\Models;

use App\Enums\ReactionEnum;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Feedback extends Model
{
    use HasFactory, SoftDeletes;

    protected $table = 'feedbacks';

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'reaction',
        'consumer_id',
        'question_and_answer_id',
    ];

    protected $casts = [
        'consumer_id' => 'integer',
        'question_and_answer_id' => 'integer',
    ];

    /**
     * @return BelongsTo
     */
    public function question_and_answer(): BelongsTo
    {
        return $this->belongsTo(QuestionAndAnswer::class, 'question_and_answer_id');
    }
}
