<?php 
namespace App\Controllers;
use App\Models\WorkoutModel;
use App\Models\TodoModel;
use App\Models\JournalModel;
use App\Models\FinanceModel;
use App\Models\EatingModel;
use CodeIgniter\RESTful\ResourceController;
use CodeIgniter\API\ResponseTrait;
use CodeIgniter\Controller;


ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

class WeeklyController extends Controller
{
    use ResponseTrait;
    



        public function getWeeklyRecords($id = null){
            $workoutModel = new WorkoutModel();
            $todoModel = new TodoModel();
            $journalModel = new JournalModel();
            $financeModel = new FinanceModel();
            $eatingModel = new EatingModel();
            date_default_timezone_set('Asia/Kolkata');
            $date = date('Y/m/d');

            $date2= date('Y/m/d', strtotime(' -6 day'));
           
            
            
            //Workout
            $workoutData =  $workoutModel->where('user_id', $id)->where('habit_workout', true)->where('habit_created_date BETWEEN "'. 
            date('Y/m/d', strtotime($date2)). '" AND "'.  date('Y/m/d', strtotime($date)).'"')->select('habit_workout')->find();
            $TotalCount['workoutCount'] = count($workoutData);

            //meditation
            $meditationData =  $workoutModel->where('user_id', $id)->where('habit_meditation', true)->where('habit_created_date BETWEEN "'. 
            date('Y/m/d', strtotime($date2)). '" AND "'.  date('Y/m/d', strtotime($date)).'"')->select('habit_meditation')->find();
            $TotalCount['meditationCount'] = count($meditationData);

            $socialData =  $workoutModel->where('user_id', $id)->where('habit_social', true)->where('habit_created_date BETWEEN "'. 
            date('Y/m/d', strtotime($date2)). '" AND "'.  date('Y/m/d', strtotime($date)).'"')->select('habit_social')->find();
            $TotalCount['socialCount'] = count($socialData);

            $readingData =  $workoutModel->where('user_id', $id)->where('habit_reading', true)->where('habit_created_date BETWEEN "'. 
            date('Y/m/d', strtotime($date2)). '" AND "'.  date('Y/m/d', strtotime($date)).'"')->select('habit_reading')->find();
            $TotalCount['readingCount'] = count($readingData);

            $movementData =  $workoutModel->where('user_id', $id)->where('habit_movement', true)->where('habit_created_date BETWEEN "'. 
            date('Y/m/d', strtotime($date2)). '" AND "'.  date('Y/m/d', strtotime($date)).'"')->select('habit_movement')->find();
            $TotalCount['movementCount'] = count($movementData);

            $waterData =  $workoutModel->where('user_id', $id)->where('habit_water', true)->where('habit_created_date BETWEEN "'. 
            date('Y/m/d', strtotime($date2)). '" AND "'.  date('Y/m/d', strtotime($date)).'"')->select('habit_water')->find();
            $TotalCount['waterCount'] = count($waterData);

            $screenData =  $workoutModel->where('user_id', $id)->where('habit_screen', true)->where('habit_created_date BETWEEN "'. 
            date('Y/m/d', strtotime($date2)). '" AND "'.  date('Y/m/d', strtotime($date)).'"')->select('habit_screen')->find();
            $TotalCount['screenCount'] = count($screenData);

            $kindnessData =  $workoutModel->where('user_id', $id)->where('habit_kindness', true)->where('habit_created_date BETWEEN "'. 
            date('Y/m/d', strtotime($date2)). '" AND "'.  date('Y/m/d', strtotime($date)).'"')->select('habit_kindness')->find();
            $TotalCount['kindnessCount'] = count($kindnessData);

            $todoData =  $todoModel->where('user_id', $id)->where('todo_status', true)->where('todo_created_date BETWEEN "'. 
            date('Y/m/d', strtotime($date2)). '" AND "'.  date('Y/m/d', strtotime($date)).'"')->find();
            $TotalCount['todoCount'] = count($todoData);
            
            $todoTotalData =  $todoModel->where('user_id', $id)->where('todo_created_date BETWEEN "'. 
            date('Y/m/d', strtotime($date2)). '" AND "'.  date('Y/m/d', strtotime($date)).'"')->findAll();
            $TotalCount['todoTotalCount'] = count($todoTotalData);

            $eatingData1 =  $eatingModel->where('user_id', $id)->where('eating_breakfast', "Yes")->where('eating_created_date BETWEEN "'. 
            date('Y/m/d', strtotime($date2)). '" AND "'.  date('Y/m/d', strtotime($date)).'"')->select('eating_breakfast')->find();
            $TotalCount['eatingBreakfastCount'] = count($eatingData1);

            $eatingData2 =  $eatingModel->where('user_id', $id)->where('eating_lunch', "Yes")->where('eating_created_date BETWEEN "'. 
            date('Y/m/d', strtotime($date2)). '" AND "'.  date('Y/m/d', strtotime($date)).'"')->select('eating_lunch')->find();
            $TotalCount['eatingLunchCount'] = count($eatingData2);

            $eatingData3 =  $eatingModel->where('user_id', $id)->where('eating_dinner', "Yes")->where('eating_created_date BETWEEN "'. 
            date('Y/m/d', strtotime($date2)). '" AND "'.  date('Y/m/d', strtotime($date)).'"')->select('eating_dinner')->find();
            $TotalCount['eatingDinnerCount'] = count($eatingData3);
            
            
            $wherecond2 = "( ( journal_q1 ='" . true . "' OR journal_q2='" . true . "' OR journal_q3='" . true . "' OR journal_q4='" . true . "' OR journal_q5='" . true . "' ) )";


            // $multiClause = array('journal_q1' => true, 'journal_q2' => true, 'journal_q3' => true );
            $journalData =  $journalModel->where('user_id', $id)->where($wherecond2)->where('journal_created_date BETWEEN "'. date('Y/m/d', strtotime($date2)). '" AND "'.  date('Y/m/d', strtotime($date)).'"')->find();
            $TotalCount['journalCount'] = count($journalData);
            
            
            
            $wherecond = "( ( finance_q1 ='" . true . "' OR finance_q2='" . true . "' OR finance_q3='" . true . "' OR finance_q4='" . true . "' OR finance_q5='" . true . "' OR finance_q6='" . true . "') )";
            
            $financeData = $financeModel->where('user_id', $id)->where($wherecond)->where('finance_created_date BETWEEN "'. date('Y/m/d', strtotime($date2)). '" AND "'.  date('Y/m/d', strtotime($date)).'"')->find();
            
            $TotalCount['financeCount'] = count($financeData);

            
            // print_r( $TotalCount['financeCount']);
            if($TotalCount){
                    $response = [
                   'status'   => 200,
                   'data' => $TotalCount,
                //    'messages' => $meditationData
               ];
             
            }  else {
                    $response = [
                   'status'   => 404,
                   'data' => "Something went wrong"
               ];
             
            }
            
            
        
        return $this->respondCreated($response);


           }
        }









    