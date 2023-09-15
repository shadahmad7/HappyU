<?php 
namespace App\Controllers;
use App\Models\WorkoutModel;
use App\Models\EatingModel;
use App\Models\JournalModel;
use CodeIgniter\RESTful\ResourceController;
use CodeIgniter\API\ResponseTrait;
use CodeIgniter\Controller;


ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

class TodoController extends Controller
{
    use ResponseTrait;
    

public function insertHabits(){
        $workoutModel = new WorkoutModel();
         $data = [
            'habit_workout' => false,
            'habit_meditation' => false,
            'habit_social' => false,
            'habit_reading' => false,
            'habit_water' => false,
            'habit_movement' => false,
            'habit_screen' => false,
            'habit_kindness' => false,            
        ];
     $workoutModel->save($data);
        }

public function insertEating(){
        $eatingModel = new EatingModel();
         $data = [
                
        ];
     $eatingModel->save($data);
        }

public function insertJournal(){
        $journalModel = new JournalModel();
         $data = [
            'journal_q1' => false,
            'journal_q2' => false,
            'journal_q3' => false,
            'journal_q4' => false,
            'journal_q5' => false,
        ];
     $journalModel->save($data);
        }

    }









    