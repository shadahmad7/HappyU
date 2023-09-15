<?php 
namespace App\Controllers;
use App\Models\WorkoutModel;
use CodeIgniter\RESTful\ResourceController;
use CodeIgniter\API\ResponseTrait;
use CodeIgniter\Controller;


ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

class WorkoutController extends Controller
{
    use ResponseTrait;
    
    

public function putWorkout($id = null){

        $workoutModel = new WorkoutModel();
 
        $id = $this->request->getVar('id');
        $data = [
            'habit_workout' => $this->request->getVar('workout'),
            
        ];

        $workoutModel->set($data)->where('user_id', $id)->update();
//  print_r($data);
        $rs= $workoutModel->update($id,$data);
        // echo $rs;
        if($rs)
        {
               $response = [
              'status'   => 200,
              'messages' => [
                  'success' => 'status updated successfully.'
              ]
          ];
        }else{
             $response = [
              'status'   => 201,
              'messages' => [
                  'success' => 'status not updated'
              ]
          ];
        }
          return $this->respondCreated($response);
        }



        public function getWorkout($id = null){
            $workoutModel = new WorkoutModel();
            date_default_timezone_set('Asia/Kolkata');
            $date = date('Y/m/d');
            $data = $workoutModel->where('user_id', $id)->where('habit_created_date', $date)->find();
            if($data){
                {
                    $response = [
                   'status'   => 200,
                   'messages' => $data
               ];
             } 
            } else {

                $data = [
                    'habit_workout' => false,
                    'habit_mediatation' => false,
                    'habit_social' => false,
                    'habit_reading' => false,
                    'habit_movement' => false,
                    'habit_water' => false,
                    'habit_screen' => false,
                    'habit_kindness' => false,
                    'user_id' => $id
                ];
                $workoutModel->save($data);
                {
                    $response = [
                   'status'   => 201,
                   'messages' => "New data inserted"
               ];
             } 
            }
            
        
        return $this->respondCreated($response);


           }

    }









    