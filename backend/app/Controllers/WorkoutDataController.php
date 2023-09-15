<?php 
namespace App\Controllers;
use App\Models\WorkoutDataModel;
use App\Models\WorkoutVideoModel;

use CodeIgniter\RESTful\ResourceController;
use CodeIgniter\API\ResponseTrait;
use CodeIgniter\Controller;




ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

class WorkoutDataController extends Controller
{
    use ResponseTrait;
    


        public function getWorkoutArticles($id = null){
            $workoutDataModel = new WorkoutDataModel();
            $data = $workoutDataModel->orderBy('workout_article_id', 'ASC')->findAll();
            // return $this->respond($data);
             $rs=$this->respond($data);
             if($rs)
        {
               $response = [
              'status'   => 200,
              'messages' => $data
          ];
        } 
        else
        {
             $response = [
              'status'   => 201,
              'messages' => "Data not found with ".$id
          ];
        }
        return $this->respondCreated($response);


           }
           
           
           
            public function getWorkoutVideo($duration = null){
          
            $workoutVideoModel = new WorkoutVideoModel();
            $data = $workoutVideoModel->where('workout_video_duration', $duration)->orderBy('workout_video_id', 'ASC')->findAll();
            // $data = $workoutVideoModel->where('user_id', $id)->where('habit_created_date', $date)->find();
            // echo $duration;

            //  $rs=$this->respond($data);
             if($data)
        {
               $response = [
              'status'   => 200,
              'messages' => $data
          ];
        } 
        else
        {
             $response = [
              'status'   => 201,
              'messages' => "Data not found with ".$id
          ];
        }
        return $this->respondCreated($response);


           }
           
           
           
              public function getAllWorkoutVideo(){
           
            $workoutVideoModel = new WorkoutVideoModel();
            $data = $workoutVideoModel->orderBy('workout_video_id', 'ASC')->findAll();
            
             if($data)
        {
               $response = [
              'status'   => 200,
              'messages' => $data
          ];
        } 
        else
        {
             $response = [
              'status'   => 404,
              'messages' => "Data not found"
          ];
        }
        return $this->respondCreated($response);


           }
           
           
           
           public function addWorkoutArticle(){
             
            $workoutDataModel = new WorkoutDataModel();
              $data = [
                'workout_article_name' => $this->request->getVar('name'),
                'workout_article_url' => $this->request->getVar('url'),
                'workout_article_image' => $this->request->getVar('image'),
               
            ];
           
         $rs = $workoutDataModel->insert($data);
          
                    if($rs)
                    {
                      
                            $response = [
                            'status'   => 200,
                            'data' => [
                                'res' => $rs,
                                'success' => 'Data Added Successfully.'
                            ]
                        ];
                       
                        
                    } else {
                        $response = [
                            'status'   => 201,
                            'data' => [
                                'success' => 'Data not Added'
                            ]
                        ];
                    }
                   
             
               return $this->respondCreated($response);


           }
           
           
           
            public function deleteWorkoutArticle(){
             $workoutDataModel = new WorkoutDataModel();
             $id = $this->request->getVar('id');
             $rs = $workoutDataModel->where('workout_article_id', $id)->delete($id);
             if($rs)
                    {
                      
                            $response = [
                            'status'   => 200,
                            'data' => [
                                'res' => $rs,
                                'success' => 'Data deleted Successfully.'
                            ]
                        ];
                       
                        
                    } else {
                        $response = [
                            'status'   => 201,
                            'data' => [
                                'success' => 'Data not deleted'
                            ]
                        ];
                    }
                   
             
               return $this->respondCreated($response);
    }

           
           
           
           
            public function addWorkoutVideo(){
             
            $workoutVideoModel = new WorkoutVideoModel();
              $data = [
                'workout_video_url' => $this->request->getVar('url'),
                'workout_video_duration' => $this->request->getVar('length'),
               
            ];
           
         $rs = $workoutVideoModel->insert($data);
          
                    if($rs)
                    {
                      
                            $response = [
                            'status'   => 200,
                            'data' => [
                                'res' => $rs,
                                'success' => 'Data Added Successfully.'
                            ]
                        ];
                       
                        
                    } else {
                        $response = [
                            'status'   => 201,
                            'data' => [
                                'success' => 'Data not Added'
                            ]
                        ];
                    }
                   
             
               return $this->respondCreated($response);


           }


  public function deleteWorkoutVideo(){
             $workoutVideoModel = new WorkoutVideoModel();
             $id = $this->request->getVar('id');
             $rs = $workoutVideoModel->where('workout_video_id', $id)->delete($id);
             if($rs)
                    {
                      
                            $response = [
                            'status'   => 200,
                            'data' => [
                                'res' => $rs,
                                'success' => 'Data deleted Successfully.'
                            ]
                        ];
                       
                        
                    } else {
                        $response = [
                            'status'   => 201,
                            'data' => [
                                'success' => 'Data not deleted'
                            ]
                        ];
                    }
                   
             
               return $this->respondCreated($response);
    }



    }









    