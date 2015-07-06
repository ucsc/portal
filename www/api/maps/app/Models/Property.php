<?php

# app/Models/Property.php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

final class Property extends Model
{
    /**
     * The database table used by the model.
     *
     * @var string
     */
    protected $table = 'properties';
    public $timestamps = true;

    /**
     * The attributes excluded from the model's JSON form.
     *
     * @var array
     */
    protected $hidden = array('created_at', 'updated_at', 'deleted_at');
    protected $guarded = array('created_at', 'updated_at', 'deleted_at');


    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    // protected $fillable = array('email', 'password', 'first_name');

}
