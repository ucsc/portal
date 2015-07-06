<?php namespace App\Http\Controllers;

use App\Models\Property;

/**
 * Class PostsController
 * @package App\Http\Controllers
 */
class PropertiesController extends Controller
{
    public function all()
    {
        return Property::all();
    }

    // public function show($id)
    // {
    //     return $this->respondWithData(Post::find($id)->with('user')->get()->toArray());
    // }

    // public function store()
    // {
    //     $rules = [
    //         'text' => 'required',
    //     ];

    //     $input = $_POST;

    //     $validator = Validator::make($input, $rules);
    //     if ($validator->fails()) {
    //         return $this->respondWithFailedValidation($validator);
    //     }

    //     $post = new Post;
    //     $post->content = $input['content'];
    //     $post->user()->associate(Auth::user());
    //     $post->save();

    //     return $this->show($post->id);
    // }

//    public function delete() {}
}
